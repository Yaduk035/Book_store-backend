const { User } = require("../config/userRoles");
const Books = require("../models/Book");
const Users = require("../models/User");
const BookIdSchema = require("../models/bookReviews");

const getRecentBooks = async (req, res) => {
  try {
    const books = await Books.find()
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order (most recent first)
      .limit(6) // Limit the result to the top 4 entries
      .exec();

    if (!books || books.length === 0) {
      return res.status(204).json("No books found");
    }

    res.status(200).json(books);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await Books.find().exec();
    if (!books) return res.status(204).json("No books found");
    res.status(200).json(books);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

const getBook = async (req, res) => {
  try {
    if (!req.params.id) return res.status(400).json({ error: "No id sent" });
    const book = await Books.findById(req.params.id);
    if (!book)
      return res.status(204).json({
        error: `Book with id ${req.params.id} not found in database.`,
      });
    res.status(200).json(book);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

const deleteBook = async (req, res) => {
  try {
    if (!req.params.id) return res.status(204).json({ error: "No id sent." });
    const book = await Books.findByIdAndDelete(req.params.id);
    if (!book)
      return res.status(204).json({
        error: `Book with id ${req.params.id} not found in database.`,
      });
    res.status(200).json({ message: `Book with id:${req.params.id} deleted` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

const addBook = async (req, res) => {
  try {
    const {
      bookName,
      author,
      genre,
      language,
      rentPeriod,
      rentData,
      availabilityStatus,
      ISBNnumber,
      year,
      description,
    } = req.body;
    const book = await Books.create({
      bookName: bookName,
      author,
      genre: genre,
      language,
      rentPeriod,
      rentData,
      availabilityStatus,
      ISBNnumber,
      year,
      description,
      createdAt: Date.now(),
    });
    res.status(201).json(book);
    console.log(book);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

const editBook = async (req, res) => {
  try {
    if (!req.params.id) return res.status(400).json({ error: "No id sent" });
    const {
      bookName,
      imageName,
      author,
      genre,
      language,
      rentPeriod,
      rentData,
      availability,
      ISBNnumber,
      year,
      description,
      image,
    } = req.body;
    const book = await Books.findByIdAndUpdate(
      req.params.id,
      {
        bookName,
        imageName,
        author,
        genre,
        language,
        rentPeriod,
        rentData,
        availability,
        ISBNnumber,
        year,
        description,
        image,
        updatedAt: Date.now(),
      },
      { new: true }
    ).exec();
    if (!book)
      return res
        .status(204)
        .json({ error: `Book with id:${req.params.id} not found` });
    res.status(200).json(book);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error" });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const userId = req.body.userId;
    const bookId = req.params.id;

    if (!bookId) {
      return res
        .status(400)
        .json({ error: "User Id doesn not contain any data." });
    }

    const book = await Books.findById(bookId);
    const user = await Users.findById(userId);

    if (!book.users.wishlist.includes(userId)) {
      book.users.wishlist.push(userId);
      await book.save();
    }

    if (!user.wishlist.includes(bookId)) {
      user.wishlist.push(bookId);
      await user.save();
    }
    res.status(200).json({ message: "user added to wishlist" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error." });
  }
};

const deleteFromWishlist = async (req, res) => {
  try {
    const userId = req.body.userId;
    const bookId = req.params.id;
    console.log(userId);

    if (!bookId) {
      return res
        .status(400)
        .json({ error: "User Id doesn not contain any data." });
    }

    if (!userId) {
      return res
        .status(400)
        .json({ error: "request body doesnot contain userId" });
    }

    const book = await Books.findById(bookId);
    const user = await Users.findById(userId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    book.users.wishlist = book.users.wishlist.filter(
      (id) => id.toString() !== userId
    );
    await book.save();

    user.wishlist = user.wishlist.filter((id) => id.toString() !== bookId);
    await user.save();

    res.status(200).json({ message: "id removed from wishlist" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
};

const addToRentlist = async (req, res) => {
  try {
    const userId = req.body.userId;
    const bookId = req.params.id;

    if (!bookId) {
      return res
        .status(400)
        .json({ error: "User Id doesn not contain any data." });
    }

    const book = await Books.findById(bookId);
    const user = await Users.findById(userId);

    if (!book.users.wishlist.includes(userId)) {
      book.users.wishlist.push(userId);
      await book.save();
    }

    if (!user.wishlist.includes(bookId)) {
      user.wishlist.push(bookId);
      await user.save();
    }
    res.status(200).json({ message: "user added to wishlist" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error." });
  }
};

const deleteFromRentlist = async (req, res) => {
  try {
    const userId = req.body.userId;
    const bookId = req.params.id;

    if (!bookId) {
      return res
        .status(400)
        .json({ error: "User Id doesn not contain any data." });
    }

    const book = await Books.findById(bookId);
    const user = await Users.findById(userId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    book.users.wishlist = book.users.wishlist.filter(
      (id) => id.toString() !== userId
    );
    await book.save();

    user.wishlist = user.wishlist.filter((id) => id.toString() !== bookId);
    await user.save();

    res.status(200).json({ message: "id removed from wishlist" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
};

const addReview = async (req, res) => {
  try {
    const { userId, rating, comment } = req.body;
    const bookId = req.params.id;

    const newReview = {
      userId,
      rating,
      comment,
    };

    const updatedBook = await BookIdSchema.findOneAndUpdate(
      { bookId },
      { $push: { reviews: newReview } },
      { new: true, upsert: true }
    );

    if (updatedBook === null) {
      console.log("no document created");
    }
    res.status(200).json({ message: "comment added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
};

const userWishlist = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) return res.status(400).json({ error: "No user id sent" });
    const userData = await Users.findById(userId).exec();
    if (!userData) {
      return res
        .status(400)
        .json({ error: `No user with id ${userId} found.` });
    }
    const user = await Users.findById(userId);
    const wishlist = user.wishlist;
    const wishlistData = [];

    for (const itemId of wishlist) {
      const book = await Books.findById(itemId);
      if (book) {
        wishlistData.push(book);
      }
    }

    res.status(200).json(wishlistData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
};

module.exports = {
  getBook,
  getAllBooks,
  getRecentBooks,
  deleteBook,
  addBook,
  editBook,
  addToWishlist,
  addToRentlist,
  deleteFromWishlist,
  deleteFromRentlist,
  addReview,
  userWishlist,
};
