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

  const categories = ['electronics', 'jewelery', "men's clothing", "women's clothing"];

  const navLinkStyle = ({ isActive }) => ({
    fontWeight: 'bold',
    color: '#000000',
    textTransform: 'none',
    fontSize: '16px',
    textDecoration: 'none',
    margin: '0 10px',
  });

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          top: '60px', // position below header
          backgroundColor: '#ffe6f0',
          borderBottom: '1px solid #e0e0e0',
          width: '100%',
          zIndex: (theme) => theme.zIndex.appBar + 1, // below header
        }}
      >
        <Toolbar sx={{ py: 1 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              flexGrow: 1,
              alignItems: 'center',
              flexWrap: 'wrap',
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
                    navigate(`/products?category=${encodeURIComponent(category)}`);
                  }}
                >
                  {category.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
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
