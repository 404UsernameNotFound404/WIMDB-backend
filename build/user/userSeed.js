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
exports.seedUsers = void 0;
var bcrypt = require('bcrypt');
var seedData = require('../seedScripts/seedScript').seedData;
var seedUsers = function () { return __awaiter(void 0, void 0, void 0, function () {
    var users, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    var _l, _m, _o;
    return __generator(this, function (_p) {
        switch (_p.label) {
            case 0:
                users = [];
                _b = (_a = users).push;
                _c = seedData;
                _d = ["users"];
                _l = {
                    username: "404UsernameNotFound404"
                };
                return [4 /*yield*/, bcrypt.hash("password", 10)];
            case 1: return [4 /*yield*/, _c.apply(void 0, _d.concat([(_l.password = _p.sent(),
                        _l.following = [],
                        _l.views = [],
                        _l), true]))];
            case 2:
                _b.apply(_a, [_p.sent()]);
                _f = (_e = users).push;
                _g = seedData;
                _h = ["users"];
                _m = {
                    username: "user"
                };
                return [4 /*yield*/, bcrypt.hash("password", 10)];
            case 3: return [4 /*yield*/, _g.apply(void 0, _h.concat([(_m.password = _p.sent(),
                        _m.following = [],
                        _m.views = [],
                        _m)]))];
            case 4:
                _f.apply(_e, [_p.sent()]);
                _j = seedData;
                _k = ["users"];
                _o = {
                    username: "admin"
                };
                return [4 /*yield*/, bcrypt.hash("password", 10)];
            case 5: return [4 /*yield*/, _j.apply(void 0, _k.concat([(_o.password = _p.sent(),
                        _o.following = [],
                        _o.views = [],
                        _o)]))];
            case 6:
                _p.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.seedUsers = seedUsers;
