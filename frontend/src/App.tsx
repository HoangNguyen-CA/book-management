import MainLayout from './components/MainLayout';
import Authors from './pages/Authors';
import Books from './pages/Books';
import Home from './pages/Home';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<Home />}></Route>
          <Route path='/authors' element={<Authors />}></Route>
          <Route path='/books' element={<Books />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
