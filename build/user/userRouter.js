'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var userService_1 = require("./userService");
var router = require('express').Router();
var middleware = require('../middleware').middleware;
var _a = require('./loginService'), login = _a.login, checkToken = _a.checkToken, logout = _a.logout;
var get = require('./userService').get;
router.get("/", middleware(false, userService_1.getAll));
router.post("/login", middleware(false, login));
router.post("/logout", middleware(false, logout));
router.post("/token", middleware(false, checkToken));
router.delete("/follower/:name", middleware(true, userService_1.removeFollower));
router.post("/follower/:name", middleware(true, userService_1.addFollower));
router.get("/:username", middleware(false, get));
module.exports = router;
