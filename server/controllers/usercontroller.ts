import express from "express";
const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/.env" });

let route = express.Router(); //create a router object we use this to serve all our requests
route.use(express.json());

export const registration = async (req: any, res: any) => {
  let { name, email, password } = req.body;
  console.log("recieved data for registration");
  // validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "please enter all fields" });
  }
  let newUser: any;
  User.findOne({ email }).then((user: any) => {
    if (user) {
      // console.log(user);
      return res.status(400).json({ msg: "user already exists" });
    }
    newUser = new User({
      name,
      email,
      password,
    });
    //create salt and hash
    // console.log(newUser);
    bcrypt.genSalt(10, (err: any, salt: any) => {
      bcrypt.hash(newUser.password, salt, (err: any, hash: any) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user: any) => {
          // console.log("sending user resposne",user)
          res.send(user);
        });
      });
    });
  });
};


export const login = async (req: any, res: any) => {
  const { email, password } = req.body;
  console.log("user email", email);
  console.log("user password", password);

  if (!email || !password) {
    return res.status(400).json({ msg: "credential missing" });
  }
  User.findOne({ email }).then((user: any) => {
    if (!user) return res.status(400).json({ msg: "user doesnot exists" });
    //validate password
    bcrypt.compare(password, user.password).then((isMatch: any) => {
      if (!isMatch)
       return res.status(400).json({ msg: "invalid credentials" });
      jwt.sign( { id: user._id }, `${process.env.jwtSecret}`,{ expiresIn: 10000 },
        (err: any, token: any) => {
          if (err) throw err;
          console.log("level token", token);
          res.json({ token: token });
        }
      );
    });
  });
};


export async function auth(req: any, res: any, next: Function) {
 
  try{
    if(req.headers && req.headers.authorization )
    {
      console.log("auth");
      const authHeader = await req.headers.authorization;
      console.log("header", req.headers);
      const token = authHeader
      console.log(token);
      if (!token) return res.status(401).json({ msg: "no token supplied" });
      await jwt.verify(token, `${process.env.jwtSecret}`, (err: any, user: any) => {
        if (err) return res.status(403).send("something went wrong");
        req.user = user;
        next();
      });
    } 
  }
  
catch(err:any){
  res.status(400).send("something went wrong")
console.log("error something went wrong")
}
}
