const express = require("express");
const router = express.Router();
const booksController = require("../../controllers/booksController");

router.route("/recentbooks").get(booksController.getRecentBooks);
router
  .route("/")
  .get(booksController.getAllBooks)
  .post(booksController.addBook);
router
  .route("/:id")
  .get(booksController.getBook)
  .delete(booksController.deleteBook)
  .put(booksController.editBook);

module.exports = router;
