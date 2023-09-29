const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    userId: String,
    rating: Number,
    commentTitle: String,
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const bookIdSchema = new Schema({
  bookId: String,
  reviews: [reviewSchema],
});

const BookIdSchema = mongoose.model("BookComment", bookIdSchema);
module.exports = BookIdSchema;
