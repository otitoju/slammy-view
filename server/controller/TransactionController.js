import Model from "../model/Transaction";
import { Tracer } from "../utils/Logger";
import STATUS from "../utils/HttpResponse";

export default class TransactionController {
  static async NewTransaction(req, res) {
    try {
      const info = await Model.create(req.body);
      return res.status(201).json({
        STATUS: STATUS.STATUS_CREATED.code,
        MESSAGE: STATUS.STATUS_CREATED.response,
        info: info,
      });
    } catch (error) {
      Tracer("Transaction", error.message, error);
      return res.status(500).json({
        STATUS: STATUS.STATUS_SERVER_ERROR.code,
        MESSAGE: STATUS.STATUS_SERVER_ERROR.response,
      });
    }
  }

  static async Transactions(req, res) {
    try {
      const data = await Model.find({}).sort({ "_id": -1 });
      if (data.length > 0) {
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
      Tracer("Transaction", error.message, error);
      return res.status(500).json({
        STATUS: STATUS.STATUS_SERVER_ERROR.code,
        MESSAGE: STATUS.STATUS_SERVER_ERROR.response,
      });
    }
  }

  static async GetTransaction(req, res) {
    try {
      const { trxId } = req.params;
      const data = await Model.findOne({ _id: trxId });
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
      Tracer("GetTransaction", error.message, error);
      return res.status(500).json({
        STATUS: STATUS.STATUS_SERVER_ERROR.code,
        MESSAGE: STATUS.STATUS_SERVER_ERROR.response,
      });
    }
  }

  static async DeleteTransaction(req, res) {
    try {
      const { trxId } = req.params;
      const data = await Model.findOneAndRemove({ _id: trxId });
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
      Tracer("GetTransaction", error.message, error);
      return res.status(500).json({
        STATUS: STATUS.STATUS_SERVER_ERROR.code,
        MESSAGE: STATUS.STATUS_SERVER_ERROR.response,
      });
    }
  }
}
