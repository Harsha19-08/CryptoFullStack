import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import CryptoContext from './CryptoContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import "react-alice-carousel/lib/alice-carousel.css";

// Create a theme (you can customize this theme as needed)
const theme = createTheme();

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>  {/* Wrap the app with ThemeProvider */}
      <CryptoContext>
        <App />
      </CryptoContext>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
