import { Grid, Typography, TextField, Box, Button } from '@mui/material';
import Author from '../components/Author/Author';
import React, { useContext, useState } from 'react';
import { AuthorsContext } from '../context/AuthorsContext';

const Authors = () => {
  const data = useContext(AuthorsContext);
  const [name, setName] = useState('');

  let element: React.ReactNode = <></>;

  if (data) {
    const { authors, loading, error } = data;
    if (loading) {
      element = <>Loading...</>;
    } else if (error) {
      element = <>Error</>;
    } else if (authors) {
      element = authors.map((a) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={a.author_id}>
          <Author author={a}></Author>
        </Grid>
      ));
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (data) {
      const { createAuthor } = data;
      createAuthor(name);
    }
  };

  return (
    <>
      <Typography variant='h2' component='h1'>
        Authors
      </Typography>
      <Grid container spacing={2} sx={{ my: 2 }}>
        {element}
      </Grid>
      <Typography variant='h6' sx={{ mb: 1 }}>
        Add Author
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex' }}>
          <TextField
            variant='filled'
            value={name}
            label="Author's Name"
            onChange={(e) => setName(e.target.value)}
          ></TextField>
          <Button variant='contained' type='submit'>
            Add Author
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Authors;
