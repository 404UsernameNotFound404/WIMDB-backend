'use strict';

import { addFollower, getAll, removeFollower } from "./userService";
const router = require('express').Router();
const { middleware } = require('../middleware');
const { login, checkToken, logout } = require('./loginService');
const { get } = require('./userService');

router.get("/", middleware(false, getAll))
router.post("/login", middleware(false, login))
router.post("/logout", middleware(false, logout))
router.post("/token", middleware(false, checkToken))
router.delete("/follower/:name", middleware(true, removeFollower))
router.post("/follower/:name", middleware(true, addFollower))
router.get("/:username", middleware(false, get))

module.exports = router;