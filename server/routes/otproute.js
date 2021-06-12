"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var otpcontroller_1 = require("../controllers/otpcontroller");
var otproute = express_1.default.Router(); //create a router object we use this to serve all our requests
otproute.use(express_1.default.json());
otproute.route("/sendOTP")
    .post(otpcontroller_1.addOtp);
exports.default = otproute;
