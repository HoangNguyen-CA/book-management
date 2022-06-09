import { Outlet, Link } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
      <div>
        <Link to='/'>Home</Link>
        <Link to='/authors'>Authors</Link>
        <Link to='/books'>Books</Link>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
