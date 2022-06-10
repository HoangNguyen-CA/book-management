import { useFetch } from 'use-http';
import BookInfo from '../models/bookInfo';
import { Grid, Container } from '@mui/material';
import Book from '../components/Book/Book';

const Books = () => {
  const { loading, error, data } = useFetch<BookInfo[]>('/books', {}, []);

  let element: React.ReactNode = <></>;
  if (loading) {
    element = <>Loading...</>;
  } else if (error) {
    element = <>Error</>;
  } else if (data) {
    element = data.map((b) => (
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Book book={b} key={b.book_id}></Book>
      </Grid>
    ));
  }

  return (
    <Container fixed>
      <Grid container spacing={2} sx={{ my: 2 }}>
        {element}
      </Grid>
    </Container>
  );
};

export default Books;
