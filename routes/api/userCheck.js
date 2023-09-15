const express = require("express");
const router = express.Router();
const signupController = require("../../controllers/signupController");

// router.route("/username/:username").get(signupController.checkUsername);

router.route("/email/:email").get(signupController.checkEmail);

module.exports = router;
