const { createRide, fareCalculation, confirmRide, ongoingRide, finishedRide } = require("../services/rideService");
const { validationResult } = require("express-validator");
const {
  getDriverInRange,
  getAddressCoordinates,
} = require("../services/mapService");
const { sendMessage } = require("../utilities/socket");
const rideModel = require("../models/rideModel");

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { pickUpAddress, destination, vehicleType } = req.body;
    const otp = "";
    const ride = await createRide(
      req.user._id,
      pickUpAddress,
      destination,
      vehicleType,
      otp
    );
    const address_Coordinates = await getAddressCoordinates(pickUpAddress);
    const { latitude, longitude } = address_Coordinates;

    const driversInRange = await getDriverInRange(latitude, longitude, 2);
    if (!driversInRange || driversInRange.length === 0) {
      return res.status(400).json({ error: "No drivers found in range" });
    }

    const userOfRide = await rideModel
      .findById({ _id: ride._id })
      .populate("user");

    driversInRange.map((driver) => {
      sendMessage(driver.socket_id, {
        event: "new_ride",
        data: userOfRide,
      });
    });

    res.status(201).json(ride);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.getRideFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { location, destination } = req.query;
    const fare = await fareCalculation(location, destination);
    return res.status(200).json(fare);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { rideId, driverId } = req.body;
    const ride = await confirmRide(rideId, driverId);
    sendMessage(ride.user.socket_id, {
      event: "ride_confirmed",
      data: ride,
    });
    return res.status(200).json(ride);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports.ongoingRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const ride = await ongoingRide(req.query.rideId);
    console.log(ride.user.socket_id)
    sendMessage(ride.user.socket_id, {
      event: "ride_ongoing",
      data: ride,
    });
    return res.status(200).json(ride);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports.finishedRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const ride = await finishedRide(req.query.rideId);
    sendMessage(ride.user.socket_id, {
      event: "ride_finished",
      data: ride
    });
    return res.status(200).json(ride);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
