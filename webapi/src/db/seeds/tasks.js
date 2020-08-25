const faker = require('faker');
const moment = require('moment');

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max) + 1;
    return Math.floor(Math.random() * (max - min) + min);
}

exports.seed = function (knex) {
    return knex('tasks').del()
        .then(function () {

            const tasks = [];
            for (let index = 0; index < Array(50).length; index++) {
                const day = getRandomInt(0, 6);
                const createdAt = moment().subtract(1, 'weeks').startOf('week').format();
                const finishedAt = moment().subtract(1, 'weeks').startOf('week').add(day, 'day').format();
                tasks.push({
                    title: `task #${index + 1}`,
                    description: `description ${index + 1}`,
                    duration: getRandomInt(20, 50),
                    tookTimeToFinish: getRandomInt(30, 40),
                    finished: true,
                    finishedAt,
                    createdAt,
                });
            }

            return knex('tasks').insert(tasks);
        });
};