const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  userId: String,
  rating: Number,
  comment: String,
});

const bookIdSchema = new Schema({
  bookId: String,
  reviews: [reviewSchema],
});

const BookIdSchema = mongoose.model("BookComment", bookIdSchema);
module.exports = BookIdSchema;
