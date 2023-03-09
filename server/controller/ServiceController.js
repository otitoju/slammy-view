import Service from "../services/Service";
import { Tracer } from "../utils/Logger";
import STATUS from "../utils/HttpResponse";
import cloudinary from 'cloudinary';

export default class ServiceController {

  static async CreateService(req, res) {
    try {
      const { title, content, price, currency } = req.body;
      if (!title || !content || !price || !currency) {
        return res.status(400).json({
          STATUS: STATUS.STATUS_BAD_REQUEST.code,
          MESSAGE: STATUS.STATUS_BAD_REQUEST.response,
        });
      } 
      else if (req.file == undefined || req.file == '') {
        return res.status(400).json({
          STATUS: STATUS.STATUS_BAD_REQUEST.code,
          MESSAGE: STATUS.STATUS_BAD_REQUEST.response,
        });
      }
      else {
        var file = req.file.path
        const result = await cloudinary.uploader.upload(file);
        var imgUrl = result.secure_url
        const data = await Service.createService(req.body);
        data.image = imgUrl;
        await data.save()
        return res.status(201).json({
          STATUS: STATUS.STATUS_CREATED.code,
          MESSAGE: STATUS.STATUS_CREATED.response,
          info: data,
        });
      }
    } catch (error) {
      console.log(error);
      Tracer("CreateService", error.message, error);
      return res.status(500).json({
        STATUS: STATUS.STATUS_SERVER_ERROR.code,
        MESSAGE: STATUS.STATUS_SERVER_ERROR.response,
      });
    }
  }

  static async GetServices(_req, res) {
    try {
      const data = await Service.getServices();
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
      Tracer("GetService", error.message, error);
      return res.status(500).json({
        STATUS: STATUS.STATUS_SERVER_ERROR.code,
        MESSAGE: STATUS.STATUS_SERVER_ERROR.response,
      });
    }
  }

  static async GetService(req, res) {
    try {
      const { serviceId } = req.params;
      const data = await Service.getService(serviceId);
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
      Tracer("GetService", error.message, error);
      return res.status(500).json({
        STATUS: STATUS.STATUS_SERVER_ERROR.code,
        MESSAGE: STATUS.STATUS_SERVER_ERROR.response,
      });
    }
  }

  static async DeleteService(req, res) {
    try {
      const { serviceId } = req.params;
      const data = await Service.deleteService(serviceId);
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
      Tracer("DeleteService", error.message, error);
      return res.status(500).json({
        STATUS: STATUS.STATUS_SERVER_ERROR.code,
        MESSAGE: STATUS.STATUS_SERVER_ERROR.response,
      });
    }
  }

  static async UpdateService(req, res) {
    try {
      const { serviceId } = req.params;
      const data = await Service.getService(serviceId);
      if (data) {
        const { title, content, price,  } = req.body;
        
        data.title = title || data.title;
        data.content = content || data.content;
        data.price = price || data.price;

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
      Tracer("UpdateService", error.message, error);
      return res.status(500).json({
        STATUS: STATUS.STATUS_SERVER_ERROR.code,
        MESSAGE: STATUS.STATUS_SERVER_ERROR.response,
      });
    }
  }

  static async UpdateServiceImage(req, res) {
    try {
      const { serviceId } = req.params;
      const data = await Service.getService(serviceId);
      if (data) {
        var file = req.file.path
        const result = await cloudinary.uploader.upload(file);
        var imgUrl = result.secure_url;
        data.image = imgUrl || data.image;

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
      Tracer("UpdateServiceImage", error.message, error);
      return res.status(500).json({
        STATUS: STATUS.STATUS_SERVER_ERROR.code,
        MESSAGE: STATUS.STATUS_SERVER_ERROR.response,
      });
    }
  }
}
