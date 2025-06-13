import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Typography, Button, Breadcrumbs, Link } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

const OrderConfirmationPage = () => (
  <Container maxWidth="md" sx={{ py: 4 }}>
    <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
      <Link underline="hover" color="inherit" component={RouterLink} to="/">Home</Link>
      <Typography color="text.primary">Order Confirmation</Typography>
    </Breadcrumbs>
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>Order Confirmed!</Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Thank you for your purchase. You'll receive an email with order details soon.
      </Typography>
      <Button variant="contained" color="primary" component={RouterLink} to="/products" startIcon={<ArrowBack />} sx={{ mt: 2 }}>
        Continue Shopping
      </Button>
    </Box>
  </Container>
);

export default OrderConfirmationPage;