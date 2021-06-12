import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors"; // use this in order to send req multiple servers
import bookroute from "./routes/bookroutes";
import userroute from "./routes/userroutes";
import otproute from "../server/routes/otproute";
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const mongoose = require("mongoose");

async function connectToDatabase() {
  const connstr = `mongodb+srv://${process.env.db_user}:${process.env.db_password}@cluster0.s3eeb.mongodb.net/${process.env.db_name}?retryWrites=true&w=majority`;
  console.log("initializing DATABASE connection...");

  await mongoose.connect(connstr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to DATABASE");
}

const startServer = async () => {
  await connectToDatabase();
  const app = express();
  app.use(cors());
  app.use(express.json());

  app.listen(process.env.PORT, () => {
    console.log("port running successfully on", process.env.PORT);
  });

  app.use("/", bookroute); // server should serve user routes
  app.use("/", userroute);
  app.use("/", otproute);
};

startServer()
  .then(() => {
    console.log("server started on port " + process.env.PORT);
  })
  .catch((error: any) => {
    console.log("error on starting server : ", error.message);
  });

//OTP generation
//     app.post("/sendOTP", (req: any, res: any) => {
//     const phone:any = req.body.phonenumber;
//     const OTP = Math.floor(100000 + Math.random() * 900000);
//     const time = 2 * 60 * 1000;
//     const expiry = Date.now() + time;
//     // const data = `${phone}.${OTP}.${expiry}`;

//     client.messages
//       .create({
//         body: `Your OTP for successful login at Book Management System ${OTP}`,
//         from: "+19724356208",
//         to: phone,
//       })
//       .then((message: any) => console.log(message.sid, "......"))
//       .catch((error: any) => console.error(error));
//        res.status(200).send({ phone, OTP });
//   });

//  //  to parse request object
//  app.use('/',bookroute)      // server should serve user routes
//  app.use('/',userroute)

// function middleWre(req:any,res:any,next:any){
// console.log("my middleware")
// next()
// }
// app.use(middleWre)
