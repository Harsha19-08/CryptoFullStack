import React, { useState } from 'react';
import {
  Modal,
  Backdrop,
  Fade,
  AppBar,
  Box,
  Button,
  Tab,
  Tabs,
} from '@mui/material';
import { styled } from '@mui/system';
import Login from './Login';
import Signup from './Signup';
import GoogleButton from 'react-google-button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { CryptoState } from '../../CryptoContext';
import { auth } from '../../Firebase';

// Styled components
const StyledModal = styled(Modal)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledPaper = styled('div')(({ theme }) => ({
  width: 400,
  backgroundColor: theme.palette.mode === 'dark' ? '#121212' : '#fff',
  color: theme.palette.mode === 'dark' ? '#fff' : '#000',
  borderRadius: 10,
  border: '5px solid #51FF0D',
  padding: theme.spacing(3),
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    backgroundColor: '#51FF0D',
  },
  '& .MuiTab-root': {
    color: '#fff',
    '&:hover': {
      color: '#51FF0D',
    },
  },
}));

const GoogleContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  gap: theme.spacing(2),
  fontSize: 20,
  padding: theme.spacing(3),
  paddingTop: 0,
}));

export default function AuthModal() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const { setAlert } = CryptoState();
  const googleProvider = new GoogleAuthProvider();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event, newValue) => setValue(newValue);

  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      setAlert({
        open: true,
        message: `Sign In Successful. Welcome ${res.user.email}`,
        type: 'success',
      });
      handleClose();
    } catch (error) {
      let errorMessage = "An error occurred during Google Sign-In.";
      if (error.code === "auth/popup-closed-by-user") {
        errorMessage = "Google Sign-In popup was closed before completion.";
      }
      setAlert({
        open: true,
        message: errorMessage,
        type: 'error',
      });
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        sx={{
          width: 85,
          height: 38,
          marginLeft: 2,
          backgroundColor: '#51FF0D',
          color: 'black',
          fontWeight: 'bold',
          '&:hover': {
            backgroundColor: '#45E00C',
          },
        }}
        onClick={handleOpen}
      >
        Login
      </Button>

      <StyledModal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <StyledPaper>
            <AppBar
              position="static"
              sx={{ backgroundColor: 'transparent', color: 'white' }}
            >
              <StyledTabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
              >
                <Tab label="Login" />
                <Tab label="Sign Up" />
              </StyledTabs>
            </AppBar>
            {value === 0 && <Login handleClose={handleClose} />}
            {value === 1 && <Signup handleClose={handleClose} />}
            <GoogleContainer>
              <span>OR</span>
              <GoogleButton
                style={{
                  width: '100%',
                  outline: 'none',
                }}
                onClick={signInWithGoogle}
              />
            </GoogleContainer>
          </StyledPaper>
        </Fade>
      </StyledModal>
    </div>
  );
}
