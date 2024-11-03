import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Avatar,
  Grid,
  Link,
  InputAdornment,
  IconButton
} from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f4f6f8',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 8,
  },
});

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [lastToastTime, setLastToastTime] = useState(0);
  const toastCooldown = 3000; // 3 seconds cooldown

  const showToast = (type, message) => {
    const now = Date.now();
    if (now - lastToastTime > toastCooldown) {
      setLastToastTime(now);
      if (type === 'error') {
        toast.error(message);
      } else if (type === 'success') {
        toast.success(message);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password || !confirmPassword) {
      showToast('error', 'Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      showToast('error', 'Passwords do not match.');
      return;
    }
   
    //Hàm Fetch API forgot password 
    const requestData = {
      email: email,
      password: password
    };

    console.log('Request payload:', requestData);

    try {
      const response = await fetch('https://kdosdreapiservice.azurewebsites.net/api/Account/ResetPassword', {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      });

      console.log('Response status:', response.status);

      if (response.ok) {
        showToast('success', 'Password reset successfully!');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        const errorData = await response.json();
        console.log('Error response:', errorData);
        showToast('error', errorData.message || 'Failed to reset password');
      }
    } catch (error) {
      console.error('Reset password error:', error);
      showToast('error', 'An error occurred while resetting password');
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleForgotPasswordClick = () => {
    navigate('/login'); 
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Paper
            elevation={6}
            sx={{
              padding: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              borderRadius: 2,
              background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
              width: '100%',
              boxShadow: '0 8px 40px -12px rgba(0,0,0,0.3)',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main', width: 56, height: 56 }}>
              <LockResetIcon fontSize="large" />
            </Avatar>
            <Typography component="h1" variant="h4" sx={{ mb: 3, color: 'primary.main', textAlign: 'center' }}>
              Reset Your Password
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="New Password"
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePasswordVisibility}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm New Password"
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                variant="outlined"
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 2,
                  mb: 2,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  borderRadius: 2,
                  boxShadow: '0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.2s',
                  '&:hover': {
                    boxShadow: '0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)',
                    transform: 'translateY(-1px)',
                  },
                }}
              >
                Reset Password
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link to="/login" variant="body2" sx={{ color: 'primary.main', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }} onClick={handleForgotPasswordClick}>
                    Remember your password? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Box>
        <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      </Container>
    </ThemeProvider>
  );
}

export default ForgotPassword;