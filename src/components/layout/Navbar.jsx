// src/components/layout/Navbar.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box, Menu, MenuItem } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

const Navbar = () => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const categories = ['Electronics', 'Jewelry', "Men's Clothing", "Women's Clothing"];

  const navLinkStyle = ({ isActive }) => ({
    fontWeight: 'bold',
    color: '#000000',
    textTransform: 'none',
    fontSize: '16px',
    textDecoration: 'none',
    margin: '0 10px', // spacing between links
  });

  return (
    <>
      <AppBar
        position="sticky"
        color="default"
        elevation={2}
        sx={{
          backgroundColor: '#ffe6f0', // light pink background
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        <Toolbar sx={{ py: 1 }}>
          {/* ALL LINKS */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexGrow: 1,
              alignItems: 'center',
              flexWrap: 'wrap', // responsive on small screens
            }}
          >
            <Button color="inherit" component={NavLink} to="/" style={navLinkStyle}>
              Home
            </Button>
            <Button color="inherit" component={NavLink} to="/products" style={navLinkStyle}>
              All Products
            </Button>
            <Button
              color="inherit"
              endIcon={<ExpandMore />}
              onClick={handleMenuOpen}
              sx={{
                textTransform: 'none',
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#000000',
                margin: '0 10px',
              }}
            >
              Categories
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isMenuOpen}
              onClose={handleMenuClose}
            >
              {categories.map((category) => (
                <MenuItem
                  key={category}
                  onClick={() => {
                    handleMenuClose();
                    navigate(`/products?category=${encodeURIComponent(category.toLowerCase())}`);
                  }}
                >
                  {category}
                </MenuItem>
              ))}
            </Menu>
            <Button color="inherit" component={NavLink} to="/best-sellers" style={navLinkStyle}>
              Best Sellers
            </Button>
            <Button color="inherit" component={NavLink} to="/new-items" style={navLinkStyle}>
              New Items
            </Button>
            <Button color="inherit" component={NavLink} to="/contact" style={navLinkStyle}>
              Contact
            </Button>
            <Button color="inherit" component={NavLink} to="/about" style={navLinkStyle}>
              About
            </Button>
            <Button color="inherit" component={NavLink} to="/help" style={navLinkStyle}>
              Help
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
