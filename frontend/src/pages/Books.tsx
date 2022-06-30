import BookInfo from '../models/bookInfo';
import { Grid, Typography, Box, TextField, Button } from '@mui/material';
import BookPreview from '../components/Book/BookPreview';
import { useState, useEffect } from 'react';
import {getBooks, postBook} from '../services/bookService';

const Books = () => {
  const [name, setName] = useState('');
  const [books, setBooks] = useState<BookInfo[]>([]);

  useEffect(() => {
    const loadBooks = async () => {
      let res = await getBooks();
      setBooks(res);
    };
    loadBooks();
  }, []);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !books) return;
    const res = await postBook( name, [] );
    setBooks([...books, res[0]]);
  };

  let element: React.ReactNode = books
      .sort((a, b) => parseInt(a.book_id) - parseInt(b.book_id))
      .map((b) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={b.book_id}>
          <BookPreview book={b}></BookPreview>
        </Grid>
      ));

  return (
    <>
      <Typography variant='h2' component='h1'>
        Books
      </Typography>
      <Grid container spacing={2} sx={{ my: 2 }}>
        {element}
      </Grid>
      <Typography variant='h6' sx={{ mb: 1 }}>
        Add Book
      </Typography>
      <form onSubmit={handleCreate}>
        <Box sx={{ display: 'flex' }}>
          <TextField
            required
            variant='filled'
            value={name}
            label='Book Name'
            onChange={(e) => setName(e.target.value)}
          ></TextField>
          <Button variant='contained' type='submit'>
            Add Book
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Books;
