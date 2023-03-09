"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Logger = Logger;
exports.Tracer = Tracer;
//import * as winston from 'winston';

function Logger(Method, Msg) {
    return console.log("Message:: " + " -> " + Method + " -> " + Msg);
};

function Tracer(Method, Msg, Exception) {
    return console.log(" Exception -> " + Method + ": " + Msg, JSON.stringify(Exception));
}
//# sourceMappingURL=Logger.js.map