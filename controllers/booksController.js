const Books = require("../models/Book");

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
    res.status(201).json({ message: "Book created!" });
    console.log(book);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

const editBook = async (req, res) => {
  try {
    if (!req.params.id) res.status(400).json({ error: "No id sent" });
    const {
      bookName,
      author,
      genre,
      language,
      rentPeriod,
      rentData,
      availability,
      ISBNnumber,
      year,
      description,
    } = req.body;
    const book = await Books.findByIdAndUpdate(
      req.params.id,
      {
        bookName,
        author,
        genre,
        language,
        rentPeriod,
        rentData,
        availability,
        ISBNnumber,
        year,
        description,
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
module.exports = {
  getBook,
  getAllBooks,
  getRecentBooks,
  deleteBook,
  addBook,
  editBook,
};
