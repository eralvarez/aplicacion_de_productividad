import * as joi from 'joi';
import * as md5 from 'md5';

import { IRequest } from '@shared/interfaces/endpoint.interface';
import * as dbService from '@shared/services/db/db.service';
import * as endpointSchemas from '@shared/schemas/endpoints';
import * as randomService from '@shared/services/random/random.service';
import * as cryptoService from '@shared/services/crypto/crypto.service';


async function update(req: IRequest) {
    let dbConnection = dbService.getDbConnection();
    const schemaName = req.endpoint.config.form.schema;
    const defaults = req.endpoint.config.form.defaults;
    const defaultKeys = Object.keys(defaults);
    req.body = req.body || {};

    if (defaults) {
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
                    defaultValue = md5(req.body[defaultKeys[defaultKeyIndex]]);
                } else if (defaultValue.includes('$hash')) {
                    defaultValue = cryptoService.hash(req.body[defaultKeys[defaultKeyIndex]]);
                }
            }

            req.body[defaultKeys[defaultKeyIndex]] = defaultValue;
        }
    }

    const formValid = joi.validate(
        req.body,
        endpointSchemas[schemaName],
        { stripUnknown: true }
    );
    if (!formValid.error) {
        const updateResponse = await dbConnection(req.endpoint.config.table).update({
            ...formValid.value,
        }).where((builder) => {
            const textQuery = req.queryUrlParam;

            builder.where(
                req.endpoint.config.queryUrlParamConfig.tableProperty,
                req.endpoint.config.queryUrlParamConfig.operation,
                textQuery,
            );

            if (req.endpoint.config.fixedQuery) {
                if (req.isAuth && req.endpoint.config.fixedQuery.compareTo.includes('$user')) {
                    const userProperty = req.endpoint.config.fixedQuery.compareTo.split('.')[1];

                    builder.where(
                        req.endpoint.config.fixedQuery.tableProperty,
                        req.endpoint.config.fixedQuery.operation,
                        req.user[userProperty],
                    );
                } else {
                    builder.where(
                        req.endpoint.config.fixedQuery.tableProperty,
                        req.endpoint.config.fixedQuery.operation,
                        req.endpoint.config.fixedQuery.compareTo,
                    );
                }
            }
        });

        if (updateResponse) {
            return updateResponse;
        } else {
            throw new Error('item not updated');
        }
    } else {
        throw new Error(formValid.error.message);
    }
}

export {
    update,
};
