const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const {
  userRegister,
  userLogin,
  userProfile,
  userLogout,
} = require("../controllers/userController");

const { isLoggedInUser } = require("../middlewares/authMiddleware");
const upload = require("../utilities/multer");


router.post(
  "/register",
  upload.single("profileImage"),
  [
    body("firstName")
      .isLength({ min: 3 })
      .withMessage("First Name must be atleast 3 characters long"),
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be atleast 8 characters long"),
  ],
  userRegister
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be atleast 8 characters long"),
  ],
  userLogin
);


router.get("/profile", isLoggedInUser, userProfile);

router.get("/logout", isLoggedInUser, userLogout);

module.exports = router;