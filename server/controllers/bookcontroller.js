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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAuthors = exports.searchByPrice = exports.searchByRating = exports.searchByTitle = exports.searchByAuthor = exports.deleteBook = exports.getBookById = exports.addNewBook = exports.getAllBooks = void 0;
var Book = require("../models/book");
var getAllBooks = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var books, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Book.find()];
            case 1:
                books = _a.sent();
                if (books)
                    res.status(200).send(books);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.status(400).send("ERROR", err_1.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllBooks = getAllBooks;
var addNewBook = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var book, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, new Book(req.body)];
            case 1:
                book = _a.sent();
                // console.log("bookpost", book);
                // book.save();
                Book.create(book);
                res.status(200).send(book);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.status(400).send("ERROR", err_2.message);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.addNewBook = addNewBook;
var getBookById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, book, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, Book.findById(id)];
            case 1:
                book = _a.sent();
                res.status(200).send(book);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                res.status(400).send("Question Not Found");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getBookById = getBookById;
var deleteBook = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, deletebook, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                id = req.params.id;
                return [4 /*yield*/, Book.deleteOne({ _id: id })];
            case 1:
                deletebook = _a.sent();
                res.status(200).send({ message: "book was deleted" });
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                res.status(400).send("Question Not Found");
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteBook = deleteBook;
// searchBYAuthor
var searchByAuthor = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var author, books, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                author = new RegExp(req.params.author, "i");
                return [4 /*yield*/, Book.find({ author: author })];
            case 1:
                books = _a.sent();
                // console.log("searched books",books)
                // console.log(books);
                res.send(books);
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                console.log(e_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.searchByAuthor = searchByAuthor;
// searchByTitle
var searchByTitle = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var title, books, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("harry");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                title = new RegExp(req.params.title, "i");
                return [4 /*yield*/, Book.find({ title: title })];
            case 2:
                books = _a.sent();
                // console.log(books);
                res.send(books);
                return [3 /*break*/, 4];
            case 3:
                e_2 = _a.sent();
                console.log(e_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.searchByTitle = searchByTitle;
// searchByRating
var searchByRating = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var books, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Book.find({ rating: { $gte: req.params.rating } })];
            case 1:
                books = _a.sent();
                // console.log(JSON.stringify(books));
                res.send(books);
                return [3 /*break*/, 3];
            case 2:
                e_3 = _a.sent();
                console.log(e_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.searchByRating = searchByRating;
// searchBYprice
var searchByPrice = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var books, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Book.find({
                        $and: [
                            { cost: { $gte: req.params.min } },
                            { cost: { $lte: req.params.max } },
                        ],
                    })];
            case 1:
                books = _a.sent();
                // console.log(JSON.stringify(books));
                res.send(books);
                return [3 /*break*/, 3];
            case 2:
                e_4 = _a.sent();
                console.log(e_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.searchByPrice = searchByPrice;
var getAllAuthors = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var books, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("getallauthorslevel");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Book.distinct('author')];
            case 2:
                books = _a.sent();
                res.status(200).send(books);
                console.log("my authors list", books);
                return [3 /*break*/, 4];
            case 3:
                err_5 = _a.sent();
                res.send(400).send("something went wrong");
                console.log(err_5, "error");
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getAllAuthors = getAllAuthors;
