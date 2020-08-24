const faker = require('faker');

exports.seed = function (knex) {
    return knex('tasks').del()
        .then(function () {

            const tasks = [];
            for (let index = 0; index < Array(10).length; index++) {
                tasks.push({
                    title: `task #${index + 1}`,
                    description: `description #${index + 1}`,
                    duration: 20,
                });
            }

            return knex('tasks').insert(tasks);
        });
};