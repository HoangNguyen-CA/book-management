import { useParams } from 'react-router';
import { useFetch } from 'use-http';
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
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import BookInfo from '../models/bookInfo';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthorsContext } from '../context/AuthorsContext';

const Book = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState<BookInfo>();
  const navigate = useNavigate();
  const { loading, error, get, del, post } = useFetch<BookInfo>(`${process.env.REACT_APP_API_URL}/api`, {
    headers: { 'Content-Type': 'application/json' },
  });
  const [selectedAuthor, setSelectedAuthor] = useState<string>('');

  const authorsContext = useContext(AuthorsContext);

  const authors = authorsContext?.authors || [];

  useEffect(() => {
    const loadBook = async () => {
      const res = await get(`/books/${bookId}`);
      setBook(res);
    };
    loadBook();
  }, []);

  const handleDelete = async () => {
    if (!book) return;
    await del(`/books/${book.book_id}`);
    navigate('/books');
  };

  const handleChangeAuthor = (e: SelectChangeEvent) => {
    setSelectedAuthor(e.target.value);
  };

  const handleAddAuthor = async () => {
    if (!selectedAuthor || !book) return;
    if (book.authors.find((a) => a.author_id === selectedAuthor)) return; // DUPLICATE AUTHOR

    await post(`/books/${bookId}/authors`, {
      authorIds: [selectedAuthor],
    });

    const addedAuthor = authors.find((a) => a.author_id === selectedAuthor);
    if (!addedAuthor) return;

    const updatedBook = { ...book, authors: [...book.authors, addedAuthor] };
    setBook(updatedBook);
  };

  const handleDeleteAuthor = async (id: string) => {
    if (!book) return;
    await del(`/books/${bookId}/authors`, { authorIds: [id], hello: 'HELLO' });
    const updatedBook = {
      ...book,
      authors: book.authors.filter((a) => a.author_id !== id),
    };
    setBook(updatedBook);
  };

  let element;
  if (loading) {
    element = <Typography>Loading...</Typography>;
  } else if (error) {
    element = <Typography>No book exists</Typography>;
  } else if (book) {
    element = (
      <>
        <Typography variant='h2' component='h1' sx={{ mb: 2 }}>
          {book.book_name}
        </Typography>
        <Typography variant='subtitle1'>Authors:</Typography>
        <List sx={{ maxWidth: '400px' }}>
          {book.authors.map((a) => (
            <ListItem
              divider
              key={a.author_id}
              secondaryAction={
                <IconButton
                  edge='end'
                  aria-label='comments'
                  onClick={() => handleDeleteAuthor(a.author_id)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
                {a.author_id}.
              </Typography>
              &nbsp;
              {a.author_name}
            </ListItem>
          ))}
        </List>
        <Box sx={{ my: 5, display: 'flex' }}>
          <Select
            displayEmpty
            value={selectedAuthor}
            onChange={handleChangeAuthor}
          >
            <MenuItem value=''>Select Author</MenuItem>
            {authors.map((a) => {
              return (
                <MenuItem key={a.author_id} value={a.author_id}>
                  {a.author_name}
                </MenuItem>
              );
            })}
          </Select>
          <Button variant='contained' onClick={handleAddAuthor}>
            Add Author
          </Button>
        </Box>

        <Button
          startIcon={<DeleteIcon />}
          variant='outlined'
          color='error'
          sx={{ width: '200px', mx: 'auto', mt: 1 }}
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
