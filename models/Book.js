const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    bookName: {
      type: String,
      required: true,
    },
    avgRating: {
      type: Number,
    },
    rentAmount: {
      type: Number,
    },
    imageName: {
      type: String,
    },
    author: {
      type: String,
    },
    genre: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    rentPeriod: {
      type: String,
      required: true,
    },
    rentData: {
      type: Number,
      required: true,
    },
    availabilityStatus: {
      type: String,
      required: true,
    },
    ISBNnumber: {
      type: String,
    },
    year: {
      type: Number,
    },
    description: {
      type: String,
      required: true,
    },
    users: {
      wishlist: [String],
      rentlist: [String],
    },
    // reviews: {
    //   username: {
    //     wishlist: [String],
    //     rentlist: [String],
    //   },
    // },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    image: String,
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const book = mongoose.model("Book", bookSchema);
module.exports = book;
