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
exports.createReview = exports.update = exports.create = exports.getAll = exports.getOne = void 0;
var Constants = require('../constants').Constants;
var getDB = require("../db").getDB;
var ObjectID = require("mongodb").ObjectID;
var collectionName = "movies";
exports.getOne = function (req, res, username) { return __awaiter(void 0, void 0, void 0, function () {
    var db, id, movie, cast, similarMovies, allMovies;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                db = getDB();
                id = req.params.id;
                return [4 /*yield*/, db.collection(collectionName).findOne({ _id: new ObjectID(id) })
                    // turn array of cast members names into cast objects with all cast info
                ];
            case 1:
                movie = _a.sent();
                return [4 /*yield*/, db.collection("cast").find({ name: { $in: movie.cast.map(function (ele) { return ele; }) } }).toArray()];
            case 2:
                cast = _a.sent();
                movie.cast = cast;
                similarMovies = [];
                return [4 /*yield*/, db.collection("movies").find().toArray()];
            case 3:
                allMovies = _a.sent();
                allMovies.map(function (ele) {
                    if (ele.genre == movie.genre) {
                        similarMovies.push(ele);
                        return;
                    }
                    var foundCastInBothMovies = false;
                    movie.cast.map(function (movieCastEle) {
                        if (ele.cast.find(function (castEle) { return movieCastEle.name == castEle.name; })) {
                            foundCastInBothMovies = true;
                        }
                    });
                    if (foundCastInBothMovies) {
                        similarMovies.push(ele);
                    }
                });
                movie.similarMovies = similarMovies;
                res.status(Constants.httpStatus.OKAY).json({ data: movie });
                if (!username) return [3 /*break*/, 5];
                //  recording a user view on a movie to then recommend similar movies 
                //  Here incase I want to use this information when recommending movies. Or seeing how popular a movie is.
                return [4 /*yield*/, db.collection("users").updateOne({ username: username }, { $push: { views: movie._id } })];
            case 4:
                //  recording a user view on a movie to then recommend similar movies 
                //  Here incase I want to use this information when recommending movies. Or seeing how popular a movie is.
                _a.sent();
                _a.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, movies;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                db = getDB();
                return [4 /*yield*/, db.collection(collectionName).find().toArray()];
            case 1:
                movies = _a.sent();
                res.status(Constants.httpStatus.OKAY).json({ data: movies });
                return [2 /*return*/];
        }
    });
}); };
exports.create = function (req, res, username) { return __awaiter(void 0, void 0, void 0, function () {
    var db, _a, title, releaseDate, runTime, genre, plot, cast, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                db = getDB();
                _a = req.body, title = _a.title, releaseDate = _a.releaseDate, runTime = _a.runTime, genre = _a.genre, plot = _a.plot, cast = _a.cast;
                _b = !checkMovieData(req.body);
                if (_b) return [3 /*break*/, 2];
                return [4 /*yield*/, checkCast(cast, db)];
            case 1:
                _b = !(_c.sent());
                _c.label = 2;
            case 2:
                if (_b)
                    throw { code: Constants.httpStatus.BAD_REQUEST, message: "Invalid data." };
                return [4 /*yield*/, db.collection(collectionName).insertOne({
                        title: title,
                        avgRating: 0,
                        releaseDate: releaseDate,
                        runTime: runTime,
                        cast: cast,
                        genre: genre.toLowerCase(),
                        plot: plot,
                        reviews: []
                    })];
            case 3:
                _c.sent();
                res.status(Constants.httpStatus.OKAY).json({ message: "Movie Created :)" });
                return [2 /*return*/];
        }
    });
}); };
exports.update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var db, id, _a, title, releaseDate, runTime, genre, plot, cast, _b, movieToUpdate;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                db = getDB();
                id = req.params.id;
                _a = req.body, title = _a.title, releaseDate = _a.releaseDate, runTime = _a.runTime, genre = _a.genre, plot = _a.plot, cast = _a.cast;
                _b = !checkMovieData(req.body);
                if (_b) return [3 /*break*/, 2];
                return [4 /*yield*/, checkCast(cast, db)];
            case 1:
                _b = !(_c.sent());
                _c.label = 2;
            case 2:
                if (_b)
                    throw { code: Constants.httpStatus.BAD_REQUEST, message: "Invalid data." };
                return [4 /*yield*/, db.collection(collectionName).findOne({ _id: new ObjectID(id) })];
            case 3:
                movieToUpdate = _c.sent();
                console.log(movieToUpdate);
                return [4 /*yield*/, db.collection(collectionName).updateOne({ _id: new ObjectID(id) }, {
                        $set: {
                            title: title,
                            avgRating: movieToUpdate.avgRating,
                            releaseDate: releaseDate,
                            runTime: runTime,
                            cast: cast,
                            genre: genre.toLowerCase(),
                            plot: plot,
                            reviews: movieToUpdate.reviews
                        }
                    })];
            case 4:
                _c.sent();
                res.status(Constants.httpStatus.OKAY).json({ message: "Updated Created :)" });
                return [2 /*return*/];
        }
    });
}); };
exports.createReview = function (req, res, username) { return __awaiter(void 0, void 0, void 0, function () {
    var db, _a, summary, fullTextReview, rating, movieID, movie, avgRating;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                db = getDB();
                _a = req.body, summary = _a.summary, fullTextReview = _a.fullTextReview, rating = _a.rating, movieID = _a.movieID;
                if (summary.length == 0 || fullTextReview.length == 0)
                    throw { code: Constants.httpStatus.BAD_REQUEST, message: "Fields empty stupid." };
                if (summary.length >= 50)
                    throw { code: Constants.httpStatus.BAD_REQUEST, message: "Summary too long" };
                if (fullTextReview.length >= 500)
                    throw { code: Constants.httpStatus.BAD_REQUEST, message: "Review too long" };
                return [4 /*yield*/, db.collection(collectionName).updateOne({ _id: new ObjectID(movieID) }, { $push: { reviews: { user: username, summary: summary, fullTextReview: fullTextReview, rating: rating } } })];
            case 1:
                _b.sent();
                return [4 /*yield*/, db.collection(collectionName).findOne({ _id: new ObjectID(movieID) })];
            case 2:
                movie = _b.sent();
                avgRating = 0;
                movie.reviews.map(function (ele) {
                    avgRating += ele.rating;
                });
                avgRating = Math.round(avgRating / movie.reviews.length);
                return [4 /*yield*/, db.collection(collectionName).updateOne({ _id: new ObjectID(movieID) }, { $set: { avgRating: avgRating } })];
            case 3:
                _b.sent();
                res.status(Constants.httpStatus.OKAY).json({ message: "Review Created :)" });
                return [2 /*return*/];
        }
    });
}); };
var isValidDate = function (dateString) {
    var date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime());
};
var checkCast = function (cast, db) { return __awaiter(void 0, void 0, void 0, function () {
    var x, potentialCast;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!Array.isArray(cast))
                    return [2 /*return*/, false];
                x = 0;
                _a.label = 1;
            case 1:
                if (!(x < cast.length)) return [3 /*break*/, 4];
                return [4 /*yield*/, db.collection("cast").findOne({ name: cast[x] })];
            case 2:
                potentialCast = _a.sent();
                if (!potentialCast)
                    return [2 /*return*/, false];
                _a.label = 3;
            case 3:
                x++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/, true];
        }
    });
}); };
var checkMovieData = function (_a) {
    var title = _a.title, releaseDate = _a.releaseDate, runTime = _a.runTime, genre = _a.genre, plot = _a.plot;
    try {
        if (!title || !releaseDate || !runTime || !genre || !plot)
            throw "";
        if (!isValidDate(releaseDate))
            throw "";
        return true;
    }
    catch (err) {
        return false;
    }
};
