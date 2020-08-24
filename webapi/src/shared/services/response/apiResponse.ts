// wrapper for common http status codes

function sendResponse(res, httpCode, message?) {
    if (message) {
        let response;

        if (typeof message == 'object') {
            response = message;
        } else {
            response = {
                message: message,
            };
        }

        res.status(httpCode).json(response);
    } else {
        res.status(httpCode).send();
    }
}

// 2xx
// ok request
// for: GET
function success(res, data) {
    data = data || undefined;
    // res.setHeader('Content-Type', 'application/json');
    res.status(200).json(data);
}

// ok request
// for: POST
function created(res, message?) {
    message = (message) ? message : 'created';
    sendResponse(res, 201, message);
}

// ok delete request
// for: DELETE
function successDelete(res) {
    sendResponse(res, 204);
}

// ok update request
// for: PUT/PATCH
function successUpdate(res, message?) {
    message = (message) ? message : {};
    sendResponse(res, 204, message);
}

// 4xx
// required user to log in
// for: GET, PUT, POST, DELETE
function unauthorized(res, message?) {
    message = (message) ? message : 'please log in';
    sendResponse(res, 401, message);
}

// user has no access to this particular endpoint
// for: GET, PUT, POST, DELETE
function forbidden(res, message?) {
    message = (message) ? message : 'forbidden for current user';
    sendResponse(res, 403, message);
}

// unreachable endpoint
// id of request not found
// for: GET, PUT, POST, DELETE
function notFound(res, message?) {
    message = (message) ? message : 'not found';
    sendResponse(res, 404, message);
}

// error when item already created, payload error
// for: POST, PUT
function conflict(res, message?) {
    // message = (message) ? message : 'conflict doing request';
    sendResponse(res, 409, message);
}

// 5xx
// there is some SQL/DB error
// internal error
// for: GET, PUT, POST, DELETE
function error(res, error?, message?) {
    message = (message) ? message : 'internal server error';
    if (error) {
        console.error('ERROR: ----------------');
        console.error(error);
    }
    
    sendResponse(res, 500, message);
}

export {
    success,
    created,
    successDelete,
    successUpdate,
    unauthorized,
    forbidden,
    notFound,
    conflict,
    error,
};