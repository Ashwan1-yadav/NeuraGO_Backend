const {getAddressCoordinates} = require('../services/mapService');
const {getDistanceAndTime} = require('../services/mapService');
const {getSuggestedLocations} = require('../services/mapService');
const {validationResult} = require('express-validator');    

module.exports.getLocationCoordinates = async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const {address} = req.query;
        const coordinates = await getAddressCoordinates(address);
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
} 

module.exports.getDistanceAndTime = async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const {from, to} = req.query;
        const distanceAndTime = await getDistanceAndTime(from, to);
        res.status(200).json(distanceAndTime);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

module.exports.getSuggestedLocations = async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const {address} = req.query;
        const locations = await getSuggestedLocations(address);
        res.status(200).json(locations);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}   