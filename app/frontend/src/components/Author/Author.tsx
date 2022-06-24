import { Paper, Typography, Stack, Button } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material/';
import AuthorInfo from '../../models/authorInfo';

interface Props {
  author: AuthorInfo;
  onDelete: (id: string) => void;
}

const Book = ({ author, onDelete }: Props) => {
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
        <Typography variant='body1'> {author.author_id}</Typography>

        <Typography variant='h4'> {author.author_name}</Typography>
        <Button
          startIcon={<DeleteIcon />}
          variant='outlined'
          color='error'
          sx={{ width: '50%', mx: 'auto', mt: 1 }}
          onClick={() => onDelete(author.author_id)}
        >
          Delete
        </Button>
      </Stack>
    </Paper>
  );
};

export default Book;
