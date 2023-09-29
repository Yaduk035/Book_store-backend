const express = require("express");
const router = express.Router();
const booksController = require("../../controllers/booksController");

router.route("/recentbooks").get(booksController.getRecentBooks);
router.route("/review/:id").put(booksController.addReview);
router.route("/wishlist/:id").post(booksController.addToWishlist);
router.route("/wishlist/:id").delete(booksController.deleteFromWishlist);
router.route("/rentlist/:id").post(booksController.addToRentlist);
router.route("/rentlist/:id").delete(booksController.deleteFromRentlist);
router.route("/reviews/:id").post(booksController.addReview);
router.route("/reviews/:id").get(booksController.getReview);
router.route("/reviews/:id").delete(booksController.deleteReview);
router.route("/userwishlist/:id").get(booksController.userWishlist);
router.route("/userrentlist/:id").get(booksController.userRentlist);

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
