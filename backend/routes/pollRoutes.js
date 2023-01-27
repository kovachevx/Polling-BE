const express = require("express");
const isAuth = require("../middleware/isAuth");
const router = express.Router();
const multer = require("multer");

const { getPolls, createPoll, updatePoll, deletePoll, uploadImage } = require("../controllers/pollController");

// const fileStorage = multer.diskStorage({
//   destination: (req, file, callback) => {
//     console.log("minah ot tuk");
//     callback(null, "images");
//   },
//   filename: (req, file, callback) => {
//     console.log("minah ot tuk");

//     callback(null, new Date().toISOString + "-" + file.originalname);
//   }
// });

// const fileFilter = (req, file, callback) => {
//   if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
//     callback(null, true);
//   } else {
//     callback(null, false);
//   }
// };

router.get("/", getPolls);
router.put("/:pollId", isAuth, updatePoll);
router.delete("/:pollId", isAuth, deletePoll);
router.post("/create", isAuth, createPoll);
router.post('/upload', uploadImage)

module.exports = router;
