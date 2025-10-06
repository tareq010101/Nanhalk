
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        
    },
    
    pickupLocation: {
        type: String,
        required: true,
        trim: true
    },
    dropoffLocation: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ["pending", "accepted", "in-progress", "completed", "cancelled"],
        default: "pending"
    },
    price: {
        type: Number,
        required: true,
        min: 100
    },
    details: {  // إضافة حقل details
        type: String,
        required: true,
        trim: true
    }


}, { timestamps: true });
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
