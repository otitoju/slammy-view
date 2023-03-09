"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Service = require("../services/Service");

var _Service2 = _interopRequireDefault(_Service);

var _Logger = require("../utils/Logger");

var _HttpResponse = require("../utils/HttpResponse");

var _HttpResponse2 = _interopRequireDefault(_HttpResponse);

var _cloudinary = require("cloudinary");

var _cloudinary2 = _interopRequireDefault(_cloudinary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ServiceController = function () {
  function ServiceController() {
    _classCallCheck(this, ServiceController);
  }

  _createClass(ServiceController, null, [{
    key: "CreateService",
    value: async function CreateService(req, res) {
      try {
        var _req$body = req.body,
            title = _req$body.title,
            content = _req$body.content,
            price = _req$body.price,
            currency = _req$body.currency;

        if (!title || !content || !price || !currency) {
          return res.status(400).json({
            STATUS: _HttpResponse2.default.STATUS_BAD_REQUEST.code,
            MESSAGE: _HttpResponse2.default.STATUS_BAD_REQUEST.response
          });
        } else if (req.file == undefined || req.file == '') {
          return res.status(400).json({
            STATUS: _HttpResponse2.default.STATUS_BAD_REQUEST.code,
            MESSAGE: _HttpResponse2.default.STATUS_BAD_REQUEST.response
          });
        } else {
          var file = req.file.path;
          var result = await _cloudinary2.default.uploader.upload(file);
          var imgUrl = result.secure_url;
          var data = await _Service2.default.createService(req.body);
          data.image = imgUrl;
          await data.save();
          return res.status(201).json({
            STATUS: _HttpResponse2.default.STATUS_CREATED.code,
            MESSAGE: _HttpResponse2.default.STATUS_CREATED.response,
            info: data
          });
        }
      } catch (error) {
        console.log(error);
        (0, _Logger.Tracer)("CreateService", error.message, error);
        return res.status(500).json({
          STATUS: _HttpResponse2.default.STATUS_SERVER_ERROR.code,
          MESSAGE: _HttpResponse2.default.STATUS_SERVER_ERROR.response
        });
      }
    }
  }, {
    key: "GetServices",
    value: async function GetServices(_req, res) {
      try {
        var data = await _Service2.default.getServices();
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
        (0, _Logger.Tracer)("GetService", error.message, error);
        return res.status(500).json({
          STATUS: _HttpResponse2.default.STATUS_SERVER_ERROR.code,
          MESSAGE: _HttpResponse2.default.STATUS_SERVER_ERROR.response
        });
      }
    }
  }, {
    key: "GetService",
    value: async function GetService(req, res) {
      try {
        var serviceId = req.params.serviceId;

        var data = await _Service2.default.getService(serviceId);
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
        (0, _Logger.Tracer)("GetService", error.message, error);
        return res.status(500).json({
          STATUS: _HttpResponse2.default.STATUS_SERVER_ERROR.code,
          MESSAGE: _HttpResponse2.default.STATUS_SERVER_ERROR.response
        });
      }
    }
  }, {
    key: "DeleteService",
    value: async function DeleteService(req, res) {
      try {
        var serviceId = req.params.serviceId;

        var data = await _Service2.default.deleteService(serviceId);
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
        (0, _Logger.Tracer)("DeleteService", error.message, error);
        return res.status(500).json({
          STATUS: _HttpResponse2.default.STATUS_SERVER_ERROR.code,
          MESSAGE: _HttpResponse2.default.STATUS_SERVER_ERROR.response
        });
      }
    }
  }, {
    key: "UpdateService",
    value: async function UpdateService(req, res) {
      try {
        var serviceId = req.params.serviceId;

        var data = await _Service2.default.getService(serviceId);
        if (data) {
          var _req$body2 = req.body,
              title = _req$body2.title,
              content = _req$body2.content,
              price = _req$body2.price;


          data.title = title || data.title;
          data.content = content || data.content;
          data.price = price || data.price;

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
        (0, _Logger.Tracer)("UpdateService", error.message, error);
        return res.status(500).json({
          STATUS: _HttpResponse2.default.STATUS_SERVER_ERROR.code,
          MESSAGE: _HttpResponse2.default.STATUS_SERVER_ERROR.response
        });
      }
    }
  }, {
    key: "UpdateServiceImage",
    value: async function UpdateServiceImage(req, res) {
      try {
        var serviceId = req.params.serviceId;

        var data = await _Service2.default.getService(serviceId);
        if (data) {
          var file = req.file.path;
          var result = await _cloudinary2.default.uploader.upload(file);
          var imgUrl = result.secure_url;
          data.image = imgUrl || data.image;

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
        (0, _Logger.Tracer)("UpdateServiceImage", error.message, error);
        return res.status(500).json({
          STATUS: _HttpResponse2.default.STATUS_SERVER_ERROR.code,
          MESSAGE: _HttpResponse2.default.STATUS_SERVER_ERROR.response
        });
      }
    }
  }]);

  return ServiceController;
}();

exports.default = ServiceController;
//# sourceMappingURL=ServiceController.js.map