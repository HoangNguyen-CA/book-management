import { Outlet, Link as RouterLink } from 'react-router-dom';
import { AppBar, Link, Toolbar, Container } from '@mui/material';

const MainLayout = () => {
  return (
    <>
      <AppBar position='static'>
        <Toolbar
          sx={{
            typography: 'body1',
            '& > :not(style) + :not(style)': {
              ml: 2,
            },
          }}
        >
          <Link to='/' component={RouterLink} color='inherit'>
            Home
          </Link>
          <Link to='/authors' component={RouterLink} color='inherit'>
            Authors
          </Link>
          <Link to='/books' component={RouterLink} color='inherit'>
            Books
          </Link>
        </Toolbar>
      </AppBar>
      <Container fixed sx={{ py: 4 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;
