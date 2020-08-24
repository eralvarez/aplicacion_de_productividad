import * as joi from 'joi';


const requiredIdSchema = joi.object().keys({
    id: joi.number().integer().positive().required(),
});

const notRequiredIdSchema = joi.object().keys({
    id: joi.number().integer().positive(),
});

/**
 * Generate custom id joi schema 
 * @param {Object} idKey - custom id key name
 * @returns {Object} - Returns joi schema
 */
function generateRequiredIdSchema({ idKey }) {
    return joi.object().keys({
        [idKey]: joi.number().integer().positive().required()
    });
}

export {
    requiredIdSchema,
    notRequiredIdSchema,
    generateRequiredIdSchema,
};
