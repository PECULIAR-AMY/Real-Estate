import React, { useState } from 'react';
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Link
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    axios.post("http://localhost:5000/add-auth_users", formData)
      .then((res) => {
        console.log(res.data);
        navigate('/Home'); 
      })
      .catch((err) => {
        console.error(err);
        alert("Signup failed. Please try again.");
      });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f9fafb',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: '100%',
          maxWidth: 400,
          p: 4,
          borderRadius: 3,
          boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
        }}
      >
        <Typography
          variant="h5"
          align="center"
          color="primary"
          fontWeight="bold"
          mb={3}
        >
          Create an Account
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <TextField
            label="Full Name"
            name="name"
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            variant="outlined"
            value={formData.confirmPassword}
            onChange={handleChange}
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
              fontWeight: 'bold',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            }}
          >
            Sign Up
          </Button>
        </Box>

        <Typography
          variant="body2"
          align="center"
          mt={3}
          color="text.secondary"
        >
          Already have an account?{' '}
          <Link href="/login" underline="hover" color="primary">
            Login
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Signup;