import { Request } from 'express';

import { IUserPublic } from '@shared/interfaces/user.interface';

type TEndpointMethod = 'GET' | 'POST' | 'DELETE' | 'PUT';
type TEndpointConfigOrderByOrder = 'asc' | 'desc';
type TEndpointConfigJoinOneTo = 'single' | 'many';
type TEndpointConfigAuthVerify = 'type' | 'id' | 'both' | 'none';
type TEndpointConfigQueryOperation = 'like' | '=' | '<' | '>';
type TEndpointConfigFixedQueryOperation = '=' | '<' | '>';
type TEndpointConfigQueryLikeWildcardStartEnd = '%' | '';
type TIEndpointConfigCacheStrategy = 'expire' | 'autoRefresh';
type TEndpointConfigQueryUrlParamParamType = 'string' | 'number';

interface IEndpointConfigPagination {
    pageQueryAlias: string;
    limitQueryAlias: string;
    defaultItemsPerPage: number;
}

interface IEndpointConfigJoin {
    table: string;
    property: string;
    parentReference: string;
    reference: string;
    oneTo: TEndpointConfigJoinOneTo;
    attributes: string[];
}

interface IEndpointConfigOrderBy {
    column: string;
    order: TEndpointConfigOrderByOrder;
}

interface IEndpointConfigAuth {
    required: boolean;
    verify: TEndpointConfigAuthVerify;
    userType?: string;
    userId?: number;
}

interface IEndpointConfigFixedQuery {
    tableProperty: string,
    compareTo: string,
    operation: TEndpointConfigFixedQueryOperation,
}

interface IEndpointConfigQueryLikeWildcard {
    start: TEndpointConfigQueryLikeWildcardStartEnd,
    end: TEndpointConfigQueryLikeWildcardStartEnd,
}

interface IEndpointConfigQuery {
    [key: string]: {
        operation: TEndpointConfigQueryOperation,
        aliasFor: string,
        likeWildcard?: IEndpointConfigQueryLikeWildcard,
    },
}

interface IEndpointConfigCacheExpirationTime {
    seconds:  number;
    minutes: number;
    hours: number;
    days: number;
}

interface IEndpointConfigCache {
    strategy: TIEndpointConfigCacheStrategy;
    expirationTime: IEndpointConfigCacheExpirationTime;
}

interface IEndpointConfigForm {
    schema: string;
    defaults: Object;
}

interface IEndpointConfigQueryUrlParam {
    tableProperty: string;
    paramType: TEndpointConfigQueryUrlParamParamType;
    operation: TEndpointConfigFixedQueryOperation,
}

interface IEndpointConfig {
    table: string;
    // SELECT config
    attributes: string[];
    query?: IEndpointConfigQuery;
    alias?: string;
    singleObjectResponse?: boolean;
    orderBy?: IEndpointConfigOrderBy[];
    join?: IEndpointConfigJoin[];
    pagination?: IEndpointConfigPagination;
    auth?: IEndpointConfigAuth;
    fixedQuery?: IEndpointConfigFixedQuery;
    cache?: IEndpointConfigCache;

    // CREATE config
    form: IEndpointConfigForm,
    createMultipleItems: boolean;

    // UPDATE/DELETE config
    queryUrlParamConfig: IEndpointConfigQueryUrlParam,
}

interface IEndpoint {
    id: number;
    route: string;
    method: TEndpointMethod;
    config: IEndpointConfig;
}

interface IPagination {
    page?: number;
    limit?: number;
}

interface IRequest extends Request {
    endpoint?: IEndpoint;
    pagination?: IPagination;
    user?: IUserPublic;
    isAuth?: boolean;
    token?: string;
    selectCacheKey?: string;
    queryUrlParam?: string | number;
}

export {
    TEndpointMethod,
    TEndpointConfigOrderByOrder,
    TEndpointConfigJoinOneTo,
    TEndpointConfigAuthVerify,
    TEndpointConfigQueryOperation,
    TEndpointConfigQueryLikeWildcardStartEnd,
    TIEndpointConfigCacheStrategy,
    IEndpointConfigPagination,
    IEndpointConfigJoin,
    IEndpointConfigOrderBy,
    IEndpointConfigAuth,
    IEndpointConfigFixedQuery,
    IEndpointConfigQueryLikeWildcard,
    IEndpointConfigQuery,
    IEndpointConfigCacheExpirationTime,
    IEndpointConfigCache,
    IEndpointConfig,
    IEndpoint,
    IPagination,
    IRequest,
};
