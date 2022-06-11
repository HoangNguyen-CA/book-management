import { Paper, Typography, Stack } from '@mui/material';
import BookInfo from '../../models/bookInfo';
import { useNavigate } from 'react-router';

interface Props {
  book: BookInfo;
}

const BookPreview = ({ book }: Props) => {
  const navigate = useNavigate();
  const authors =
    book.authors.length > 0
      ? book.authors.map((a) => a.author_name).join(', ')
      : 'No author';
  return (
    <Paper
      variant='outlined'
      sx={{
        p: 2,
        textAlign: 'center',
        color: 'deepPurple-500',
      }}
      onClick={() => navigate(`/books/${book.book_id}`)}
    >
      <Stack>
        <Typography variant='caption'> {book.book_id}</Typography>
        <Typography variant='h4'> {book.book_name}</Typography>
        <Typography variant='subtitle1'>Written by: {authors}</Typography>
      </Stack>
    </Paper>
  );
};

export default BookPreview;
