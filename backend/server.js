const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
const cookieParser = require("cookie-parser");
const multer = require("multer");
require("dotenv").config();

const {fileStorage, fileFilter} = require("./config/multer");

const app = express();

app.use(express.json());
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single("image"));
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
