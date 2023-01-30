const express = require("express");
const isAuth = require("../middleware/isAuth");
const router = express.Router();

const { getPolls, createPoll, updatePoll, deletePoll } = require("../controllers/pollController");

router.get("/", getPolls);
router.put("/:pollId", isAuth, updatePoll);
router.delete("/:pollId", isAuth, deletePoll);
router.post("/create", isAuth, createPoll);

module.exports = router;
