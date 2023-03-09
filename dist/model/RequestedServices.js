"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RequestedServiceSchema = new _mongoose2.default.Schema({
    fname: { type: String },
    lname: { type: String },
    qty: { type: Number },
    phone: { type: String },
    email: { type: String },
    price: { type: Number },
    service: { type: String },
    url: { type: String },
    instruction: { type: String },
    image: { type: String },
    currency: { type: String, default: "USD" },
    status: { type: String, default: "sent" },
    delivery: { type: String, default: "free" },
    location: { type: String },
    filePath: { type: String }
}, {
    timestamps: { type: Boolean, default: true }
});

exports.default = _mongoose2.default.model("requestedservices", RequestedServiceSchema);
//# sourceMappingURL=RequestedServices.js.map