"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TransactionSchema = new _mongoose2.default.Schema({
    product: { type: String, lowercase: true },
    amount: { type: String },
    currency: { type: String },
    email: { type: String, lowercase: true },
    status: { type: String },
    reference: { type: String },
    message: { type: String },
    transactionId: { type: String },
    channel: { type: String },
    gateway: { type: String },
    fullname: { type: String },
    phone: { type: String }
}, {
    timestamps: { type: Boolean, default: true }
});

exports.default = _mongoose2.default.model("transaction", TransactionSchema);
//# sourceMappingURL=Transaction.js.map