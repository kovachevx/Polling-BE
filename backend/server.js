const express = require("express");
const mongoose = require("mongoose");

const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const multer = require("multer");
require("dotenv").config();

const app = express();

// const upload = multer({dest: 'backend/images'})

const fileStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, "./images"));
  },
  filename: (req, file, callback) => {
    console.log(file);
    callback(null, new Date().toISOString() + "-" + file.originalname);
  }
});

// const fileFilter = (req, file, callback) => {
//   if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
//     callback(null, true);
//   } else {
//     callback(null, false);
//   }
// };

app.use(express.json());
// app.use(multer({dest: './backend/images/'}).single("image"));
app.use(multer({ storage: fileStorage }).single("image"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true, preflightContinue: true }));

app.use("/polls", require("./routes/pollRoutes"));
app.use("/auth", require("./routes/userRoutes"));

mongoose
  .connect(process.env.MONGODB_URI)
  .then((result) => {
    app.listen(process.env.SERVER_PORT);
  })
  .catch((error) => {
    console.log(error);
  });
