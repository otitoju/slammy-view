"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var STATUS_OK = {
    code: 200,
    response: "OK"
};

var STATUS_CREATED = {
    code: 201,
    response: "CREATED"
};

var STATUS_BAD_REQUEST = {
    code: 400,
    response: "BAD REQUEST"
};

var STATUS_NOTFOUND = {
    code: 404,
    response: "RECORD NOT FOUND"
};

var STATUS_SERVER_ERROR = {
    code: 500,
    response: "INTERNAL SERVER ERROR"
};

exports.default = {
    STATUS_OK: STATUS_OK,
    STATUS_CREATED: STATUS_CREATED,
    STATUS_BAD_REQUEST: STATUS_BAD_REQUEST,
    STATUS_NOTFOUND: STATUS_NOTFOUND,
    STATUS_SERVER_ERROR: STATUS_SERVER_ERROR
};
//# sourceMappingURL=HttpResponse.js.map