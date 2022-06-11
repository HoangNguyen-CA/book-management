import { useParams } from 'react-router';
import { useFetch } from 'use-http';

import { Typography } from '@mui/material';
import BookInfo from '../models/bookInfo';
import AuthorInfo from '../models/authorInfo';

const Book = () => {
  const { bookId } = useParams();

  const { data, loading, error } = useFetch<{
    book: BookInfo;
    authors: AuthorInfo[];
  }>(`/api/books/${bookId}`, {}, []);

  return (
    <>
      {error && <Typography>No book exists</Typography>}
      {loading && 'Loading...'}
      <Typography>{}</Typography>
      <Typography>{data?.book?.book_name}</Typography>
    </>
  );
};

export default Book;
