const express = require('express');
const router = express.Router();
const { isLoggedInUser } = require('../middlewares/authMiddleware');
const { getLocationCoordinates } = require('../controllers/mapController');
const { getDistanceAndTime } = require('../controllers/mapController');
const { getSuggestedLocations } = require('../controllers/mapController');
const { query } = require('express-validator');

router.get('/getCoordinates',isLoggedInUser, query('address').isString().isLength({ min: 3 }).withMessage('Address must be at least 3 characters long'), getLocationCoordinates);

router.get("/getDistanceAndTime", isLoggedInUser, query("from").isString().isLength({ min: 3 }).withMessage("From must be at least 3 characters long"), query("to").isString().isLength({ min: 3 }).withMessage("To must be at least 3 characters long"), getDistanceAndTime);

router.get("/getSuggestedLocations",isLoggedInUser,query("address").isString(), getSuggestedLocations);

module.exports = router;