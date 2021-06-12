import express from "express";
import { addOtp } from "../controllers/otpcontroller";

let otproute = express.Router(); //create a router object we use this to serve all our requests
otproute.use(express.json());

otproute.route("/sendOTP")
.post(addOtp)


export default otproute;