const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const pollSchema = Schema(
  {
    title: {
      type: String,
      required: true
    },
    options: {
      type: Array
    },
    creatorUsername: {
      type: String,
      required: true
    },
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    totalVotes: {
      type: Number,
      default: 0
    },
    imageURL: {
      type: String
    },
    voters: {
      type: Array,
      default: []
    },
    imagePath: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Poll", pollSchema);
