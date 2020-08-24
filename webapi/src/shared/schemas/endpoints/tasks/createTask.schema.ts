import * as joi from 'joi';

const taskCreateSchema = joi.object().keys({
    title: joi.string(),
    description: joi.string(),
    duration: joi.number().integer().positive(),
    finished: joi.boolean(),
    tookTimeToFinish: joi.number().integer().positive(),
    finishedAt: joi.date(),
});

const tasksCreateSchema = joi.array().items(taskCreateSchema);

export {
    taskCreateSchema,
    tasksCreateSchema,
};
