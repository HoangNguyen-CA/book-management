import { Paper, Typography, Stack } from '@mui/material';
import AuthorInfo from '../../models/authorInfo';

interface Props {
  author: AuthorInfo;
}

const Book = ({ author }: Props) => {
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
        <Typography variant='body1'> {author.author_id}</Typography>

        <Typography variant='h4'> {author.author_name}</Typography>
      </Stack>
    </Paper>
  );
};

export default Book;