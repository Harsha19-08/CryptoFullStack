import React from 'react';
import { AppBar, Container, MenuItem, Select, ThemeProvider, Toolbar, Typography, createTheme } from '@mui/material';
import { makeStyles } from '@mui/styles'; // Corrected import
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import UserSidebar from './Authentication/UserSidebar';
import AuthModal from './Authentication/AuthModal';

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "white", // Set title text color
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  },
}));

const Header = () => {
  const classes = useStyles();
  const history = useNavigate();
  const { currency, setCurrency, user } = CryptoState();
  console.log(currency);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#000", // Set to black for header background
      },
      text: {
        primary: "#fff", // White text
      },
      mode: "dark", // Updated to 'mode' instead of 'type'
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="static" style={{ backgroundColor: darkTheme.palette.primary.main }}>
        <Container>
          <Toolbar>
            <Typography
              onClick={() => history("/")}
              className={classes.title}
              variant="h6"
            >
              Just Crypto
            </Typography>
            <Select
              variant="outlined"
              style={{
                width: 100,
                height: 40,
                marginLeft: 15,
                color: "white", // Ensures dropdown text is white
                backgroundColor: "#333", // Dropdown background color
              }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="INR">INR</MenuItem>
            </Select>
            {user ? <UserSidebar /> : <AuthModal />}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
