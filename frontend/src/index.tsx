import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App';
import MainLayout from './components/MainLayout';
import Authors from './pages/Authors';
import Books from './pages/Books';
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path='/' element={<App />}></Route>
          <Route path='/authors' element={<Authors />}></Route>
          <Route path='/books' element={<Books />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
