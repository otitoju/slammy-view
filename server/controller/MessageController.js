import Model from "../model/Message";
import { Tracer } from "../utils/Logger";
import STATUS from "../utils/HttpResponse";
const nodemailer = require("nodemailer");

async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
    
    //console.log(testAccount)
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: "bar@example.com, baz@example.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

export default class MessageController {
  static async SendMessage(req, res) {
    try {
        const { sender, email, phone, message } = req.body;
        if(!sender || !email || !phone || !message) {
            return res.status(400).json({
                STATUS: STATUS.STATUS_BAD_REQUEST.code,
                MESSAGE: STATUS.STATUS_BAD_REQUEST.response,
            });
        }
        else {
            const info = await Model.create(req.body);
            //await main();
            return res.status(201).json({
                STATUS: STATUS.STATUS_CREATED.code,
                MESSAGE: STATUS.STATUS_CREATED.response,
                info: info,
              });
        }
    } catch (error) {
      Tracer("Send mail", error.message, error);
      return res.status(500).json({
        STATUS: STATUS.STATUS_SERVER_ERROR.code,
        MESSAGE: STATUS.STATUS_SERVER_ERROR.response,
      });
    }
  }

  static async GetMessages(req, res) {
    try {
        const data = await Model.find({}).sort( {"_id": -1 });
      if (data.length > 0) {
        return res.status(200).json({
          info: data,
        });
      }
      else {
        return res.status(404).json({
            STATUS: STATUS.STATUS_NOTFOUND.code,
            MESSAGE: STATUS.STATUS_NOTFOUND.response
        });
      }
    } catch (error) {
      Tracer("Get mails", error.message, error);
      return res.status(500).json({
        STATUS: STATUS.STATUS_SERVER_ERROR.code,
        MESSAGE: STATUS.STATUS_SERVER_ERROR.response,
      });
    }
  }

  static async GetMessage(req, res) {
    try {
      const { messageId } = req.params;
      const data = await Model.findOne({ _id: messageId });
      if (data) {
        return res.status(200).json({
          info: data,
        });
      } else {
        return res.status(404).json({
          STATUS: STATUS.STATUS_NOTFOUND.code,
          MESSAGE: STATUS.STATUS_NOTFOUND.response,
        });
      }
    } catch (error) {
      Tracer("GetMessage", error.message, error);
      return res.status(500).json({
        STATUS: STATUS.STATUS_SERVER_ERROR.code,
        MESSAGE: STATUS.STATUS_SERVER_ERROR.response,
      });
    }
  }

  static async DeleteMessage(req, res) {
    try {
      const { messageId } = req.params;
      const data = await Model.findOneAndRemove({ _id: messageId });
      if (data) {
        return res.status(200).json({
          Message: "DELETED"
        });
      } else {
        return res.status(404).json({
          STATUS: STATUS.STATUS_NOTFOUND.code,
          MESSAGE: STATUS.STATUS_NOTFOUND.response,
        });
      } 
    } catch (error) {
      Tracer("GetMessage", error.message, error);
      return res.status(500).json({
        STATUS: STATUS.STATUS_SERVER_ERROR.code,
        MESSAGE: STATUS.STATUS_SERVER_ERROR.response,
      });
    }
  }
}
