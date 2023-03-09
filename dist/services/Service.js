"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Logger = require("../utils/Logger");

var _Service = require("../model/Service");

var _Service2 = _interopRequireDefault(_Service);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RenderService = function () {
    function RenderService() {
        _classCallCheck(this, RenderService);
    }

    _createClass(RenderService, null, [{
        key: "getServices",
        value: async function getServices() {
            try {
                return await _Service2.default.find({}).sort({ " _id": -1 });
            } catch (error) {
                (0, _Logger.Tracer)("Get Service", error.message, error);
            }
        }
    }, {
        key: "getService",
        value: async function getService(serviceId) {
            try {
                return await _Service2.default.findOne({ _id: serviceId });
            } catch (error) {
                (0, _Logger.Tracer)("Get Service", error.message, error);
            }
        }
    }, {
        key: "deleteService",
        value: async function deleteService(serviceId) {
            try {
                return await _Service2.default.findOneAndRemove({ _id: serviceId });
            } catch (error) {
                (0, _Logger.Tracer)("Delete Service", error.message, error);
            }
        }
    }, {
        key: "createService",
        value: async function createService(payload) {
            try {
                return await _Service2.default.create(payload);
            } catch (error) {
                (0, _Logger.Tracer)("Delete Service", error.message, error);
            }
        }
    }]);

    return RenderService;
}();

exports.default = RenderService;
//# sourceMappingURL=Service.js.map