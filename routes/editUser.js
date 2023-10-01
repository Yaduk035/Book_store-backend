const express = require("express");
const router = express.Router();
const editUserController = require("../controllers/editUserController");

router
  .route("/:id")
  .get(editUserController.getUser)
  .put(editUserController.editUser);

module.exports = router;
