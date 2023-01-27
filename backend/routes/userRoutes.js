const express = require("express");
const router = express.Router();

const { register, login, resetPassword, saveNewPassword, logout } = require("../controllers/authController");

router.post("/login", login);
router.delete("/logout", logout);
router.post("/register", register);
router.post("/password-reset", resetPassword);
router.post("/password-reset/:tokenId", saveNewPassword);
// router.post("/token", refreshToken);

module.exports = router;
