import { Paper, Typography, Stack } from '@mui/material';
import BookInfo from '../../models/bookInfo';

interface Props {
  book: BookInfo;
}

const Book = ({ book }: Props) => {
  return (
    <Paper
      variant='outlined'
      elevation={2}
      sx={{
        p: 2,
        'text-align': 'center',
        color: 'deepPurple-500',
      }}
    >
      <Stack>
        <Typography variant='body1'> {book.book_id}</Typography>

        <Typography variant='h4'> {book.book_name}</Typography>
      </Stack>
    </Paper>
  );
};

export default Book;
