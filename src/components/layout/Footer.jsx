// src/components/layout/Footer.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Box, Container, Typography, Grid, Link } from '@mui/material';
import { selectCurrentUser, selectCurrentToken } from '../../store/slices/userSlice';

const Footer = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const isAuthenticated = Boolean(user && token);

  const linkStyle = {
    textDecoration: 'none',
    color: '#ddd',
    fontSize: '15px',
    '&:hover': {
      color: '#fff',
      textDecoration: 'underline', // Optional: looks nice on hover (Amazon style)
    },
  };

  return (
    <Box
      sx={{
        backgroundColor: '#232F3E', // Amazon-like dark footer
        mt: 5,
        py: 5,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          {/* Shop Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#fff' }}>
              ShopSmart
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link component={NavLink} to="/" sx={linkStyle}>
                Home
              </Link>
              <Link component={NavLink} to="/products" sx={linkStyle}>
                All Products
              </Link>
              <Link component={NavLink} to="/best-sellers" sx={linkStyle}>
                Best Sellers
              </Link>
              <Link component={NavLink} to="/new-items" sx={linkStyle}>
                New Items
              </Link>
              <Link component={NavLink} to="/products?category=electronics" sx={linkStyle}>
                Categories
              </Link>
            </Box>
          </Grid>

          {/* Company Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#fff' }}>
              Company
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link component={NavLink} to="/about" sx={linkStyle}>
                About
              </Link>
              <Link component={NavLink} to="/contact" sx={linkStyle}>
                Contact
              </Link>
              <Link component={NavLink} to="/help" sx={linkStyle}>
                Help
              </Link>
              {isAuthenticated && (
                <Link component={NavLink} to="/orders" sx={linkStyle}>
                  My Orders
                </Link>
              )}
            </Box>
          </Grid>

          {/* Customer Service */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: '#fff' }}>
              Customer Service
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link component={NavLink} to="/return-refund-policy" sx={linkStyle}>
                Return and Refund Policy
              </Link>
              <Link component={NavLink} to="/intellectual-property-policy" sx={linkStyle}>
                Intellectual Property Policy
              </Link>
              <Link component={NavLink} to="/shipping-info" sx={linkStyle}>
                Shipping Info
              </Link>
              <Link component={NavLink} to="/report-suspicious-activity" sx={linkStyle}>
                Report Suspicious Activity
              </Link>
            </Box>
          </Grid>

          {/* Branding */}
          <Grid item xs={12}>
            <Box
              sx={{
                mt: 4,
                borderTop: '1px solid #3A4553',
                pt: 2,
                textAlign: 'center',
              }}
            >
              <Typography variant="body2" sx={{ color: '#aaa' }}>
                © {new Date().getFullYear()} ShopSmart. All rights reserved.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
