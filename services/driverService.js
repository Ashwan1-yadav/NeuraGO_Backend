const driverModel = require("../models/driverModel");

const createDriver = async ({ firstName, lastName, email, password, vehicleColor, vehicleType, vehicleNoPlate, vehicleCapacity, profileImage }) => {
     
    const driver = await driverModel.create({

        firstName, 
        lastName,
        email,
        password,
        profileImage,
        vehicleColor,
        vehicleType,
        vehicleNoPlate,
        vehicleCapacity

    });

    if(driver.status === "inactive"){
        driver.status = "active"
        await driver.save()
    }
    return driver;
};

module.exports = { createDriver };