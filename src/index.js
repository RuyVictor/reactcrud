import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
   palette: {
      primary: {
         main: "#fafafa"
                },
      secondary: {
         main: "#FFAB0F"
                 }
            },
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
