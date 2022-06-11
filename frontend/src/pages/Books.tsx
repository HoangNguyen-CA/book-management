import { useFetch } from 'use-http';
import BookInfo from '../models/bookInfo';
import { Grid, Container, Typography } from '@mui/material';
import BookPreview from '../components/Book/BookPreview';

const Books = () => {
  const { loading, error, data } = useFetch<BookInfo[]>('/books', {}, []);

  let element: React.ReactNode = <></>;
  if (loading) {
    element = <>Loading...</>;
  } else if (error) {
    element = <>Error</>;
  } else if (data) {
    element = data.map((b) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={b.book_id}>
        <BookPreview book={b}></BookPreview>
      </Grid>
    ));
  }

  return (
    <Container fixed>
      <Typography variant='h2' component='h1' sx={{ mt: 4, mb: 3 }}>
        Books
      </Typography>
      <Grid container spacing={2}>
        {element}
      </Grid>
    </Container>
  );
};

export default Books;
