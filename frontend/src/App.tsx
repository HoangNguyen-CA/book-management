import MainLayout from './components/MainLayout';
import Authors from './pages/Authors';
import Books from './pages/Books';
import Book from './pages/Book';
import Home from './pages/Home';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />}></Route>
          <Route path='/authors' element={<Authors />}></Route>
          <Route path='/books'>
            <Route index element={<Books />}></Route>
            <Route path=':bookId' element={<Book />}></Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
