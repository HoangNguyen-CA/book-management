import { Paper, Typography, Stack } from '@mui/material';
import BookInfo from '../../models/bookInfo';

interface Props {
  book: BookInfo;
}

const BookPreview = ({ book }: Props) => {
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
