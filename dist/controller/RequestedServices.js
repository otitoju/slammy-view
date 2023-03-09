"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _RequestedServices = require("../model/RequestedServices");

var _RequestedServices2 = _interopRequireDefault(_RequestedServices);

var _Logger = require("../utils/Logger");

var _HttpResponse = require("../utils/HttpResponse");

var _HttpResponse2 = _interopRequireDefault(_HttpResponse);

var _cloudinary = require("cloudinary");

var _cloudinary2 = _interopRequireDefault(_cloudinary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RequestedServiceController = function () {
  function RequestedServiceController() {
    _classCallCheck(this, RequestedServiceController);
  }

  _createClass(RequestedServiceController, null, [{
    key: "NewRequest",
    value: async function NewRequest(req, res) {
      try {
        var _req$body = req.body,
            fname = _req$body.fname,
            lname = _req$body.lname,
            phone = _req$body.phone,
            email = _req$body.email,
            qty = _req$body.qty,
            service = _req$body.service;

        if (!fname || !lname || !phone || !email || !qty || !service) {
          return res.status(400).json({
            STATUS: _HttpResponse2.default.STATUS_BAD_REQUEST.code,
            MESSAGE: _HttpResponse2.default.STATUS_BAD_REQUEST.response
          });
        } else {
          var info = await _RequestedServices2.default.create(req.body);
          return res.status(201).json({
            STATUS: _HttpResponse2.default.STATUS_CREATED.code,
            MESSAGE: _HttpResponse2.default.STATUS_CREATED.response,
            info: info
          });
        }
      } catch (error) {
        (0, _Logger.Tracer)("New Request", error.message, error);
        return res.status(500).json({
          STATUS: _HttpResponse2.default.STATUS_SERVER_ERROR.code,
          MESSAGE: _HttpResponse2.default.STATUS_SERVER_ERROR.response
        });
      }
    }
  }, {
    key: "AllRequests",
    value: async function AllRequests(req, res) {
      try {
        var data = await _RequestedServices2.default.find({}).sort({ _id: -1 });
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
        (0, _Logger.Tracer)("Requests", error.message, error);
        return res.status(500).json({
          STATUS: _HttpResponse2.default.STATUS_SERVER_ERROR.code,
          MESSAGE: _HttpResponse2.default.STATUS_SERVER_ERROR.response
        });
      }
    }
  }, {
    key: "GetRequest",
    value: async function GetRequest(req, res) {
      try {
        var requestId = req.params.requestId;

        var data = await _RequestedServices2.default.findOne({ _id: requestId });
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
        (0, _Logger.Tracer)("Get Request", error.message, error);
        return res.status(500).json({
          STATUS: _HttpResponse2.default.STATUS_SERVER_ERROR.code,
          MESSAGE: _HttpResponse2.default.STATUS_SERVER_ERROR.response
        });
      }
    }
  }, {
    key: "DeleteRequest",
    value: async function DeleteRequest(req, res) {
      try {
        var requestId = req.params.requestId;

        var data = await _RequestedServices2.default.findOneAndRemove({ _id: requestId });
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
        (0, _Logger.Tracer)("Delete Request", error.message, error);
        return res.status(500).json({
          STATUS: _HttpResponse2.default.STATUS_SERVER_ERROR.code,
          MESSAGE: _HttpResponse2.default.STATUS_SERVER_ERROR.response
        });
      }
    }
  }, {
    key: "UpdateRequest",
    value: async function UpdateRequest(req, res) {
      try {
        var requestId = req.params.requestId;

        var data = await _RequestedServices2.default.findOne({ _id: requestId });
        if (data) {
          var status = req.body.status;


          data.status = status || data.status;

          await data.save();
          return res.status(200).json({
            STATUS: _HttpResponse2.default.STATUS_OK.code,
            MESSAGE: _HttpResponse2.default.STATUS_OK.response
          });
        } else {
          return res.status(404).json({
            STATUS: _HttpResponse2.default.STATUS_NOTFOUND.code,
            MESSAGE: _HttpResponse2.default.STATUS_NOTFOUND.response
          });
        }
      } catch (error) {
        (0, _Logger.Tracer)("Update Service", error.message, error);
        return res.status(500).json({
          STATUS: _HttpResponse2.default.STATUS_SERVER_ERROR.code,
          MESSAGE: _HttpResponse2.default.STATUS_SERVER_ERROR.response
        });
      }
    }
  }]);

  return RequestedServiceController;
}();

exports.default = RequestedServiceController;
//# sourceMappingURL=RequestedServices.js.map