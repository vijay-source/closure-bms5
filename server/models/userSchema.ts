// const mongoose1 = require('mongoose');
import mongoose1 from "mongoose";
// const Schema= mongoose.Schema;

const UserSchema= new mongoose1.Schema({
    name:{
        type: String,
        required : true
    },
    email:{
        type: String,
        required : true,
        
    },
    password:{
        type: String,
        required : true
    },

    register_date:{
        type:Date,
        default:Date.now
    }
},{timestamps:true});//passing a constructor here


const User= mongoose1.model('user',UserSchema);
module.exports=User;