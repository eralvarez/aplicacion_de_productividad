import * as joi from 'joi';
import * as md5 from 'md5';

import { IRequest } from '@shared/interfaces/endpoint.interface';
import * as dbService from '@shared/services/db/db.service';
import * as endpointSchemas from '@shared/schemas/endpoints';
import * as randomService from '@shared/services/random/random.service';
import * as cryptoService from '@shared/services/crypto/crypto.service';

function validateForm(schemaName: string, form: Object) {
    const formValidation = joi.validate(
        form,
        endpointSchemas[schemaName],
        { stripUnknown: true }
    );

    return formValidation;
}

async function create(req: IRequest) {
    const dbConnection = dbService.getDbConnection();
    const schemaName = req.endpoint.config.form.schema;
    let items = (req.endpoint.config.createMultipleItems) ? req.body : [req.body];
    const defaults = req.endpoint.config.form.defaults;
    const defaultKeys = Object.keys(defaults);

    if (defaults) {
        for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
            for (let defaultKeyIndex = 0; defaultKeyIndex < defaultKeys.length; defaultKeyIndex++) {
                let defaultValue = defaults[defaultKeys[defaultKeyIndex]];
                if (typeof (defaultValue) === 'string') {
                    if (defaultValue.includes('$user')) {
                        const userProperty = defaultValue.split('.')[1];
                        defaultValue = req.user[userProperty];
                    } else if (defaultValue.includes('$randomString')) {
                        const randomStringLength = Number(defaultValue.split(':')[1]);
                        defaultValue = randomService.randomString(randomStringLength);
                    } else if (defaultValue.includes('$md5')) {
                        defaultValue = md5(items[itemIndex][defaultKeys[defaultKeyIndex]]);
                    } else if (defaultValue.includes('$hash')) {
                        defaultValue = cryptoService.hash(items[itemIndex][defaultKeys[defaultKeyIndex]]);
                    }
                }

                items[itemIndex][defaultKeys[defaultKeyIndex]] = defaultValue;
            }
        }
    }

    const formValid = validateForm(
        schemaName,
        (req.endpoint.config.createMultipleItems) ? items : items[0]
    );
    if (!formValid.error) {
        const insertResponse = await dbConnection(req.endpoint.config.table).returning('*').insert(formValid.value);
        return (req.endpoint.config.createMultipleItems) ? insertResponse : insertResponse[0];
    } else {
        throw new Error(formValid.error.message);
    }
}

export {
    create,
};
