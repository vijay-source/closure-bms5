import express from "express";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });


let route = express.Router(); //create a router object we use this to serve all our requests
route.use(express.json());
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);


export const addOtp =async(req: any, res: any) => {

     const phone:any = req.body.phonenumber;
        const OTP = Math.floor(100000 + Math.random() * 900000);
        const time = 2 * 60 * 1000;
        const expiry = Date.now() + time;
        // const data = `${phone}.${OTP}.${expiry}`;
      
        client.messages
          .create({
            body: `Your OTP for successful login at Book Management System ${OTP}`,
            from: "+19724356208",
            to: phone,
          })
          .then((message: any) => console.log(message.sid, "......"))
          .catch((error: any) => console.error(error));
           res.status(200).send({ phone, OTP });
      };

   