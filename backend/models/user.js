const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      default: "customer"
    },
    username: {
      type: String,
      required: true
    },
    resetToken: String,
    resetTokenExpiration: Date,
    refreshToken: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);
