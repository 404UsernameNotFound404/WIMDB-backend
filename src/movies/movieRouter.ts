'use strict';


export { };

const router = require('express').Router();
const { middleware } = require('../middleware');
const { getOne, getAll, create, update, createReview } = require("./movieService");

router.get("/", middleware(false, getAll))
router.get("/:id", middleware(false, getOne))
router.post("/", middleware(false, create))
router.put("/:id", middleware(false, update))
router.post("/review", middleware(false, createReview))

module.exports = router;