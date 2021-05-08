"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.update = exports.create = exports.getAll = exports.getOne = void 0;
var Constants = require('../constants').Constants;
var getDB = require("../db").getDB;
var ObjectID = require("mongodb").ObjectID;
var collectionName = "cast";
var getOne = function (req, res, username) { return __awaiter(void 0, void 0, void 0, function () {
    var db, id, following, cast, movies, user, peopleCastHasWorkedWith, frequentCalibrators, frequentCalibratorsFullData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, console.log("GET ONE")];
            case 1:
                _a.sent();
                db = getDB();
                id = req.params.id;
                following = false;
                return [4 /*yield*/, db.collection(collectionName).findOne({ _id: new ObjectID(id) })];
            case 2:
                cast = _a.sent();
                return [4 /*yield*/, db.collection("movies").find({ cast: { $in: [cast.name] } }).toArray()];
            case 3:
                movies = _a.sent();
                if (!username) return [3 /*break*/, 5];
                return [4 /*yield*/, db.collection("users").findOne({ username: username })];
            case 4:
                user = _a.sent();
                following = !!(user.following.find(function (ele) { return ele == cast.name; }));
                _a.label = 5;
            case 5:
                peopleCastHasWorkedWith = [];
                frequentCalibrators = [];
                console.log(movies);
                movies.map(function (ele) {
                    ele.cast.map(function (castEle) {
                        if (cast.name == castEle)
                            return;
                        console.log(peopleCastHasWorkedWith);
                        if (peopleCastHasWorkedWith.find(function (ele) { return ele == castEle; })) {
                            frequentCalibrators.push(castEle);
                            return;
                        }
                        peopleCastHasWorkedWith.push(castEle);
                    });
                });
                return [4 /*yield*/, db.collection("cast").find({ name: { $in: frequentCalibrators } }).toArray()];
            case 6:
                frequentCalibratorsFullData = _a.sent();
                res.status(Constants.httpStatus.OKAY).json(__assign(__assign({}, cast), { movies: movies, following: following, frequentCalibrators: frequentCalibratorsFullData }));
                return [2 /*return*/];
        }
    });
}); };
exports.getOne = getOne;
var getAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, casts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                db = getDB();
                return [4 /*yield*/, db.collection(collectionName).find().toArray()];
            case 1:
                casts = _a.sent();
                res.status(Constants.httpStatus.OKAY).json({ data: casts });
                return [2 /*return*/];
        }
    });
}); };
exports.getAll = getAll;
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, _a, name, birthdate, type;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log("create cast");
                db = getDB();
                _a = req.body, name = _a.name, birthdate = _a.birthdate, type = _a.type;
                console.log(req.body);
                return [4 /*yield*/, db.collection(collectionName).findOne({ name: name })];
            case 1:
                if (_b.sent())
                    throw { code: Constants.httpStatus.BAD_REQUEST, message: "Individual already exists." };
                console.log("here");
                if (!checkCastData(req.body))
                    throw { code: Constants.httpStatus.BAD_REQUEST, message: "Invalid data." };
                return [4 /*yield*/, db.collection(collectionName).insertOne({
                        name: name,
                        birthdate: birthdate,
                        type: type
                    })];
            case 2:
                _b.sent();
                res.status(Constants.httpStatus.OKAY).json({ message: "Movie Created :)" });
                return [2 /*return*/];
        }
    });
}); };
exports.create = create;
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, _a, name, birthdate, type;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                db = getDB();
                _a = req.body, name = _a.name, birthdate = _a.birthdate, type = _a.type;
                return [4 /*yield*/, db.collection(collectionName).findOne({ name: name, })];
            case 1:
                if (!(_b.sent()))
                    throw { code: Constants.httpStatus.BAD_REQUEST, message: "Individual does not exist." };
                if (!checkCastData(req.body))
                    throw { code: Constants.httpStatus.BAD_REQUEST, message: "Invalid data." };
                return [4 /*yield*/, db.collection(collectionName).updateOne({ name: name }, {
                        $set: {
                            birthdate: birthdate,
                            type: type
                        }
                    })];
            case 2:
                _b.sent();
                res.status(Constants.httpStatus.OKAY).json({ message: "cast edited Created :)" });
                return [2 /*return*/];
        }
    });
}); };
exports.update = update;
var checkCastData = function (_a) {
    var name = _a.name, birthdate = _a.birthdate, type = _a.type;
    try {
        if (!name || !birthdate || !type)
            throw "";
        return true;
    }
    catch (err) {
        return false;
    }
};
