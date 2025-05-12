import React, { useState } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  Typography,
  Paper,
  Box
} from '@mui/material';

const AddProperty = () => {
  const [property, setProperty] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
    type: '',
    image: ''
  });

  const handleChange = (e) => {
    setProperty({
      ...property,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Property Submitted:', property);
    // You can send this data to an API here
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#f5f7fa',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 500,
          borderRadius: 3,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}
      >
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{ color: '#1976d2', fontWeight: 600 }}
        >
          Add New Property
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Property Title"
            name="title"
            value={property.title}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            name="description"
            value={property.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Location"
            name="location"
            value={property.location}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Price ($)"
            name="price"
            type="number"
            value={property.price}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="Property Type"
            name="type"
            select
            value={property.type}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          >
            <MenuItem value="Rent">Rent</MenuItem>
            <MenuItem value="Sale">Sale</MenuItem>
          </TextField>
          <TextField
            label="Image URL"
            name="image"
            value={property.image}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />

          {property.image && (
            <Box
              component="img"
              src={property.image}
              alt="Property Preview"
              sx={{
                width: '100%',
                height: 200,
                objectFit: 'cover',
                borderRadius: 2,
                mb: 2,
                border: '1px solid #ccc'
              }}
            />
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ bgcolor: '#1976d2', py: 1.2, fontWeight: 600 }}
          >
            Add Property
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default AddProperty;
