const User = require("../models/user");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const transporter = require("../config/nodemailer");
// const RefreshToken = require("../models/refreshToken");

// function generateAccessToken(user) {
//   return jwt.sign({ email: user.email, userId: user._id.toString() }, process.env.ACCESS_TOKEN_SECRET, {
//     expiresIn: "1h"
//   });
// }

exports.login = (req, res, next) => {
  const { email, password } = req.body;

  // let loggingUser;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.json({ error: "User not found!" });
      }

      // loggingUser = { email: user.email, _id: user._id.toString() };

      return bcrypt.compare(password, user.password).then((passwordsDoMatch) => {
        if (passwordsDoMatch) {
          const token = jwt.sign({ email: email, userId: user._id.toString() }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "1h"
          });

          res.cookie("token", token, { httpOnly: true });

          return res.status(200).json({
            email: user.email,
            _id: user._id,
            role: user.role,
            username: user.username,
            token: token
          });
        }

        return res.json({ error: "Wrong password!" });
      });
    })
    .catch((error) => {
      console.log(error);
    });

  // console.log(loggingUser);

  // const refreshToken = jwt.sign(
  //   { email: loggingUser.email, userId: loggingUser._id.toString() },
  //   process.env.REFRESH_TOKEN_SECRET
  // );

  // RefreshToken.findOne({ refreshToken: refreshToken })
  //   .then((userDoc) => {
  //     if (!userDoc) {
  //       const newRefreshToken = new RefreshToken({ refreshToken: refreshToken });
  //       return newRefreshToken.save();
  //     }
  //   })
  //   .catch((error) => console.log(error));
};

exports.register = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = email.substring(0, email.indexOf("@"));

  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        res.status(302);
        return res.redirect("/login");
      }

      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            email: email,
            password: hashedPassword,
            username: username
          });
          return user.save();
        })
        .then((result) => {
          console.log("Successful registration!");
          return transporter.sendMail({
            to: email,
            from: process.env.SENDER_EMAIL_ADDRESS,
            subject: "Successful Registration at Pollsha",
            html: "<h1>You have successfully signed up!</h1><p>Feel free to to create your own or browse throughout the existing polls.</p>"
          });
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
};

exports.logout = (req, res, next) => {
  console.log("Logged out successfully!");
  res.clearCookie("token");
  return res.json({ result: "Cookie cleared successfully!" });
};

exports.resetPassword = (req, res, next) => {
  crypto.randomBytes(32, (error, buffer) => {
    if (error) {
      console.log(error);
      return res.redirect("/password-reset");
    }

    const token = buffer.toString("hex");
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (!user) {
          return res.redirect("/password-reset");
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then((result) => {
        console.log("PASSWORD RESET SENT!");
        transporter.sendMail({
          to: req.body.email,
          from: process.env.SENDER_EMAIL_ADDRESS,
          subject: "Password Reset for your Pollsha Account",
          html: `<h1>You requested a password reset for your Pollsha account!</h1>
          <p>Click on this <a href="http://localhost:3000/password-reset/${token}">link</a> to set a new password.</p>`
        });
      })
      .catch((err) => console.log(err));
  });
};

exports.saveNewPassword = (req, res, next) => {
  const token = req.params.tokenId;
  const password = req.body.password;
  let user;

  User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
    .then((foundUser) => {
      user = foundUser;
      return bcrypt.hash(password, 12);
    })
    .then((hashedPassword) => {
      user.password = hashedPassword;
      user.resetToken = undefined;
      user.resetTokenExpiration = undefined;
      return user.save();
    })
    .then(() => {
      console.log("PASSWORD CHANGED SUCCESSFULLY!");
      res.status(200).json({ message: "Password changed successfully!" });
      transporter.sendMail({
        to: user.email,
        from: process.env.SENDER_EMAIL_ADDRESS,
        subject: "Pollsha Account - Changed Password",
        html: `<h1>The Password For Your Pollsha Account Has Been Changed</h1>
        <p>If you did not make this change, please secure your email address, and contact our support team immediately at pollsha@abv.bg</p>
        <br><p>Kind regards, <br> The Pollsha Team</p>`
      });
    })
    .catch((error) => console.log(error));
};

// exports.refreshToken = (req, res, next) => {
//   const refreshToken = req.body.token;
//   const user = req.body.user;
//   console.log(user, "user");
//   console.log(refreshToken);

//   if (refreshToken === null) {
//     return res.status(401).json({ message: "Unauthorized!" });
//   }

//   RefreshToken.findOne({ refreshToken: refreshToken })
//     .then((userDoc) => {
//       if (!userDoc) {
//         return res.status(404).json({ message: "Refresh Token Not Found!" });
//       }

//       jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
//         if (error) return res.sendStatus(403);
//         const accessToken = generateAccessToken(user);
//         res.cookie("token", accessToken, { httpOnly: true });
//       });
//     })
//     .catch((error) => console.log(error));
// };
