const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const driverSchema = new mongoose.Schema({
  
    firstName: {
      type: String,
      required: true,
      minlength: [3, "First Name must be atleast 3 characters long"],
    },
    lastName: {
      type: String,
      minlength: [3, "First Name must be atleast 3 characters long"],
    },
  
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    default: "Not Uploaded",
  },
  socketId: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  
  vehicleColor: {
      type: String,
      required: true,
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["car", "bike", "van"],
    },
    vehicleNoPlate: {
      type: String,
      required: true,
    },
    vehicleCapacity: {
      type: Number,
      required: true,
      min: [1, "Capacity must be atleast 1"],
    },
    location: {
      latitude: {
        type: Number,
      },
      longitude: {
        type: Number,
      },
    },
    socket_id: {
      type: String,
    },
});

driverSchema.methods.genAuthToken = function (){
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '12h' });
  return token;
};

driverSchema.methods.comparePass = function (Password) {
  return bcrypt.compare(Password, this.password);
};

driverSchema.statics.hashPass = async (password) => {
  return await bcrypt.hash(password, 10);
};

const Driver = mongoose.model("Driver", driverSchema);

module.exports = Driver;
