"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Logger = require("../utils/Logger");

var _Admin = require("../model/Admin");

var _Admin2 = _interopRequireDefault(_Admin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AdminService = function () {
    function AdminService() {
        _classCallCheck(this, AdminService);
    }

    _createClass(AdminService, null, [{
        key: "getAdmins",
        value: async function getAdmins() {
            try {
                return await _Admin2.default.find({}).sort({ " _id": -1 });
            } catch (error) {
                (0, _Logger.Tracer)("Get Admins", error.message, error);
            }
        }
    }, {
        key: "getAdmin",
        value: async function getAdmin(adminId) {
            try {
                return await _Admin2.default.findOne({ _id: adminId });
            } catch (error) {
                (0, _Logger.Tracer)("Get Admin", error.message, error);
            }
        }
    }, {
        key: "getAdminEmail",
        value: async function getAdminEmail(email) {
            try {
                return await _Admin2.default.findOne({ email: email });
            } catch (error) {
                (0, _Logger.Tracer)("Get Admin Email", error.message, error);
            }
        }
    }, {
        key: "deleteAdmin",
        value: async function deleteAdmin(adminId) {
            try {
                return await _Admin2.default.findByIdAndRemove({ _id: adminId });
            } catch (error) {
                (0, _Logger.Tracer)("Delete Admin", error.message, error);
            }
        }
    }, {
        key: "createAdmin",
        value: async function createAdmin(payload) {
            try {
                return await _Admin2.default.create(payload);
            } catch (error) {
                (0, _Logger.Tracer)("Create Admin", error.message, error);
            }
        }
    }]);

    return AdminService;
}();

exports.default = AdminService;
//# sourceMappingURL=AdminService.js.map