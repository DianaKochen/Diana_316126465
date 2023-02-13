const express = require('express');
const functions = require('./functions');
const router = express.Router();

router
    .route("/api/reviews")
    .get(functions.getReviews)
    .post(functions.createReview);

router
    .route('/api/calculatePoints')
    .post(functions.calculatePoints)

module.exports = router;