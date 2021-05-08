'use strict';

export { };

const router = require('express').Router();
const { middleware } = require('../middleware');
const { getOne, getAll, create, update, createReview } = require("./castService");

router.get("/", middleware(false, getAll))
router.get("/:id", middleware(false, getOne))
router.post("/", middleware(false, create))
router.put("/:id", middleware(false, update))
// router.post("/follow/:id", middleware(true, createReview))
// router.delete("/follow/:id", middleware(true, createReview))

module.exports = router;