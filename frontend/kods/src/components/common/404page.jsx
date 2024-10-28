import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      <Container maxWidth="md">
        <Box textAlign="center">
          <Typography variant="h1" color="primary" gutterBottom>
            404
          </Typography>
          <Typography variant="h5" color="text.secondary" paragraph>
            Sorry, the page you are looking for does not exist.
          </Typography>
          <Button
            variant="contained"
            startIcon={<HomeIcon />}
            onClick={() => navigate('/')}
            sx={{ mt: 3 }}
          >
            Go to Homepage
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
