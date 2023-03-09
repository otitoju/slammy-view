"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Transaction = require("../model/Transaction");

var _Transaction2 = _interopRequireDefault(_Transaction);

var _Logger = require("../utils/Logger");

var _HttpResponse = require("../utils/HttpResponse");

var _HttpResponse2 = _interopRequireDefault(_HttpResponse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TransactionController = function () {
  function TransactionController() {
    _classCallCheck(this, TransactionController);
  }

  _createClass(TransactionController, null, [{
    key: "NewTransaction",
    value: async function NewTransaction(req, res) {
      try {
        var info = await _Transaction2.default.create(req.body);
        return res.status(201).json({
          STATUS: _HttpResponse2.default.STATUS_CREATED.code,
          MESSAGE: _HttpResponse2.default.STATUS_CREATED.response,
          info: info
        });
      } catch (error) {
        (0, _Logger.Tracer)("Transaction", error.message, error);
        return res.status(500).json({
          STATUS: _HttpResponse2.default.STATUS_SERVER_ERROR.code,
          MESSAGE: _HttpResponse2.default.STATUS_SERVER_ERROR.response
        });
      }
    }
  }, {
    key: "Transactions",
    value: async function Transactions(req, res) {
      try {
        var data = await _Transaction2.default.find({}).sort({ "_id": -1 });
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
        (0, _Logger.Tracer)("Transaction", error.message, error);
        return res.status(500).json({
          STATUS: _HttpResponse2.default.STATUS_SERVER_ERROR.code,
          MESSAGE: _HttpResponse2.default.STATUS_SERVER_ERROR.response
        });
      }
    }
  }, {
    key: "GetTransaction",
    value: async function GetTransaction(req, res) {
      try {
        var trxId = req.params.trxId;

        var data = await _Transaction2.default.findOne({ _id: trxId });
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
        (0, _Logger.Tracer)("GetTransaction", error.message, error);
        return res.status(500).json({
          STATUS: _HttpResponse2.default.STATUS_SERVER_ERROR.code,
          MESSAGE: _HttpResponse2.default.STATUS_SERVER_ERROR.response
        });
      }
    }
  }, {
    key: "DeleteTransaction",
    value: async function DeleteTransaction(req, res) {
      try {
        var trxId = req.params.trxId;

        var data = await _Transaction2.default.findOneAndRemove({ _id: trxId });
        if (data) {
          return res.status(200).json({
            Message: "DELETED"
          });
        } else {
          return res.status(404).json({
            STATUS: _HttpResponse2.default.STATUS_NOTFOUND.code,
            MESSAGE: _HttpResponse2.default.STATUS_NOTFOUND.response
          });
        }
      } catch (error) {
        (0, _Logger.Tracer)("GetTransaction", error.message, error);
        return res.status(500).json({
          STATUS: _HttpResponse2.default.STATUS_SERVER_ERROR.code,
          MESSAGE: _HttpResponse2.default.STATUS_SERVER_ERROR.response
        });
      }
    }
  }]);

  return TransactionController;
}();

exports.default = TransactionController;
//# sourceMappingURL=TransactionController.js.map