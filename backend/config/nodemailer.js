const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SENDER_EMAIL_HOST,
  port: process.env.SENDER_EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.SENDER_EMAIL_ADDRESS,
    pass: process.env.SENDER_EMAIL_PASSWORD
  }
});

module.exports = transporter;
