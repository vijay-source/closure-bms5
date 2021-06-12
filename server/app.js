"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors")); // use this in order to send req multiple servers
var bookroutes_1 = __importDefault(require("./routes/bookroutes"));
var userroutes_1 = __importDefault(require("./routes/userroutes"));
var otproute_1 = __importDefault(require("../server/routes/otproute"));
var accountSid = process.env.TWILIO_ACCOUNT_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN;
var client = require("twilio")(accountSid, authToken);
var mongoose = require("mongoose");
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function () {
        var connstr;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    connstr = "mongodb+srv://" + process.env.db_user + ":" + process.env.db_password + "@cluster0.s3eeb.mongodb.net/" + process.env.db_name + "?retryWrites=true&w=majority";
                    console.log("initializing DATABASE connection...");
                    return [4 /*yield*/, mongoose.connect(connstr, {
                            useNewUrlParser: true,
                            useUnifiedTopology: true,
                        })];
                case 1:
                    _a.sent();
                    console.log("Connected to DATABASE");
                    return [2 /*return*/];
            }
        });
    });
}
var startServer = function () { return __awaiter(void 0, void 0, void 0, function () {
    var app;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, connectToDatabase()];
            case 1:
                _a.sent();
                app = express_1.default();
                app.use(cors_1.default());
                app.use(express_1.default.json());
                app.listen(process.env.PORT, function () {
                    console.log("port running successfully on", process.env.PORT);
                });
                app.use("/", bookroutes_1.default); // server should serve user routes
                app.use("/", userroutes_1.default);
                app.use("/", otproute_1.default);
                return [2 /*return*/];
        }
    });
}); };
startServer()
    .then(function () {
    console.log("server started on port " + process.env.PORT);
})
    .catch(function (error) {
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
