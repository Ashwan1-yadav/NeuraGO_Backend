const userModel = require("../models/userModel");
const { createUser } = require("../services/userService");
const { validationResult } = require("express-validator");
const BlockedTokenModel = require("../models/blockedToken");

const userRegister = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { firstName, lastName, email, password } = req.body;

  const profileImage = req.file ? `/images/${req.file.filename}` : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHoXjUbvtFit9xDzRgvR_5Su0twbkyeS608A&s";
  
  const isUserExist = await userModel.findOne({ email });

  if (isUserExist) {
    return res.status(400).json({ msg: "User already exists" });
  }

  const hashedPass = await userModel.hashPass(password);

  const user = await createUser({
    firstName,
    lastName,
    email,
    password: hashedPass,
    profileImage,
  });

  const token = await user.genAuthToken();

  res.status(201).json({ user, token });
};

const userLogin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatchPass = await user.comparePass(password);

  if (!isMatchPass) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = await user.genAuthToken();

  res.cookie("token", token);

  res.status(200).json({ token, user });
};

const userProfile = async (req, res) => {
  res.status(200).json({ user : req.user});
};


const userLogout = async (req, res) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  await BlockedTokenModel.create({ token });
  res.clearCookie("token");
  res.status(200).json({ message: "User Logged Out" });
};

module.exports = {
  userRegister,
  userLogin,
  userProfile,
  userLogout,
};