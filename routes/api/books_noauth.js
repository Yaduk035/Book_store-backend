const express = require("express");
const router = express.Router();
const booksController = require("../../controllers/booksController");

router.route("/randombook").get(booksController.getRandomBook);
router.route("/recentbooks").get(booksController.getRecentBooks);
router.route("/reviews/:id").get(booksController.getReview);

router.route("/").get(booksController.getAllBooks);
router.route("/:id").get(booksController.getBook);

module.exports = router;
