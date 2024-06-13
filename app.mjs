import express from 'express';
import mongoose from 'mongoose';
import path from 'path';

const app = express();
const PORT = 8080;


const __dirname = path.resolve();

// Connect to MongoDB database
mongoose.connect('mongodb+srv://<your login>:<your password>@asilbeckjs.hshsv1r.mongodb.net/?retryWrites=true&w=majority&appName=AsilbeckJS', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//
const bookSchema = new mongoose.Schema({
title: String,
author: String,
  year: String,
  review: String,
});


const Book = mongoose.model('Book', bookSchema);

// Middleware
app.use(express.json());
app.use(express.static('public'));

// CRUD
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/main.html');
})
app.get('/create', (req, res) => {
  res.sendFile(__dirname + '/public/create.html');
})
app.get('/edit', (req, res) => {
  res.sendFile(__dirname + '/public/edit.html');
})
app.get('/search', (req, res) => {
  res.sendFile(__dirname + '/public/search.html');
})
app.get('/delete', (req, res) => {
  res.sendFile(__dirname + '/public/delete.html');
})

// C
app.post('/books', async (req, res) => {
  try {
    const { title, author, year, review } = req.body;
    const book = new Book({ title, author, year, review });
    await book.save();
    res.status(201).send(book);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// R
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.send(books);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// U
app.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).send('Book not found');
    }
    res.send(book);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


// D
app.delete('/books/:id', async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.send('Kitob muvaffaqiyatli o\'chirildi');
  } catch (error) {
    res.status(404).send('Kitob topilmadi');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
