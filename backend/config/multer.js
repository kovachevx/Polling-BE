const multer = require("multer");
const path = require("path");

exports.fileStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, "../images"));
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname + "-" + Date.now() + "." + file.mimetype.split("/")[1]);
  }
});

exports.fileFilter = (req, file, callback) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
    callback(null, true);
  } else {
    callback(null, false);
  }
};
