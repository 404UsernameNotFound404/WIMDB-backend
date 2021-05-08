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
exports.seedActors = void 0;
var _a = require("../../db"), getDB = _a.getDB, initDB = _a.initDB;
var seedData = require('../../seedScripts/seedScript').seedData;
var ObjectID = require("mongodb").ObjectID;
var collectionName = "cast";
var seedActors = function (movies) { return __awaiter(void 0, void 0, void 0, function () {
    var db, createdActors, _a, _b, _c, _d, y;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0: return [4 /*yield*/, initDB()];
            case 1:
                _e.sent();
                db = getDB();
                createdActors = [];
                _b = (_a = createdActors).push;
                return [4 /*yield*/, seedData(collectionName, {
                        name: "Archibald LastName",
                        type: "actor",
                        birthdate: "2020-01-02"
                    })];
            case 2:
                _b.apply(_a, [_e.sent()]);
                _d = (_c = createdActors).push;
                return [4 /*yield*/, seedData(collectionName, {
                        name: "Henri LastName",
                        type: "actor",
                        birthdate: "2020-09-02"
                    })];
            case 3:
                _d.apply(_c, [_e.sent()]);
                y = 0;
                _e.label = 4;
            case 4:
                if (!(y < movies.length)) return [3 /*break*/, 7];
                // this should be done better
                return [4 /*yield*/, db.collection("movies").updateOne({ _id: new ObjectID(movies[y]) }, { $push: { cast: { $each: ["Archibald LastName", "Henri LastName"] } } })];
            case 5:
                // this should be done better
                _e.sent();
                _e.label = 6;
            case 6:
                y++;
                return [3 /*break*/, 4];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.seedActors = seedActors;
