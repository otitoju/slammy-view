import RequestedServices from "../model/RequestedServices";
import { Tracer } from "../utils/Logger";
import STATUS from "../utils/HttpResponse";
import cloudinary from 'cloudinary';

export default class RequestedServiceController {
  static async NewRequest(req, res) {
    try {
      const { fname, lname, phone, email, qty, service } = req.body;
      if (!fname || !lname || !phone || !email || !qty || !service) {
        return res.status(400).json({
          STATUS: STATUS.STATUS_BAD_REQUEST.code,
          MESSAGE: STATUS.STATUS_BAD_REQUEST.response,
        });
      }
      else {
        const info = await RequestedServices.create(req.body);
        return res.status(201).json({
            STATUS: STATUS.STATUS_CREATED.code,
            MESSAGE: STATUS.STATUS_CREATED.response,
            info: info,
          });
      }
    } catch (error) {
      Tracer("New Request", error.message, error);
      return res.status(500).json({
        STATUS: STATUS.STATUS_SERVER_ERROR.code,
        MESSAGE: STATUS.STATUS_SERVER_ERROR.response,
      });
    }
  }

  static async AllRequests(req, res) {
    try {
        const data = await RequestedServices.find({}).sort({ _id: -1 });
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
        Tracer("Requests", error.message, error);
      return res.status(500).json({
        STATUS: STATUS.STATUS_SERVER_ERROR.code,
        MESSAGE: STATUS.STATUS_SERVER_ERROR.response,
      });
    }
  }

  static async GetRequest(req, res) {
    try {
      const { requestId } = req.params;
      const data = await RequestedServices.findOne({ _id: requestId });
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
      Tracer("Get Request", error.message, error);
      return res.status(500).json({
        STATUS: STATUS.STATUS_SERVER_ERROR.code,
        MESSAGE: STATUS.STATUS_SERVER_ERROR.response,
      });
    }
  }

  static async DeleteRequest(req, res) {
    try {
      const { requestId } = req.params;
      const data = await RequestedServices.findOneAndRemove({ _id: requestId });
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
      Tracer("Delete Request", error.message, error);
      return res.status(500).json({
        STATUS: STATUS.STATUS_SERVER_ERROR.code,
        MESSAGE: STATUS.STATUS_SERVER_ERROR.response,
      });
    }
  }

  static async UpdateRequest(req, res) {
    try {
      const { requestId } = req.params;
      const data = await RequestedServices.findOne({ _id: requestId });
      if (data) {
        const { status } = req.body;

        data.status = status || data.status;
        
        await data.save();
        return res.status(200).json({
            STATUS: STATUS.STATUS_OK.code,
            MESSAGE: STATUS.STATUS_OK.response,
        });
      }
      else {
        return res.status(404).json({
            STATUS: STATUS.STATUS_NOTFOUND.code,
            MESSAGE: STATUS.STATUS_NOTFOUND.response,
          });
      }
    } catch (error) {
      Tracer("Update Service", error.message, error);
      return res.status(500).json({
        STATUS: STATUS.STATUS_SERVER_ERROR.code,
        MESSAGE: STATUS.STATUS_SERVER_ERROR.response,
      });
    }
  }


}
