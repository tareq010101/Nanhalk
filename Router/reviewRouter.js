const express = require('express');
const router = express.Router();
const reviewController = requir('./../Controller/reviewController.js');


router.post('/:driverId/reviews', reviewController.addReview);

module.exports = router;
