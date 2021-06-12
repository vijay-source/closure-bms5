"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const mongoose1 = require('mongoose');
var mongoose_1 = __importDefault(require("mongoose"));
// const Schema= mongoose.Schema;
var UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    register_date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true }); //passing a constructor here
var User = mongoose_1.default.model('user', UserSchema);
module.exports = User;
