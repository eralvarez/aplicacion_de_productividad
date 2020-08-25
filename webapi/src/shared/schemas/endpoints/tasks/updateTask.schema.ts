import * as joi from 'joi';

const taskFinishSchema = joi.object().keys({
    tookTimeToFinish: joi.number().integer(),
    finished: joi.boolean(),
    finishedAt: joi.date(),
});

const taskUpdateSchema = joi.object().keys({
    description: joi.string(),
    duration: joi.number().integer(),
});

export {
    taskFinishSchema,
    taskUpdateSchema,
};
