const express = require('express');
const bookingController = require('./../Controller/bookingController.js');
const router = express.Router();

router
.route('/')
.get(bookingController.getAllBookings)
.post(bookingController.addBooking);


router.get('/pending', bookingController.getPendingBookings);


router
.route('/:id')
.get(bookingController.getBooking)
.patch(bookingController.updateBooking)
.delete(bookingController.deleteBooking);

module.exports = router;
