const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
name: { type: String,
required: true },

email: { 
    type: String, 
    required:[true ,,'please provide your email'],
    unique: true,
    lowercase:true
},
role: { 
    type: String, 
    enum:'driver',
},

password: { type: String,
    required: true,
    minlength: [8, 'Password must be at least 8 characters long'],
    },

phone: { type: String, required: true, unique: true },
  address: { type: String }, // حرف صغير

licenseImage: String,
licenseStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
},

licenseReview: {
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reviewedAt: { type: Date, default: Date.now },
    rejectionReason: String
},

isVerified: {
type: Boolean,
default: false },
isAvailable: {
    type: Boolean, 
    default: false 
},

rating: { type: Number, default: 0 },
totalRatings: { type: Number, default: 0 },

reviews: [{
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
    reviewedAt: { type: Date, default: Date.now },
}],
currentBooking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        default: null
    },


});
const Driver=mongoose.model('Driver',driverSchema );

module.exports = Driver

