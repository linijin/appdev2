const Book = require("../models/book.model");
const sendBookCreatedEmail = require("../middlewares/send-email.middleware");


// GET /api/books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/books/:id
const getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/books
const createBook = async (req, res) => {
  try {
    const { title, author, year } = req.body;
    const newBook = new Book({ title, author, year });
    const savedBook = await newBook.save();

    // 📧 Send email notification
    await sendBookCreatedEmail(savedBook);

    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// PATCH /api/books/:id
const updateBook = async (req, res) => {
  try {
    const { title, author } = req.body;
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    book.title = title || book.title;
    book.author = author || book.author;
    const updatedBook = await book.save();

    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /api/books/:id
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
  sendBookCreatedEmail
};
