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
                            'tookTimeToFinish',
                            'finishedAt',
                            'createdAt',
                        ],
                        query: {},
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
                            defaults: {
                                // finished: false,
                            },
                        },
                    }),
                },
                // {
                //     route: 'test/create-user/test2',
                //     method: 'POST',
                //     config: JSON.stringify({
                //         table: 'users',
                //         auth: {
                //             required: true,
                //             verify: 'none', // type/id/both/none
                //             // userType: 'admin',
                //             // userId: 1,
                //         },
                //         createMultipleItems: true,
                //         form: {
                //             schema: 'testUsersCreateSchema',
                //             defaults: {
                //                 firstName: '$user.firstName',
                //                 active: true,
                //             },
                //         },
                //     }),
                // },
                // {
                //     route: 'test/create-user/test3',
                //     method: 'POST',
                //     config: JSON.stringify({
                //         table: 'users',
                //         auth: {
                //             required: true,
                //             verify: 'both', // type/id/both/none
                //             userType: 'admin',
                //             userId: 1,
                //         },
                //         createMultipleItems: false,
                //         form: {
                //             schema: 'testUserCreateSchema',
                //             defaults: {
                //                 firstName: '$md5',
                //                 lastName: '$randomString:20',
                //                 password: '$hash',
                //             },
                //         },
                //     }),
                // },
                // {
                //     route: 'test/update-user/test1',
                //     method: 'PUT',
                //     config: JSON.stringify({
                //         table: 'users',
                //         auth: {
                //             required: true,
                //             verify: 'both', // type/id/both/none
                //             userType: 'admin',
                //             userId: 1,
                //         },
                //         queryUrlParamConfig: {
                //             tableProperty: 'id',
                //             paramType: 'number', // string/number
                //             operation: '=',
                //         },
                //         // fixedQuery: {
                //         //     tableProperty: 'createdBy',
                //         //     compareTo: '$user.id',
                //         //     operation: '=',
                //         // },
                //         form: {
                //             schema: 'testUserUpdateSchema',
                //             // defaults: {
                //             //     firstName: '$md5',
                //             //     lastName: '$randomString:20',
                //             //     password: '$hash',
                //             // },
                //         },
                //     }),
                // },
                // {
                //     route: 'test/update-user/test2',
                //     method: 'PUT',
                //     config: JSON.stringify({
                //         table: 'users',
                //         auth: {
                //             required: true,
                //             verify: 'both', // type/id/both/none
                //             userType: 'admin',
                //             userId: 1,
                //         },
                //         queryUrlParamConfig: {
                //             tableProperty: 'id',
                //             paramType: 'number',
                //             operation: '=',
                //         },
                //         fixedQuery: {
                //             tableProperty: 'type',
                //             compareTo: 'normal',
                //             operation: '=',
                //         },
                //         form: {
                //             schema: 'testUserUpdateSchema',
                //             // defaults: {
                //             //     firstName: '$md5',
                //             //     lastName: '$randomString:20',
                //             //     password: '$hash',
                //             // },
                //         },
                //     }),
                // },
                // {
                //     route: 'test/update-user/test3',
                //     method: 'PUT',
                //     config: JSON.stringify({
                //         table: 'users',
                //         auth: {
                //             required: true,
                //             verify: 'both', // type/id/both/none
                //             userType: 'admin',
                //             userId: 1,
                //         },
                //         queryUrlParamConfig: {
                //             tableProperty: 'id',
                //             paramType: 'number',
                //             operation: '=',
                //         },
                //         form: {
                //             schema: 'testUserUpdateSchema',
                //             defaults: {
                //                 firstName: '$md5',
                //                 lastName: '$randomString:20',
                //             },
                //         },
                //     }),
                // },
                // {
                //     route: 'test/delete-user/test1',
                //     method: 'DELETE',
                //     config: JSON.stringify({
                //         table: 'users',
                //         auth: {
                //             required: true,
                //             verify: 'both', // type/id/both/none
                //             userType: 'admin',
                //             userId: 1,
                //         },
                //         queryUrlParamConfig: {
                //             tableProperty: 'id',
                //             paramType: 'number',
                //             operation: '=',
                //         },
                //     }),
                // },
                // {
                //     route: 'test/delete-user/test2',
                //     method: 'DELETE',
                //     config: JSON.stringify({
                //         table: 'users',
                //         auth: {
                //             required: true,
                //             verify: 'both', // type/id/both/none
                //             userType: 'admin',
                //             userId: 1,
                //         },
                //         queryUrlParamConfig: {
                //             tableProperty: 'id',
                //             paramType: 'number',
                //             operation: '=',
                //         },
                //         fixedQuery: {
                //             tableProperty: 'type',
                //             compareTo: 'normal',
                //             operation: '=',
                //         },
                //     }),
                // },
            ];

            return knex('system_endpoints').insert(systemEndpoints);
        });
};