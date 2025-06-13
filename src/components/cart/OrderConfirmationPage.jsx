import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Breadcrumbs, 
  Link,
  Paper,
  Grid,
  Divider
} from '@mui/material';
import { 
  CheckCircle, 
  ShoppingBag, 
  Receipt 
} from '@mui/icons-material';

const OrderConfirmationPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
        <Link 
          underline="hover" 
          color="inherit" 
          component={RouterLink} 
          to="/"
          sx={{ 
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' }
          }}
        >
          Home
        </Link>
        <Link 
          underline="hover" 
          color="inherit" 
          component={RouterLink} 
          to="/cart"
          sx={{ 
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' }
          }}
        >
          Cart
        </Link>
        <Typography color="text.primary">Order Confirmation</Typography>
      </Breadcrumbs>

      <Paper
        elevation={0}
        sx={{
          textAlign: 'center',
          py: 6,
          px: 4,
          backgroundColor: '#f0fff4',
          borderRadius: 3,
          border: '2px solid #9ae6b4',
        }}
      >
        <CheckCircle
          sx={{
            fontSize: 80,
            color: '#38a169',
            mb: 3,
          }}
        />
        
        <Typography 
          variant="h3" 
          gutterBottom
          sx={{
            fontWeight: 700,
            color: '#2d3748',
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            mb: 2,
          }}
        >
          Order Confirmed!
        </Typography>
        
        <Typography 
          variant="h6" 
          color="text.secondary" 
          paragraph
          sx={{
            maxWidth: 500,
            mx: 'auto',
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            lineHeight: 1.6,
            mb: 4,
          }}
        >
          Thank you for your purchase! Your order has been successfully placed and you'll receive an email confirmation with order details shortly.
        </Typography>

        <Divider sx={{ my: 4, maxWidth: 200, mx: 'auto' }} />

        <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              size="large"
              startIcon={<Receipt />}
              onClick={() => navigate('/orders')}
              fullWidth
              sx={{
                backgroundColor: '#3182ce',
                color: 'white',
                fontWeight: 600,
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                boxShadow: '0 4px 12px rgba(49, 130, 206, 0.4)',
                '&:hover': {
                  backgroundColor: '#2c5aa0',
                  boxShadow: '0 6px 20px rgba(49, 130, 206, 0.5)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              View My Orders
            </Button>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Button
              variant="outlined"
              size="large"
              startIcon={<ShoppingBag />}
              component={RouterLink}
              to="/products"
              fullWidth
              sx={{
                borderColor: '#38a169',
                color: '#38a169',
                fontWeight: 600,
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                '&:hover': {
                  borderColor: '#2f855a',
                  backgroundColor: '#f0fff4',
                },
              }}
            >
              Continue Shopping
            </Button>
          </Grid>
        </Grid>

        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{
            fontStyle: 'italic',
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          }}
        >
          🎉 Happy shopping! Your order is on its way.
        </Typography>
      </Paper>
    </Container>
  );
};

export default OrderConfirmationPage;