const Books = require("../models/Book");
const Users = require("../models/User");

const getRecentBooks = async (req, res) => {
  try {
    const books = await Books.find()
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order (most recent first)
      .limit(4) // Limit the result to the top 4 entries
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
    if (!req.params.id)
      return res.status(400).json({ error: "No id sent with req." });
    const { wishlisted } = req.body;
    const wishlistedUser = wishlisted;
    const book = await Books.findByIdAndUpdate(req.params.id, {
      $set: { "users.wishlisted": wishlistedUser },
    }).exec();
    if (!book)
      return res
        .status(400)
        .json({ error: `No book with id ${req.params.id}found.` });
    const user = await Users.findByIdAndUpdate(wishlistedUser, {
      $set: { "books.wishlisted": req.params.id },
    }).exec();
    if (!user)
      return res
        .status(400)
        .json({ error: `No user with id ${wishlistedUser} found.` });
    res.status(201).json({
      message: `user with id${wishlistedUser} and book with id${req.params.id} wishlisted.`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error." });
  }
};

const addToRentlist = async (req, res) => {
  try {
    if (!req.params.id)
      return res.status(400).json({ error: "No id sent with req." });
    const { rented } = req.body;
    const rentedUser = rented;
    const book = await Books.findByIdAndUpdate(req.params.id, {
      $set: { "users.rented": rentedUser },
    }).exec();
    if (!book)
      return res
        .status(400)
        .json({ error: `No book with id ${req.params.id}found.` });
    const user = await Users.findByIdAndUpdate(rentedUser, {
      $set: { "books.rented": req.params.id },
    }).exec();
    if (!user)
      return res
        .status(400)
        .json({ error: `No user with id ${rentedUser}found.` });
    res.status(201).json({
      message: `user with id${rentedUser} and book with id${req.params.id} rented.`,
    });
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
};
