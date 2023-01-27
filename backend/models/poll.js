const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const pollSchema = Schema(
  {
    title: {
      type: String,
      required: true
    },
    options: {
      type: [{ id: String, votes: Number, text: String }]
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
      default: 0,
      required: true
    },
    imageURL: {
      type: String
    },
    // imageUpload: {
    //   type: File
    // },
    voters: []
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Poll", pollSchema);
