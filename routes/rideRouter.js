const express = require("express");
const router = express.Router();
const { body,query } = require("express-validator");
const { isLoggedInDriver, isLoggedInUser } = require("../middlewares/authMiddleware");
const { createRide, getRideFare, confirmRide, ongoingRide, finishedRide } = require("../controllers/rideController");


router.post(
  "/createRide",
  body('pickUpAddress')
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid Pick up address"),
  body('destination')
    .isString()
    .isLength({ min: 3 })
    .withMessage("Invalid destination address"),
  body('vehicleType')
    .isIn(["auto", "car", "bike"])
    .withMessage("Invalid vehicle type"),
  isLoggedInUser,
  createRide
);

router.get('/getRideFare',
  isLoggedInUser,
  query('location').isString(),
  query('destination').isString(),
  getRideFare
)

router.post('/confirmRide',
  isLoggedInDriver,
  body('rideId').isString().withMessage("Invalid ride id"),
  body('driverId').isString().withMessage("Invalid driver id"),
  confirmRide
)

router.get("/rideOngoing", isLoggedInDriver,
  query('rideId').isString().withMessage("Invalid ride id"),
  ongoingRide
);

router.get("/rideFinished", isLoggedInDriver,
  query('rideId').isString().withMessage("Invalid ride id"),
  finishedRide
);

module.exports = router;
