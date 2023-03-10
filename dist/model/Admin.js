"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AdminSchema = new _mongoose2.default.Schema({
    username: { type: String, lowercase: true },
    image: { type: String },
    password: { type: String },
    email: { type: String, lowercase: true }
});

exports.default = _mongoose2.default.model("admins", AdminSchema);
//# sourceMappingURL=Admin.js.map