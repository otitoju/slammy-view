"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServiceSchema = new _mongoose2.default.Schema({
    title: { type: String },
    price: { type: Number },
    content: { type: String },
    image: { type: String },
    currency: { type: String, default: "USD" }
}, {
    timestamps: { type: Boolean, default: true }
});

exports.default = _mongoose2.default.model("services", ServiceSchema);
//# sourceMappingURL=Service.js.map