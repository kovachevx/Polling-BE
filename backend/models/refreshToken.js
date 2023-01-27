const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const refreshTokenSchema = Schema(
  {
    refreshToken: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("RefreshToken", refreshTokenSchema);
