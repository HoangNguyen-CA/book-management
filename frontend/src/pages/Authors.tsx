import { useFetch } from 'use-http';
import AuthorInfo from '../models/authorInfo';
import { Grid, Container, Typography } from '@mui/material';
import Author from '../components/Author/Author';

const Authors = () => {
  const { loading, error, data } = useFetch<AuthorInfo[]>('/authors', {}, []);

  let element: React.ReactNode = <></>;
  if (loading) {
    element = <>Loading...</>;
  } else if (error) {
    element = <>Error</>;
  } else if (data) {
    element = data.map((a) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={a.author_id}>
        <Author author={a}></Author>
      </Grid>
    ));
  }

  return (
    <Container fixed>
      <Typography variant='h2' component='h1' sx={{ mt: 4, mb: 3 }}>
        Authors
      </Typography>
      <Grid container spacing={2} sx={{ my: 2 }}>
        {element}
      </Grid>
    </Container>
  );
};

export default Authors;
