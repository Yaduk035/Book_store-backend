const express = require("express");
const router = express.Router();
const booksController = require("../../controllers/booksController");

router.route("/recentbooks").get(booksController.getRecentBooks);
router.route("/rent/:id").put(booksController.addToRentlist);
router.route("/removerent/:id").delete(booksController.addToRentlist);
router.route("/review/:id").put(booksController.addReview);
router.route("/wishlist/:id").post(booksController.addToWishlist);
router.route("/wishlist/:id").delete(booksController.deleteFromWishlist);

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
