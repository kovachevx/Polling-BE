const multer = require("multer");
const path = require("path");

exports.fileStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, "../public/images"));
  },
  filename: (req, file, callback) => {
    const [name, ext] = file.originalname.split(".");
    callback(null, name + "-" + Date.now() + "." + ext);
  }
});

exports.fileFilter = (req, file, callback) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
    callback(null, true);
  } else {
    callback(null, false);
  }
};
