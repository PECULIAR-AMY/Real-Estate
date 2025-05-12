import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Box } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login info:', { email, password });
    // Add authentication logic here
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f7fafc',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 380,
          borderRadius: 3,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        }}
      >
        <Typography
          variant="h5"
          align="center"
          fontWeight="bold"
          color="primary"
          mb={3}
        >
          Login to Your Account
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              mt: 1,
              backgroundColor: 'primary.main',
              color: '#fff',
              textTransform: 'none',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            }}
          >
            Login
          </Button>
        </Box>

        <Typography
          variant="body2"
          align="center"
          mt={3}
          color="text.secondary"
        >
          Don’t have an account?{' '}
          <a href="/signup" style={{ color: '#1976d2', textDecoration: 'none' }}>
            Sign Up
          </a>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;
