"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Message = require("../model/Message");

var _Message2 = _interopRequireDefault(_Message);

var _Logger = require("../utils/Logger");

var _HttpResponse = require("../utils/HttpResponse");

var _HttpResponse2 = _interopRequireDefault(_HttpResponse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var nodemailer = require("nodemailer");

async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  var testAccount = await nodemailer.createTestAccount();

  //console.log(testAccount)
  // create reusable transporter object using the default SMTP transport
  var transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass // generated ethereal password
    }
  });

  // send mail with defined transport object
  var info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>" // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

var MessageController = function () {
  function MessageController() {
    _classCallCheck(this, MessageController);
  }

  _createClass(MessageController, null, [{
    key: "SendMessage",
    value: async function SendMessage(req, res) {
      try {
        var _req$body = req.body,
            sender = _req$body.sender,
            email = _req$body.email,
            phone = _req$body.phone,
            message = _req$body.message;

        if (!sender || !email || !phone || !message) {
          return res.status(400).json({
            STATUS: _HttpResponse2.default.STATUS_BAD_REQUEST.code,
            MESSAGE: _HttpResponse2.default.STATUS_BAD_REQUEST.response
          });
        } else {
          var info = await _Message2.default.create(req.body);
          //await main();
          return res.status(201).json({
            STATUS: _HttpResponse2.default.STATUS_CREATED.code,
            MESSAGE: _HttpResponse2.default.STATUS_CREATED.response,
            info: info
          });
        }
      } catch (error) {
        (0, _Logger.Tracer)("Send mail", error.message, error);
        return res.status(500).json({
          STATUS: _HttpResponse2.default.STATUS_SERVER_ERROR.code,
          MESSAGE: _HttpResponse2.default.STATUS_SERVER_ERROR.response
        });
      }
    }
  }, {
    key: "GetMessages",
    value: async function GetMessages(req, res) {
      try {
        var data = await _Message2.default.find({}).sort({ "_id": -1 });
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
        (0, _Logger.Tracer)("Get mails", error.message, error);
        return res.status(500).json({
          STATUS: _HttpResponse2.default.STATUS_SERVER_ERROR.code,
          MESSAGE: _HttpResponse2.default.STATUS_SERVER_ERROR.response
        });
      }
    }
  }, {
    key: "GetMessage",
    value: async function GetMessage(req, res) {
      try {
        var messageId = req.params.messageId;

        var data = await _Message2.default.findOne({ _id: messageId });
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
        (0, _Logger.Tracer)("GetMessage", error.message, error);
        return res.status(500).json({
          STATUS: _HttpResponse2.default.STATUS_SERVER_ERROR.code,
          MESSAGE: _HttpResponse2.default.STATUS_SERVER_ERROR.response
        });
      }
    }
  }, {
    key: "DeleteMessage",
    value: async function DeleteMessage(req, res) {
      try {
        var messageId = req.params.messageId;

        var data = await _Message2.default.findOneAndRemove({ _id: messageId });
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
        (0, _Logger.Tracer)("GetMessage", error.message, error);
        return res.status(500).json({
          STATUS: _HttpResponse2.default.STATUS_SERVER_ERROR.code,
          MESSAGE: _HttpResponse2.default.STATUS_SERVER_ERROR.response
        });
      }
    }
  }]);

  return MessageController;
}();

exports.default = MessageController;
//# sourceMappingURL=MessageController.js.map