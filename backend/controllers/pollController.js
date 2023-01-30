const Poll = require("../models/poll");
const mongoose = require("mongoose");
const fs = require("fs");

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
  console.log(req.file);
  console.log(req.body, 'body');

  const newFileName = req.file.filename + "." + req.file.mimeType.split("/")[1];
  console.log(newFileName, 'newFilename')
  fs.rename(`../images/${req.file.filename}`, newFileName, () => {
    console.log("done");
  });


  // const poll = new Poll({
  //   title: req.body.title,
  //   creatorId: mongoose.Types.ObjectId(req.body.creatorId),
  //   voters: [],
  //   options: req.body.options,
  //   creatorUsername: req.body.creatorUsername,
  //   totalVotes: 0,
  //   imageURL: req.body.imageURL
  // });

  // poll
  //   .save()
  //   .then((result) => {
  //     console.log("Created Poll");
  //     console.log(result)
  //     res.json(result);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
};

exports.updatePoll = (req, res, next) => {
  const pollId = req.params.pollId;

  Poll.findById(pollId)
    .then((poll) => {
      console.log(poll);
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

  Poll.findByIdAndRemove(pollId)
    .then(() => {
      console.log("DESTROYED POLL");
      res.json({ message: "Poll deleted successfully!" });
    })
    .catch((error) => {
      next(error);
    });
};