import * as joi from 'joi';


const requiredIdProperty = joi.number().integer().positive().required();
const notRequiredIdProperty = joi.number().integer().positive();

const requiredPriceProperty = joi.number().precision(2).positive().required();
const notRequiredPriceProperty = joi.number().precision(2).positive();

export {
    requiredIdProperty,
    notRequiredIdProperty,
    requiredPriceProperty,
    notRequiredPriceProperty,
};
