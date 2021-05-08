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
exports.addFollower = exports.removeFollower = exports.getAll = exports.get = void 0;
var Constants = require('../constants').Constants;
var _a = require("../db"), getDB = _a.getDB, initDB = _a.initDB;
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var ObjectID = require("mongodb").ObjectID;
// TODO move getDB to middle ware
var get = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, username, user, allMovies, genresToHaveReviewedFondly, recommendMovies;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                db = getDB();
                username = req.params.username;
                return [4 /*yield*/, db.collection("users").findOne({ username: username })];
            case 1:
                user = _a.sent();
                if (!user)
                    throw { code: Constants.httpStatus.BAD_REQUEST, message: "Failed to get username" };
                delete user.password;
                return [4 /*yield*/, db.collection("movies").find().toArray()];
            case 2:
                allMovies = _a.sent();
                genresToHaveReviewedFondly = [];
                allMovies.map(function (ele) {
                    ele.reviews.map(function (eleReview) {
                        if (eleReview.user == username && eleReview.rating >= 4) {
                            genresToHaveReviewedFondly.push(ele.genre);
                        }
                    });
                });
                recommendMovies = [];
                // This goes through all movies. If it's rated above 4 stars I will recommend it or if the person has reviewed another movie in the same genre well.
                // NOTE: Recommending ever movie with a good rating won't scale well, it could however be movies that have come out recently and have a good rating.
                allMovies.map(function (movieEle) {
                    if (movieEle.avgRating >= 4 || genresToHaveReviewedFondly.find(function (ele) { return movieEle.genre == ele; })) {
                        recommendMovies.push(movieEle);
                        return;
                    }
                });
                user.recommendMovies = recommendMovies;
                res.status(Constants.httpStatus.OKAY).json({
                    data: {
                        user: user
                    }
                });
                return [2 /*return*/];
        }
    });
}); };
exports.get = get;
var getAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                db = getDB();
                return [4 /*yield*/, db.collection("users").find().toArray()];
            case 1:
                users = _a.sent();
                users = users.map(function (ele) {
                    delete ele['password']; // don't want to send peoples passwords even if they are hashed
                    return ele;
                });
                res.status(Constants.httpStatus.OKAY).json({
                    data: {
                        users: users
                    }
                });
                return [2 /*return*/];
        }
    });
}); };
exports.getAll = getAll;
var removeFollower = function (req, res, userUsername) { return __awaiter(void 0, void 0, void 0, function () {
    var db, name, user, newFollowing;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                db = getDB();
                name = req.params.name;
                return [4 /*yield*/, db.collection("cast").findOne({ name: name })];
            case 1:
                if (!(_a.sent()))
                    throw { message: "Can't find cast with given name.", code: Constants.httpStatus.BAD_REQUEST };
                return [4 /*yield*/, db.collection("users").findOne({ username: userUsername })];
            case 2:
                user = _a.sent();
                newFollowing = user.following.filter(function (ele) { return !(ele == name); });
                return [4 /*yield*/, db.collection("users").updateOne({ username: userUsername }, { $set: { following: newFollowing } })];
            case 3:
                _a.sent();
                res.status(Constants.httpStatus.OKAY).json({
                    data: {
                        result: "good"
                    }
                });
                return [2 /*return*/];
        }
    });
}); };
exports.removeFollower = removeFollower;
var addFollower = function (req, res, userUsername) { return __awaiter(void 0, void 0, void 0, function () {
    var db, name, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                db = getDB();
                name = req.params.name;
                console.log(name);
                return [4 /*yield*/, db.collection("cast").findOne({ name: name })];
            case 1:
                if (!(_a.sent()))
                    throw { message: "Can't find cast with given name.", code: Constants.httpStatus.BAD_REQUEST };
                return [4 /*yield*/, db.collection("users").findOne({ username: userUsername })];
            case 2:
                user = _a.sent();
                if (user.following.find(function (ele) { return ele == name; }))
                    throw { message: "Already following person", code: Constants.httpStatus.BAD_REQUEST };
                return [4 /*yield*/, db.collection("users").updateOne({ username: userUsername }, { $push: { following: { $each: [name] } } })];
            case 3:
                _a.sent();
                res.status(Constants.httpStatus.OKAY).json({
                    data: {
                        result: "good"
                    }
                });
                return [2 /*return*/];
        }
    });
}); };
exports.addFollower = addFollower;
