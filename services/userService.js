const userModel = require("../models/userModel");

const createUser = async ({ firstName, lastName, email, password,profileImage }) => {
  if (!firstName || !lastName || !email || !password) {
    throw new Error("All fields are required");
  }

  const user = await userModel.create({
    firstName, 
    lastName,
    email,
    password,
    profileImage,
  });
  return user;
};

module.exports = {
  createUser,
};
