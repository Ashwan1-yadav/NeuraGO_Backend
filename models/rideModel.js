const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const rideSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Driver",
  },
  pickUpAddress: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  fare: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "ongoing", "cancelled", "completed"],
    default: "pending",
  },
  duration: {
    type: String,
  },
  distance: {
    type: String,
  },
  paymentId: {
    type: String,
  },
  orderId: {
    type: String,
  },
  signature: {
    type: String,
  },
  otp: {
    type: String,
    required: true,
    Selection: false,
  },
});

module.exports = mongoose.model("Ride", rideSchema);
