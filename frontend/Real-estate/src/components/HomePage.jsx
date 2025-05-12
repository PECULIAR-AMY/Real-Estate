import React, { useState } from 'react';
import {
  Button,
  Menu,
  MenuItem,
  Typography,
  Box,
  Paper,
  Container
} from '@mui/material';
import { ArrowDropDown } from '@mui/icons-material';

const Home = () => {
  const [anchorElType, setAnchorElType] = useState(null);
  const [anchorElPrice, setAnchorElPrice] = useState(null);
  const [type, setType] = useState('Rent/Sales');
  const [price, setPrice] = useState('Price');

  const handleTypeClick = (event) => setAnchorElType(event.currentTarget);
  const handlePriceClick = (event) => setAnchorElPrice(event.currentTarget);

  const handleTypeSelect = (value) => {
    setType(value);
    setAnchorElType(null);
  };

  const handlePriceSelect = (value) => {
    setPrice(value);
    setAnchorElPrice(null);
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          height: 280,
          background: 'linear-gradient(to right, #6366f1, #a855f7, #ec4899)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
        }}
      >
        <Typography variant="h3" fontWeight="bold">
          Welcome to <span style={{ color: '#facc15' }}>MyPropertyApp</span>
        </Typography>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 6 }}>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            borderRadius: 3,
            mb: 4,
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            Explore Properties
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {/* Type Dropdown */}
            <Box>
              <Button
                variant="outlined"
                onClick={handleTypeClick}
                endIcon={<ArrowDropDown />}
                sx={{
                  color: 'primary.main',
                  borderColor: 'primary.main',
                  textTransform: 'none',
                  fontWeight: 600,
                  borderRadius: 2
                }}
              >
                {type}
              </Button>
              <Menu
                anchorEl={anchorElType}
                open={Boolean(anchorElType)}
                onClose={() => setAnchorElType(null)}
              >
                <MenuItem onClick={() => handleTypeSelect('Rent')}>Rent</MenuItem>
                <MenuItem onClick={() => handleTypeSelect('Sales')}>Sales</MenuItem>
              </Menu>
            </Box>

            {/* Price Dropdown */}
            <Box>
              <Button
                variant="outlined"
                onClick={handlePriceClick}
                endIcon={<ArrowDropDown />}
                sx={{
                  color: 'primary.main',
                  borderColor: 'primary.main',
                  textTransform: 'none',
                  fontWeight: 600,
                  borderRadius: 2
                }}
              >
                {price}
              </Button>
              <Menu
                anchorEl={anchorElPrice}
                open={Boolean(anchorElPrice)}
                onClose={() => setAnchorElPrice(null)}
              >
                <MenuItem onClick={() => handlePriceSelect('High')}>High</MenuItem>
                <MenuItem onClick={() => handlePriceSelect('Low')}>Low</MenuItem>
              </Menu>
            </Box>
          </Box>
        </Paper>

        {/* Listings Section */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr 1fr',
              md: '1fr 1fr 1fr',
            },
            gap: 3,
            pb: 6
          }}
        >
          <Paper
            elevation={1}
            sx={{
              p: 4,
              textAlign: 'center',
              color: 'text.secondary',
              borderRadius: 3,
              border: '1px solid #e0e0e0',
              transition: 'all 0.3s',
              '&:hover': {
                boxShadow: 4,
              }
            }}
          >
            <Typography variant="subtitle1" fontWeight="medium">
              Property listings will be displayed here.
            </Typography>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
