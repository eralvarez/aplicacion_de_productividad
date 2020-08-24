/**
 * @typedef {Object} QueryResponse
 * @property {(Object|string)} error If any error happened doing a query/transaction, we will get it here
 * @property {(Object|Array)} data The response of what we are looking for.
 */

function buildResponse() {
    return Object.assign({}, {
        error: null,
        data: null,
    });
}

module.exports = {
    buildResponse,
};