import * as joi from 'joi';

const validateCredentials = joi.object().keys({
    email: joi.string().email().required(),
    password: joi.string().required(),
});

const validateToken = joi.object().keys({
    token: joi.string().required(),
});

const userPublic = joi.object().keys({
    id: joi.number().integer(),
    firstName: joi.string(),
    lastName: joi.string(),
    email: joi.string(),
    type: joi.string(),
    active: joi.boolean(),
    createdAt: joi.date(),
    updatedAt: joi.date(),
});

export {
    validateCredentials,
    validateToken,
    userPublic,
};
