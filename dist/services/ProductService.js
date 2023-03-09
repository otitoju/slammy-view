"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Logger = require("../utils/Logger");

var _Product = require("../model/Product");

var _Product2 = _interopRequireDefault(_Product);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProductService = function () {
    function ProductService() {
        _classCallCheck(this, ProductService);
    }

    _createClass(ProductService, null, [{
        key: "getProducts",
        value: async function getProducts() {
            try {
                return await _Product2.default.find({}).sort({ " _id": -1 });
            } catch (error) {
                (0, _Logger.Tracer)("Get Products", error.message, error);
            }
        }
    }, {
        key: "getProduct",
        value: async function getProduct(productId) {
            try {
                return await _Product2.default.findOne({ _id: productId });
            } catch (error) {
                (0, _Logger.Tracer)("Get Product", error.message, error);
            }
        }
    }, {
        key: "deleteProduct",
        value: async function deleteProduct(productId) {
            try {
                return await _Product2.default.findOneAndRemove({ _id: productId });
            } catch (error) {
                (0, _Logger.Tracer)("Delete Product", error.message, error);
            }
        }
    }, {
        key: "createProduct",
        value: async function createProduct(payload) {
            try {
                return await _Product2.default.create(payload);
            } catch (error) {
                (0, _Logger.Tracer)("Delete Product", error.message, error);
            }
        }
    }]);

    return ProductService;
}();

exports.default = ProductService;
//# sourceMappingURL=ProductService.js.map