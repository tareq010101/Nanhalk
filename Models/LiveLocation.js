// Model/LiveLocation.js
const mongoose = require("mongoose");

const liveLocationSchema = new mongoose.Schema({
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Driver", // أو "User" لو السواقين في نفس موديل اليوزر
    required: true,
    unique: true   // كل سائق يكون عنده سجل واحد فقط
  },
  location: {
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    }
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const LiveLocation = mongoose.model("LiveLocation", liveLocationSchema);
module.exports = LiveLocation;
