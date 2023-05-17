const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/", authController.generateAccessToken);
router.post("/refresh-token", authController.refreshAccessToken);

module.exports = router;
