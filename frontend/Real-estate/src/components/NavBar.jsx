import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
  Divider
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  const menuItems = [
    { text: 'Home', to: '/' },
    { text: 'Add Property', to: '/add-property' },
    { text: 'Login', to: '/login' },
    { text: 'Sign Up', to: '/signup' }
  ];

  return (
    <>
      <AppBar
        position="static"
        elevation={1}
        sx={{
          backgroundColor: '#ffffff',
          color: 'text.primary',
          px: 2,
        }}
      >
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Mobile Menu Icon */}
          <IconButton
            edge="start"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ display: { xs: 'inline-flex', sm: 'none' }, ml: 1 }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Typography
            component={Link}
            to="/"
            variant="h6"
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
              fontWeight: 'bold',
              flexGrow: { xs: 1, sm: 0 },
              ml: { xs: 2, sm: 0 },
            }}
          >
            MyPropertyApp
          </Typography>

          {/* Desktop Nav Links */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2 }}>
            <Button component={Link} to="/" sx={{ color: 'text.primary' }}>
              Home
            </Button>
            <Button component={Link} to="/addproperty" sx={{ color: 'text.primary' }}>
              Add Property
            </Button>
          </Box>

          {/* Desktop Auth Buttons */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>
            <Button
              component={Link}
              to="/login"
              variant="outlined"
              sx={{
                color: 'primary.main',
                borderColor: 'primary.main',
                '&:hover': {
                  backgroundColor: 'primary.light',
                  borderColor: 'primary.main',
                },
              }}
            >
              Login
            </Button>
            <Button
              component={Link}
              to="/signup"
              variant="contained"
              sx={{
                backgroundColor: 'primary.main',
                color: '#fff',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
              }}
            >
              Sign Up
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" fontWeight="bold" color="primary">
              MyPropertyApp
            </Typography>
          </Box>
          <Divider />
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.text}
                component={Link}
                to={item.to}
                sx={{ '&:hover': { backgroundColor: 'action.hover' } }}
              >
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
