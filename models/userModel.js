const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  
  firstName: {
    type: String,
    required: true,
    min: [3, "First Name must atleast 3 characters or long"],
  },
  lastName: {
    type: String,
    min: [3, "Last Name must atleast 3 characters or long"],
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: [8, "Password must be atleast 6 characters long"],
    select: false
  },
  profileImage: {
    type: String,
    default: null,
  },
  socket_id: {
    type: String,
  },
  
});

userSchema.methods.genAuthToken = function (){
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '6h' });
  return token;
};

userSchema.methods.comparePass = function(Password) {
  return bcrypt.compare(Password, this.password);
};

userSchema.statics.hashPass = async (password) => {
  return await bcrypt.hash(password, 10);
};

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
