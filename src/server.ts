import express from "express";

interface BooksProps {
  id: string;
  title: string;
  author: string;
  published_at: number;
}

let books: BooksProps[] = [];

const app = express();

app.use(express.json());

app.get("/books", (req, res) => {
  const allBooks = books;
  return res.status(200).json(allBooks);
});

app.get("/books/:book_id", (req, res) => {
  const { book_id } = req.params;
  const book = books.find((book) => book.id == book_id);

  if (!book) res.status(404).json("404 Not Found!");
  return res.status(200).json(book);
});

app.post("/books", (req, res) => {
  const { id, title, author, published_at }: BooksProps = req.body;
  const book: BooksProps = { id, title, author, published_at };

  books.push(book);
  return res.status(201).json(books);
});

app.delete("/books/:book_id", (req, res) => {
  const { book_id } = req.params;
  const newBooks = books.filter((books: BooksProps) => books.id != book_id);

  books = newBooks;
  return res.status(204).json("Deleted!");
});

app.patch("/books/:book_id", (req, res) => {
  const { id, title, author, published_at }: BooksProps = req.body;
  const { book_id } = req.params;
  const book = books.find((book) => book.id == book_id);

  const newBook = {
    id: id || book?.id,
    title: title || book?.title,
    author: author || book?.author,
    published_at: published_at || book?.published_at,
  };
  return res.status(200).json(newBook);
});

app.listen(3333);
