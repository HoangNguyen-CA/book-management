import { useParams } from 'react-router';
import { useFetch } from 'use-http';
import {
  Typography,
  List,
  ListItemButton,
  Button,
  Select,
  MenuItem,
  Box,
  SelectChangeEvent,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import BookInfo from '../models/bookInfo';
import AuthorInfo from '../models/authorInfo';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthorsContext } from '../context/AuthorsContext';

const Book = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState<BookInfo>();
  const navigate = useNavigate();
  const { loading, error, get, del } = useFetch<BookInfo>('/api');
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
    try {
      await del(`/books/${book.book_id}`);
      navigate('/books');
    } catch (e) {
      console.log('Error when deleting book: ', e);
    }
  };

  const handleChangeAuthor = (e: SelectChangeEvent) => {
    setSelectedAuthor(e.target.value);
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
            <>
              <ListItemButton divider>{a.author_name}</ListItemButton>
            </>
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
              return <MenuItem value={a.author_id}>{a.author_name}</MenuItem>;
            })}
          </Select>
          <Button variant='contained'>Add Author</Button>
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
