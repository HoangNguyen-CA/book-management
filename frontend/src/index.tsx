import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { CssBaseline } from '@mui/material';
import ContextProvider from './context/ContextProvider';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <ContextProvider>
      <App />
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
