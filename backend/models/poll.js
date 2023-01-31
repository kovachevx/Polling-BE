const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const pollSchema = Schema(
  {
    title: {
      type: String,
      required: true
    },
    options: [{ text: String, votes: { type: Number, default: 0 } }],
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
      type: [],
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
