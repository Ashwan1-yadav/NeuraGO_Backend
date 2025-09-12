const axios = require("axios");
require("dotenv").config();
const DriverModel = require("../models/driverModel");

module.exports.getAddressCoordinates = async (address) => {
  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      throw new Error("Google Maps API key is not configured");
    }

    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodedAddress}&key=${apiKey}`;

    const response = await axios.get(url);

    if (response.data.status === "OK" && response.data.results.length > 0) {
      const location = response.data.results[0].geometry.location;
      return {
        latitude: location.lat,
        longitude: location.lng,
      };
    } else {
      throw new Error("Unable to find coordinates for the given address");
    }
  } catch (error) {
    throw new Error(`Error getting coordinates: ${error.message}`);
  }
};

module.exports.getDistanceAndTime = async (from, to) => {
  if (!from || !to) {
    throw new Error("Origin and Destination are required");
  }
  try {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      throw new Error("Google Maps API key is not configured");
    }

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${from}&destinations=${to}&key=${apiKey}`;
    const response = await axios.get(url);

    if (response.data.status === "OK") {
      if (response.data.rows[0].elements[0].status === "ZERO_RESULTS") {
        throw new Error(
          "No route found between the given origin and destination"
        );
      }

      const distance = response.data.rows[0].elements[0].distance;
      const duration = response.data.rows[0].elements[0].duration;
      return {
        distance,
        duration,
      };
    } else {
      throw new Error("Unable to get distance and time");
    }
  } catch (error) {
    throw new Error(`Error getting distance and time: ${error.message}`);
  }
};

module.exports.getSuggestedLocations = async (address) => {
  if (!address) {
    throw new Error("address is required");
  }
  const query = encodeURIComponent(address);
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      return response.data.predictions
        .map((prediction) => prediction.description)
        .filter((value) => value);
    } else {
      throw new Error("Unable to fetch suggestions");
    }
  } catch (err) {
    throw err;
  }
};

module.exports.getDriverInRange = async (latitude, longitude, radius) => {
  try {
    if (!latitude || !longitude) {
      throw new Error("Latitude and longitude are required");
    }
    if (!radius) {
      throw new Error("Radius is required");
    }
    const drivers = await DriverModel.find({
      location: {
        $geoWithin: { $centerSphere: [[longitude, latitude], radius] },
      },
    });
    return drivers;
  } catch (error) {
    throw new Error(`Error getting drivers in range: ${error.message}`);
  }
};
