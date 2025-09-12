const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { registerDriver, driverLogin, driverLogout, driverProfile } = require("../controllers/driverController");
const { isLoggedInDriver } = require("../middlewares/authMiddleware");
const upload = require("../utilities/multer");

router.post(
  "/register",
  upload.single("profileImage"),
  [
    body("firstName", "First Name must be at least 3 characters long").isLength({ min: 3 }),
    body("email", "Invalid Email").isEmail(),
    body("password", "Password must be at least 6 characters long").isLength({ min: 6 }),
    body("vehicleColor", "Color is required").notEmpty().isLength({ min: 3 }),
    body("vehicleType", "Vehicle Type is required").notEmpty().isIn(["car", "bike", "van"]),
    body("vehicleNoPlate", "Vehicle No Plate is required").notEmpty().isLength({ min: 9 }),
    body("vehicleCapacity", "Vehicle Capacity is required").isInt({ min: 1 }).notEmpty(),
  ],
  registerDriver
);

router.post("/login",
  [
    body("email", "Invalid Email").isEmail(),
    body("password", "Password must be at least 6 characters long").isLength({ min: 6 }),
  ], 
  driverLogin);

router.get("/logout",isLoggedInDriver, driverLogout); 

router.get("/profile",isLoggedInDriver, driverProfile);

module.exports = router;