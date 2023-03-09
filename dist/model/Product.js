"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProductSchema = new _mongoose2.default.Schema({
    productName: { type: String },
    image: { type: String },
    description: { type: String },
    actualPrice: { type: Number, default: 0 },
    discountPrice: { type: Number, default: 0 },
    currency: { type: String, default: "USD" },
    downloadLink: { type: String },
    downloadLink1: { type: String },
    downloadLink2: { type: String },
    downloadLink3: { type: String }
}, {
    timestamps: { type: Boolean, default: true }
});

exports.default = _mongoose2.default.model("products", ProductSchema);
//# sourceMappingURL=Product.js.map