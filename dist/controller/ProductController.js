"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ProductService = require("../services/ProductService");

var _ProductService2 = _interopRequireDefault(_ProductService);

var _Logger = require("../utils/Logger");

var _HttpResponse = require("../utils/HttpResponse");

var _HttpResponse2 = _interopRequireDefault(_HttpResponse);

var _cloudinary = require("cloudinary");

var _cloudinary2 = _interopRequireDefault(_cloudinary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProductController = function () {
  function ProductController() {
    _classCallCheck(this, ProductController);
  }

  _createClass(ProductController, null, [{
    key: "CreateProduct",
    value: async function CreateProduct(req, res) {
      try {
        var _req$body = req.body,
            productName = _req$body.productName,
            description = _req$body.description,
            actualPrice = _req$body.actualPrice;

        if (!productName || !description || !actualPrice) {
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
          var data = await _ProductService2.default.createProduct(req.body);
          data.image = imgUrl;
          await data.save();
          return res.status(201).json({
            STATUS: _HttpResponse2.default.STATUS_CREATED.code,
            MESSAGE: _HttpResponse2.default.STATUS_CREATED.response,
            info: data
          });
        }
      } catch (error) {
        (0, _Logger.Tracer)("CreateProduct", error.message, error);
        return res.status(500).json({
          STATUS: _HttpResponse2.default.STATUS_SERVER_ERROR.code,
          MESSAGE: _HttpResponse2.default.STATUS_SERVER_ERROR.response
        });
      }
    }
  }, {
    key: "GetProducts",
    value: async function GetProducts(_req, res) {
      try {
        var data = await _ProductService2.default.getProducts();
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
        (0, _Logger.Tracer)("GetProducts", error.message, error);
        return res.status(500).json({
          STATUS: _HttpResponse2.default.STATUS_SERVER_ERROR.code,
          MESSAGE: _HttpResponse2.default.STATUS_SERVER_ERROR.response
        });
      }
    }
  }, {
    key: "GetProduct",
    value: async function GetProduct(req, res) {
      try {
        var productId = req.params.productId;

        var data = await _ProductService2.default.getProduct(productId);
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
        (0, _Logger.Tracer)("GetProduct", error.message, error);
        return res.status(500).json({
          STATUS: _HttpResponse2.default.STATUS_SERVER_ERROR.code,
          MESSAGE: _HttpResponse2.default.STATUS_SERVER_ERROR.response
        });
      }
    }
  }, {
    key: "DeleteProduct",
    value: async function DeleteProduct(req, res) {
      try {
        var productId = req.params.productId;

        var data = await _ProductService2.default.deleteProduct(productId);
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
        (0, _Logger.Tracer)("DeleteProduct", error.message, error);
        return res.status(500).json({
          STATUS: _HttpResponse2.default.STATUS_SERVER_ERROR.code,
          MESSAGE: _HttpResponse2.default.STATUS_SERVER_ERROR.response
        });
      }
    }
  }, {
    key: "UpdateProduct",
    value: async function UpdateProduct(req, res) {
      try {
        var productId = req.params.productId;

        var data = await _ProductService2.default.getProduct(productId);
        if (data) {
          var _req$body2 = req.body,
              productName = _req$body2.productName,
              description = _req$body2.description,
              actualPrice = _req$body2.actualPrice,
              discountPrice = _req$body2.discountPrice,
              downloadLink = _req$body2.downloadLink,
              downloadLink1 = _req$body2.downloadLink1,
              downloadLink2 = _req$body2.downloadLink2,
              downloadLink3 = _req$body2.downloadLink3;
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
        (0, _Logger.Tracer)("UpdateProduct", error.message, error);
        return res.status(500).json({
          STATUS: _HttpResponse2.default.STATUS_SERVER_ERROR.code,
          MESSAGE: _HttpResponse2.default.STATUS_SERVER_ERROR.response
        });
      }
    }
  }, {
    key: "UpdateProductImage",
    value: async function UpdateProductImage(req, res) {
      try {
        var productId = req.params.productId;

        var data = await _ProductService2.default.getProduct(productId);
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
        (0, _Logger.Tracer)("UpdateProductImage", error.message, error);
        return res.status(500).json({
          STATUS: _HttpResponse2.default.STATUS_SERVER_ERROR.code,
          MESSAGE: _HttpResponse2.default.STATUS_SERVER_ERROR.response
        });
      }
    }
  }]);

  return ProductController;
}();

exports.default = ProductController;
//# sourceMappingURL=ProductController.js.map