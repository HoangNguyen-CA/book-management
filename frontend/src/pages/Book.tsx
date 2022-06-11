import { useParams } from 'react-router';
import { useFetch } from 'use-http';

import { Typography, List, ListItemButton, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import BookInfo from '../models/bookInfo';

const Book = () => {
  const { bookId } = useParams();

  const { data, loading, error } = useFetch<BookInfo>(
    `/api/books/${bookId}`,
    {},
    []
  );

  let element;
  if (loading) {
    element = <Typography>Loading...</Typography>;
  } else if (error) {
    element = <Typography>No book exists</Typography>;
  } else if (data) {
    element = (
      <>
        <Typography variant='h2' component='h1' sx={{ mb: 2 }}>
          {data.book_name}
        </Typography>
        <Typography variant='subtitle1'>Authors:</Typography>
        <List sx={{ maxWidth: '400px' }}>
          {data.authors.map((a) => (
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
