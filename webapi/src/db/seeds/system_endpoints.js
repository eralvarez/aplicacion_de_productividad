exports.seed = function (knex) {
    return knex('system_endpoints').del()
        .then(function () {

            const systemEndpoints = [
                {
                    route: 'tasks',
                    method: 'GET',
                    config: JSON.stringify({
                        table: 'tasks',
                        attributes: [
                            'id',
                            'title',
                            'description',
                            'duration',
                        ],
                        query: {},
                        fixedQuery: {
                            tableProperty: 'finished',
                            compareTo: 'false',
                            operation: '=',
                        },
                        orderBy: [
                            {
                                column: 'id',
                                order: 'desc',
                            },
                            {
                                column: 'createdAt',
                                order: 'desc',
                            },
                        ],
                    }),
                },
                {
                    route: 'tasks',
                    method: 'POST',
                    config: JSON.stringify({
                        table: 'tasks',
                        createMultipleItems: false,
                        form: {
                            schema: 'taskCreateSchema',
                            defaults: { },
                        },
                    }),
                },
                {
                    route: 'finished/tasks',
                    method: 'GET',
                    config: JSON.stringify({
                        table: 'tasks',
                        attributes: [
                            'id',
                            'title',
                            'description',
                            'duration',
                            'tookTimeToFinish',
                            'finished',
                            'finishedAt',
                        ],
                        query: {},
                        fixedQuery: {
                            tableProperty: 'finished',
                            compareTo: 'true',
                            operation: '=',
                        },
                        orderBy: [
                            {
                                column: 'id',
                                order: 'desc',
                            },
                            {
                                column: 'createdAt',
                                order: 'desc',
                            },
                        ],
                    }),
                },
                {
                    route: 'tasks/finish',
                    method: 'PUT',
                    config: JSON.stringify({
                        table: 'tasks',
                        queryUrlParamConfig: {
                            tableProperty: 'id',
                            paramType: 'number', // string/number
                            operation: '=',
                        },
                        form: {
                            schema: 'taskFinishSchema',
                            defaults: {}
                        },
                    }),
                },
                {
                    route: 'tasks',
                    method: 'PUT',
                    config: JSON.stringify({
                        table: 'tasks',
                        queryUrlParamConfig: {
                            tableProperty: 'id',
                            paramType: 'number', // string/number
                            operation: '=',
                        },
                        form: {
                            schema: 'taskUpdateSchema',
                            defaults: {}
                        },
                    }),
                },
                {
                    route: 'tasks',
                    method: 'DELETE',
                    config: JSON.stringify({
                        table: 'tasks',
                        queryUrlParamConfig: {
                            tableProperty: 'id',
                            paramType: 'number',
                            operation: '=',
                        },
                    }),
                },
            ];

            return knex('system_endpoints').insert(systemEndpoints);
        });
};