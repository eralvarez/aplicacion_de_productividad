import * as joi from 'joi';

import * as dbService from '@shared/services/db/db.service';
import * as cryptoService from '@shared/services/crypto/crypto.service';
import * as randomService from '@shared/services/random/random.service';
import * as authSchema from './auth.schemas';


async function validateToken(token) {
    const { authRedisConnection } = dbService.getRedisConnection();
    let user = await authRedisConnection.getAsync(token);
    let foundToken = false;

    if (user) {
        user = await joi.validate(JSON.parse(user), authSchema.userPublic, { stripUnknown: true });
        foundToken = true;
    }

    return {
        user,
        foundToken,
    };
}

async function validateCredentials(loginForm) {
    const knexConnection = dbService.getDbConnection();
    const { authRedisConnection } = dbService.getRedisConnection();
    const hashedPassword = cryptoService.hash(loginForm.password);

    let auth = false;
    let authToken = null;
    const userFound = await knexConnection('users').where({
        email: loginForm.email,
        password: hashedPassword,
    }).select('*').limit(1);
    
    if (userFound.length > 0) {
        const user = await joi.validate(userFound[0], authSchema.userPublic, { stripUnknown: true });
        auth = true;
        authToken = randomService.randomString(40);

        authRedisConnection.set(authToken, JSON.stringify(user), 'EX', 60 * 60 * 24 * 7);
    }

    return {
        auth,
        token: authToken,
    };
}

export {
    validateToken,
    validateCredentials,
};
