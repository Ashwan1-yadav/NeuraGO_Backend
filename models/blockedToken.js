const mongoose = require("mongoose");

const blockedTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24 
  }
});

const BlockedToken = mongoose.model("BlockedToken", blockedTokenSchema);

module.exports = BlockedToken;