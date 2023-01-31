const Poll = require("../models/poll");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

exports.getPolls = async (req, res, next) => {
  Poll.find({ lean: true })
    .sort({ createdAt: "desc" })
    .then((polls) => {
      if (polls) {
        res.json({ polls: polls });
      }
    })
    .catch((error) => next(error));
};

exports.createPoll = (req, res, next) => {
  const url = `${req.protocol}://${req.get("host")}`;

  const poll = new Poll({
    title: req.body.title,
    creatorId: mongoose.Types.ObjectId(req.body.creatorId),
    options: JSON.parse(req.body.options),
    creatorUsername: req.body.creatorUsername,
    imageURL: req.body.imageURL,
    imagePath: req.file ? `${url}/images/${req.file.filename}` : ""
  });

  poll
    .save()
    .then((result) => {
      console.log("Created Poll");
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.updatePoll = (req, res, next) => {
  const pollId = req.params.pollId;

  Poll.findById(pollId)
    .then((poll) => {
      poll.title = req.body.title;
      poll.creatorId = req.body.creatorId;
      poll.voters = req.body.voters;
      poll.options = req.body.options;
      poll.creatorUsername = req.body.creatorUsername;
      poll.totalVotes = req.body.totalVotes;

      return poll.save();
    })
    .then((result) => {
      console.log("POLL UPDATED");
      res.json({ message: "Voted successfully!" });
    })
    .catch((error) => next(error));
};

exports.deletePoll = (req, res, next) => {
  const pollId = req.params.pollId;
  let imagePath;

  Poll.findByIdAndRemove(pollId)
    .then((poll) => {
      imagePath = poll.imagePath;
      console.log("DESTROYED POLL");
      res.json({ message: "Poll deleted successfully!" });
    })
    .then((result) => {
      if (imagePath) {
        imagePath = imagePath.split("/").slice(-2).join("/");

        fs.unlink(`${__dirname}/../${imagePath}`, (error) => {
          if (error) console.log(error);
        });
      }
    })
    .catch((error) => {
      next(error);
    });

  console.log(imagePath);
};
