import { useParams } from 'react-router';
import { useFetch } from 'use-http';
import { Typography, List, ListItemButton } from '@mui/material';
import BookInfo from '../models/bookInfo';
import { useEffect, useState } from 'react';

const Book = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState<BookInfo>();

  const { data, loading, error, get, del } = useFetch<BookInfo>('/api');

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
      await del(`/books/${book.book_id}}`);
    } catch (e) {
      console.log('Error when deleting book: ', e);
    }
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
      </>
    );
  }

  return <>{element}</>;
};

export default Book;
