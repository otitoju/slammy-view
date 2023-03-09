"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MessageSchema = new _mongoose2.default.Schema({
    sender: { type: String },
    email: { type: String },
    phone: { type: String },
    message: { type: String }
}, {
    timestamps: { type: Boolean, default: true }
});

exports.default = _mongoose2.default.model("messages", MessageSchema);
//# sourceMappingURL=Message.js.map