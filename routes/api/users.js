const express = require("express");
const router = express.Router();
const userController = require("../../controllers/usercontroller");
const rolesList = require("../../config/userRoles");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(verifyRoles(rolesList.Admin), userController.getAllUsers)
  .delete(verifyRoles(rolesList.Admin), userController.deleteUserError);
router
  .route("/:id")
  .get(verifyRoles(rolesList.Admin), userController.getUser)
  .delete(verifyRoles(rolesList.Admin), userController.deleteUser);

router
  .route("/logfiles/reqlogs")
  .get(verifyRoles(rolesList.Admin), userController.getReqLogs);
router
  .route("/logfiles/errorlogs")
  .get(verifyRoles(rolesList.Admin), userController.getErrorLogs);

module.exports = router;
