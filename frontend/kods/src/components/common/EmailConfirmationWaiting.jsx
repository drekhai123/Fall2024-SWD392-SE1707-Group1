import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { Email as EmailIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import { VerifyAccount } from '../api/AccountApi';
import { Link, useNavigate } from 'react-router-dom';

export default function EmailConfirmationWaiting() {
  const [countdown, setCountdown] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (isResendDisabled && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    if (countdown === 0) {
      setIsResendDisabled(false);
      setCountdown(60);
    }

    return () => clearInterval(timer);
  }, [isResendDisabled, countdown]);

  const handleResendEmail = async () => {
    try {
      const accountId = sessionStorage.getItem('accountId');
      console.log("Sending accountId:", accountId);
      const response = await VerifyAccount(accountId);
      console.log("Response from VerifyAccount:", response);
      if (response.status >= 200 && response.status < 300) {
        console.log("Verification email resent successfully!");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Error resending verification email:", error);
    }
    setIsResendDisabled(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleGoBackToLogin = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = (confirmed) => {
    setOpenDialog(false);
    if (confirmed) {
      navigate('/login');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        padding: 2
      }}
    >
      <Card sx={{ maxWidth: 400, width: '100%', textAlign: 'center', mb: 2 }}>
        <CardContent>
          <EmailIcon sx={{ fontSize: 70, color: 'primary.main', mb: 2 }} />
          <Typography variant="h4" component="h1" gutterBottom>
            Verify Your Email
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph sx={{ fontSize: '1.2rem' }}>
            Thank you for registering! We've sent a verification email to your inbox.
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph sx={{ fontSize: '1.1rem' }}>
            Please check your email and click on the verification link to complete your registration.
          </Typography>

        {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            <CheckCircleIcon color="success" sx={{ mr: 1 }} />
            <Typography variant="body2" color="success.main">
              Registration successful
            </Typography>
          </Box> */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            <Button
              variant="outlined"
              onClick={handleGoBackToLogin}
              sx={{ mt: 2, fontSize: '1rem' }}
            >
              Go Back to Login
            </Button>
          </Box>
          <Button
            variant="contained"
            onClick={handleResendEmail}
            disabled={isResendDisabled}
            aria-label={isResendDisabled ? `Resend email in ${countdown} seconds` : "Resend verification email"}
            sx={{ mb: 2, fontSize: '1rem' }}
          >
            {isResendDisabled ? (
              <React.Fragment>
                Resend in {countdown}s
                <CircularProgress size={24} sx={{ ml: 1, color: 'inherit' }} />
              </React.Fragment>
            ) : (
              "Resend Verification Email"
            )}
          </Button>
        </CardContent>
        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.9rem' }}>
            Didn't receive the email? Check your spam folder or{' '}
            <Link to="/contact" style={{ color: 'inherit', textDecoration: 'underline' }}>
              contact support
            </Link>.
          </Typography>
      </Card>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Verification email resent successfully!
        </Alert>
      </Snackbar>
      <Dialog
        open={openDialog}
        onClose={() => handleDialogClose(false)}
      >
        <DialogTitle>Confirm Navigation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Have you verified your email? If not, please check your inbox and verify your email before proceeding.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleDialogClose(true)} color="primary" autoFocus>
            Yes, I have verified
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}