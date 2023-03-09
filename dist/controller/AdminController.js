"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AdminService = require("../services/AdminService");

var _AdminService2 = _interopRequireDefault(_AdminService);

var _Logger = require("../utils/Logger");

var _HttpResponse = require("../utils/HttpResponse");

var _HttpResponse2 = _interopRequireDefault(_HttpResponse);

var _bcryptjs = require("bcryptjs");

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require("../utils/config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AdminController = function () {
    function AdminController() {
        _classCallCheck(this, AdminController);
    }

    _createClass(AdminController, null, [{
        key: "NewAdmin",
        value: async function NewAdmin(req, res) {
            try {
                var _req$body = req.body,
                    username = _req$body.username,
                    password = _req$body.password,
                    email = _req$body.email;

                console.log(req.body);
                if (!username || !password || !email) {
                    return res.status(400).json({
                        STATUS: _HttpResponse2.default.STATUS_BAD_REQUEST.code,
                        MESSAGE: _HttpResponse2.default.STATUS_BAD_REQUEST.response
                    });
                } else {
                    var hashed = _bcryptjs2.default.hashSync(password, 10);
                    var data = await _AdminService2.default.createAdmin(req.body);
                    data.password = hashed;
                    await data.save();
                    return res.status(201).json({
                        STATUS: _HttpResponse2.default.STATUS_CREATED.code,
                        MESSAGE: _HttpResponse2.default.STATUS_CREATED.response
                    });
                }
            } catch (error) {
                (0, _Logger.Tracer)("CREATE ADMIN", error.message, error);
                return res.status(500).json({
                    STATUS: _HttpResponse2.default.STATUS_SERVER_ERROR.code,
                    MESSAGE: _HttpResponse2.default.STATUS_SERVER_ERROR.response
                });
            }
        }
    }, {
        key: "LoginAdmin",
        value: async function LoginAdmin(req, res) {
            try {
                var _req$body2 = req.body,
                    email = _req$body2.email,
                    password = _req$body2.password;

                if (!email || !password) {
                    return res.status(400).json({
                        STATUS: _HttpResponse2.default.STATUS_BAD_REQUEST.code,
                        MESSAGE: _HttpResponse2.default.STATUS_BAD_REQUEST.response
                    });
                } else {
                    var Admin = await _AdminService2.default.getAdminEmail(email);
                    if (!Admin) {
                        return res.status(404).json({
                            STATUS: _HttpResponse2.default.STATUS_NOTFOUND.code,
                            MESSAGE: _HttpResponse2.default.STATUS_NOTFOUND.response
                        });
                    } else {
                        var passwordIsValid = _bcryptjs2.default.compareSync(password, Admin.password);
                        if (!passwordIsValid) {
                            return res.status(404).json({
                                STATUS: _HttpResponse2.default.STATUS_NOTFOUND.code,
                                MESSAGE: _HttpResponse2.default.STATUS_NOTFOUND.response
                            });
                        } else {
                            var token = await _jsonwebtoken2.default.sign({ id: Admin._id, email: Admin.email, username: Admin.username }, _config2.default.LOGIN_SECRET, { expiresIn: 8600 });
                            return res.status(200).json({
                                STATUS: _HttpResponse2.default.STATUS_OK.code,
                                MESSAGE: _HttpResponse2.default.STATUS_OK.response,
                                Token: token
                            });
                        }
                    }
                }
            } catch (error) {
                (0, _Logger.Tracer)("LOGIN ADMIN", error.message, error);
                return res.status(500).json({
                    STATUS: _HttpResponse2.default.STATUS_SERVER_ERROR.code,
                    MESSAGE: _HttpResponse2.default.STATUS_SERVER_ERROR.response
                });
            }
        }
    }, {
        key: "GetAdmins",
        value: async function GetAdmins(req, res) {
            try {
                var data = await _AdminService2.default.getAdmins();
                if (data.length > 0) {
                    return res.status(200).json({
                        info: data
                    });
                } else {
                    return res.status(404).json({
                        STATUS: _HttpResponse2.default.STATUS_NOTFOUND.code,
                        MESSAGE: _HttpResponse2.default.STATUS_NOTFOUND.response
                    });
                }
            } catch (error) {
                (0, _Logger.Tracer)("RETURN ADMIN", error.message, error);
                return res.status(500).json({
                    STATUS: _HttpResponse2.default.STATUS_SERVER_ERROR.code,
                    MESSAGE: _HttpResponse2.default.STATUS_SERVER_ERROR.response
                });
            }
        }
    }, {
        key: "GetAdmin",
        value: async function GetAdmin(req, res) {
            try {
                var adminId = req.params.adminId;

                var data = await _AdminService2.default.getAdmin(adminId);
                if (data) {
                    return res.status(200).json({
                        info: data
                    });
                } else {
                    return res.status(404).json({
                        STATUS: _HttpResponse2.default.STATUS_NOTFOUND.code,
                        MESSAGE: _HttpResponse2.default.STATUS_NOTFOUND.response
                    });
                }
            } catch (error) {
                (0, _Logger.Tracer)("RETURN ADMIN", error.message, error);
                return res.status(500).json({
                    STATUS: _HttpResponse2.default.STATUS_SERVER_ERROR.code,
                    MESSAGE: _HttpResponse2.default.STATUS_SERVER_ERROR.response
                });
            }
        }
    }, {
        key: "DeleteAdmin",
        value: async function DeleteAdmin(req, res) {
            try {
                var adminId = req.params.adminId;

                var data = await _AdminService2.default.deleteAdmin(adminId);
                if (data) {
                    return res.status(200).json({
                        info: data
                    });
                } else {
                    return res.status(404).json({
                        STATUS: _HttpResponse2.default.STATUS_NOTFOUND.code,
                        MESSAGE: _HttpResponse2.default.STATUS_NOTFOUND.response
                    });
                }
            } catch (error) {
                (0, _Logger.Tracer)("DELETE ADMIN", error.message, error);
                return res.status(500).json({
                    STATUS: _HttpResponse2.default.STATUS_SERVER_ERROR.code,
                    MESSAGE: _HttpResponse2.default.STATUS_SERVER_ERROR.response
                });
            }
        }
    }]);

    return AdminController;
}();

exports.default = AdminController;
//# sourceMappingURL=AdminController.js.map