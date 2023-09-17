const express = require("express");
const router = express.Router();
const booksController = require("../../controllers/booksController");

router
  .route("/:id")
  .get(booksController.getBook)
  .delete(booksController.deleteBook)
  .put(booksController.editBook);
router
  .route("/")
  .get(booksController.getAllBooks)
  .post(booksController.addBook);

module.exports = router;
