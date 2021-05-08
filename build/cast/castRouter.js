'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
var router = require('express').Router();
var middleware = require('../middleware').middleware;
var _a = require("./castService"), getOne = _a.getOne, getAll = _a.getAll, create = _a.create, update = _a.update, createReview = _a.createReview;
router.get("/", middleware(false, getAll));
router.get("/:id", middleware(false, getOne));
router.post("/", middleware(false, create));
router.put("/:id", middleware(false, update));
// router.post("/follow/:id", middleware(true, createReview))
// router.delete("/follow/:id", middleware(true, createReview))
module.exports = router;
