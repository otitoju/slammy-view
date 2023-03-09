import ProductService from "../services/ProductService";
import { Tracer } from "../utils/Logger";
import STATUS from "../utils/HttpResponse";
import cloudinary from 'cloudinary';

export default class ProductController {
  static async CreateProduct(req, res) {
    try {
      const { productName, description, actualPrice } = req.body;
      if (!productName || !description || !actualPrice) {
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
        const data = await ProductService.createProduct(req.body);
        data.image = imgUrl;
        await data.save()
        return res.status(201).json({
          STATUS: STATUS.STATUS_CREATED.code,
          MESSAGE: STATUS.STATUS_CREATED.response,
          info: data,
        });
      }
    } catch (error) {
      Tracer("CreateProduct", error.message, error);
      return res.status(500).json({
        STATUS: STATUS.STATUS_SERVER_ERROR.code,
        MESSAGE: STATUS.STATUS_SERVER_ERROR.response,
      });
    }
  }

  static async GetProducts(_req, res) {
    try {
      const data = await ProductService.getProducts();
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
      Tracer("GetProducts", error.message, error);
      return res.status(500).json({
        STATUS: STATUS.STATUS_SERVER_ERROR.code,
        MESSAGE: STATUS.STATUS_SERVER_ERROR.response,
      });
    }
  }

  static async GetProduct(req, res) {
    try {
      const { productId } = req.params;
      const data = await ProductService.getProduct(productId);
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
      Tracer("GetProduct", error.message, error);
      return res.status(500).json({
        STATUS: STATUS.STATUS_SERVER_ERROR.code,
        MESSAGE: STATUS.STATUS_SERVER_ERROR.response,
      });
    }
  }

  static async DeleteProduct(req, res) {
    try {
      const { productId } = req.params;
      const data = await ProductService.deleteProduct(productId);
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
      Tracer("DeleteProduct", error.message, error);
      return res.status(500).json({
        STATUS: STATUS.STATUS_SERVER_ERROR.code,
        MESSAGE: STATUS.STATUS_SERVER_ERROR.response,
      });
    }
  }

  static async UpdateProduct(req, res) {
    try {
      const { productId } = req.params;
      const data = await ProductService.getProduct(productId);
      if (data) {
        const { productName, description, actualPrice, discountPrice, downloadLink, downloadLink1, downloadLink2, downloadLink3 } = req.body;
        // var file = req.file.path
        // const result = await cloudinary.uploader.upload(file);
        // var imgUrl = result.secure_url;

        data.productName = productName || data.productName;
        data.description = description || data.description;
        data.actualPrice = actualPrice || data.actualPrice;
        data.discountPrice = discountPrice || data.discountPrice;
        data.downloadLink = downloadLink || data.downloadLink;
        data.downloadLink1 = downloadLink1 || data.downloadLink1;
        data.downloadLink2 = downloadLink2 || data.downloadLink2;
        data.downloadLink3 = downloadLink3 || data.downloadLink3;
        //data.image = imgUrl || data.image;
        
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
      Tracer("UpdateProduct", error.message, error);
      return res.status(500).json({
        STATUS: STATUS.STATUS_SERVER_ERROR.code,
        MESSAGE: STATUS.STATUS_SERVER_ERROR.response,
      });
    }
  }

  static async UpdateProductImage(req, res) {
    try {
      const { productId } = req.params;
      const data = await ProductService.getProduct(productId);
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
      Tracer("UpdateProductImage", error.message, error);
      return res.status(500).json({
        STATUS: STATUS.STATUS_SERVER_ERROR.code,
        MESSAGE: STATUS.STATUS_SERVER_ERROR.response,
      });
    }
  }
}
