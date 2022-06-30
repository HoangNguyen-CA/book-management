import {
  Typography,
  List,
  ListItem,
  Button,
  Select,
  MenuItem,
  Box,
  SelectChangeEvent,
  IconButton,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router";
import { AuthorsContext } from "../context/AuthorsContext";
import {
  getBook,
  deleteBook,
  postBookAuthor,
  deleteBookAuthor,
} from "../services/bookService";
import BookInfo from "../models/bookInfo";

const Book = () => {
  const { bookId = "" } = useParams();
  const [book, setBook] = useState<BookInfo>();
  const navigate = useNavigate();

  const [selectedAuthor, setSelectedAuthor] = useState<string>("");

  const authorsContext = useContext(AuthorsContext);

  const authors = authorsContext?.authors || [];

  useEffect(() => {
    const loadBook = async () => {
      const res = await getBook(bookId);
      setBook(res);
    };
    loadBook();
  }, [bookId]);

  const handleDelete = async () => {
    if (!book) return;
    await deleteBook(bookId);
    navigate("/books");
  };

  const handleChangeAuthor = (e: SelectChangeEvent) => {
    setSelectedAuthor(e.target.value);
  };

  const handleAddAuthor = async () => {
    if (!selectedAuthor || !book) return;
    if (book.authors.find((a) => a.author_id === selectedAuthor)) return; // DUPLICATE AUTHOR

    await postBookAuthor(bookId, [selectedAuthor]);

    const addedAuthor = authors.find((a) => a.author_id === selectedAuthor);
    if (!addedAuthor) return;

    const updatedBook = { ...book, authors: [...book.authors, addedAuthor] };
    setBook(updatedBook);
  };

  const handleDeleteAuthor = async (id: string) => {
    if (!book) return;
    await deleteBookAuthor(bookId, [id]);
    const updatedBook = {
      ...book,
      authors: book.authors.filter((a) => a.author_id !== id),
    };
    setBook(updatedBook);
  };

  let element = <></>;

  if (book) {
    element = (
      <>
        <Typography variant="h2" component="h1" sx={{ mb: 2 }}>
          {book.book_name}
        </Typography>
        <Typography variant="subtitle1">Authors:</Typography>
        <List sx={{ maxWidth: "400px" }}>
          {book.authors.map((a) => (
            <ListItem
              divider
              key={a.author_id}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="comments"
                  onClick={() => handleDeleteAuthor(a.author_id)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
                {a.author_id}.
              </Typography>
              &nbsp;
              {a.author_name}
            </ListItem>
          ))}
        </List>
        <Box sx={{ my: 5, display: "flex" }}>
          <Select
            displayEmpty
            value={selectedAuthor}
            onChange={handleChangeAuthor}
          >
            <MenuItem value="">Select Author</MenuItem>
            {authors.map((a) => {
              return (
                <MenuItem key={a.author_id} value={a.author_id}>
                  {a.author_name}
                </MenuItem>
              );
            })}
          </Select>
          <Button variant="contained" onClick={handleAddAuthor}>
            Add Author
          </Button>
        </Box>

        <Button
          startIcon={<DeleteIcon />}
          variant="outlined"
          color="error"
          sx={{ width: "200px", mx: "auto", mt: 1 }}
          onClick={handleDelete}
        >
          Delete Book
        </Button>
      </>
    );
  }

  return <>{element}</>;
};

export default Book;
