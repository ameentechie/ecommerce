import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Box, 
  Divider,
  Chip,
  CircularProgress
} from '@mui/material';
import { ShoppingCart, CreditCard } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';

const CartSummary = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, getItemCount } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  const subtotal = getTotalPrice();
  const shipping = subtotal > 100 ? 0 : 9.99; // Free shipping over $100
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      // Simulate checkout preparation
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/checkout');
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  return (
    <Card 
      sx={{ 
        borderRadius: 3,
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        border: '1px solid #e2e8f0',
        position: 'sticky',
        top: 20,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: '#2d3748',
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            mb: 3,
          }}
        >
          Order Summary
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Chip
            icon={<ShoppingCart />}
            label={`${getItemCount()} ${getItemCount() === 1 ? 'item' : 'items'}`}
            variant="outlined"
            sx={{
              borderColor: '#3182ce',
              color: '#3182ce',
              fontWeight: 600,
            }}
          />
        </Box>

        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body1" color="text.secondary">
              Subtotal
            </Typography>
            <Typography variant="body1" fontWeight={500}>
              ${subtotal.toFixed(2)}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body1" color="text.secondary">
              Shipping
            </Typography>
            <Typography 
              variant="body1" 
              fontWeight={500}
              color={shipping === 0 ? 'success.main' : 'text.primary'}
            >
              {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body1" color="text.secondary">
              Tax
            </Typography>
            <Typography variant="body1" fontWeight={500}>
              ${tax.toFixed(2)}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: '#2d3748',
              fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            }}
          >
            Total
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: '#e53e3e',
              fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            }}
          >
            ${total.toFixed(2)}
          </Typography>
        </Box>

        {subtotal > 0 && subtotal < 100 && (
          <Typography
            variant="body2"
            sx={{
              color: '#38a169',
              backgroundColor: '#f0fff4',
              p: 1,
              borderRadius: 1,
              mb: 2,
              textAlign: 'center',
              fontWeight: 500,
            }}
          >
            Add ${(100 - subtotal).toFixed(2)} more for FREE shipping!
          </Typography>
        )}

        <Button
          variant="contained"
          fullWidth
          size="large"
          startIcon={isCheckingOut ? <CircularProgress size={20} color="inherit" /> : <CreditCard />}
          onClick={handleCheckout}
          disabled={items.length === 0 || isCheckingOut}
          sx={{
            backgroundColor: '#3182ce',
            color: 'white',
            fontWeight: 600,
            fontSize: '1rem',
            py: 1.5,
            mb: 2,
            borderRadius: 2,
            textTransform: 'none',
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            boxShadow: '0 4px 12px rgba(49, 130, 206, 0.4)',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              backgroundColor: '#2c5aa0',
              boxShadow: '0 6px 20px rgba(49, 130, 206, 0.5)',
              transform: 'translateY(-2px)',
            },
            '&:active': {
              transform: 'translateY(0)',
            },
            '&:disabled': {
              backgroundColor: '#a0aec0',
              boxShadow: 'none',
              transform: 'none',
            }
          }}
        >
          {isCheckingOut ? 'Preparing Checkout...' : 'Proceed to Checkout'}
        </Button>

        <Button
          variant="outlined"
          fullWidth
          onClick={handleContinueShopping}
          disabled={isCheckingOut}
          sx={{
            borderColor: '#3182ce',
            color: '#3182ce',
            fontWeight: 600,
            py: 1,
            borderRadius: 2,
            textTransform: 'none',
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            '&:hover': {
              borderColor: '#2c5aa0',
              backgroundColor: '#ebf8ff',
            },
            '&:disabled': {
              borderColor: '#a0aec0',
              color: '#a0aec0',
            }
          }}
        >
          Continue Shopping
        </Button>
      </CardContent>
    </Card>
  );
};

export default CartSummary; 