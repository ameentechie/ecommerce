import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid,
  Button,
  Alert,
  Paper,
  Breadcrumbs,
  Link,
  CircularProgress
} from '@mui/material';
import { 
  ShoppingBag, 
  ArrowBack, 
  ShoppingCart as ShoppingCartIcon 
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import LoadingSpinner from '../components/common/LoadingSpinner';

const CartPage = () => {
  const { items, clearAllItems } = useCart();
  const navigate = useNavigate();
  const [isClearing, setIsClearing] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleContinueShopping = () => {
    navigate('/products');
  };

  const handleClearCart = async () => {
    setIsClearing(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      clearAllItems();
    } finally {
      setIsClearing(false);
    }
  };

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

  const EmptyCartState = () => (
    <Paper
      elevation={0}
      sx={{
        textAlign: 'center',
        py: 6,
        px: 4,
        backgroundColor: '#f8fafc',
        borderRadius: 3,
        border: '2px dashed #cbd5e0',
      }}
    >
      <ShoppingBag
        sx={{
          fontSize: 80,
          color: '#a0aec0',
          mb: 2,
        }}
      />
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          fontWeight: 600,
          color: '#4a5568',
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          mb: 1,
        }}
      >
        Your cart is empty
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: '#718096',
          mb: 3,
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        }}
      >
        Looks like you haven't added any items to your cart yet.
      </Typography>
      <Button
        variant="contained"
        size="large"
        startIcon={<ShoppingCartIcon />}
        onClick={handleContinueShopping}
        sx={{
          backgroundColor: '#3182ce',
          color: 'white',
          fontWeight: 600,
          px: 4,
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
        Start Shopping
      </Button>
    </Paper>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs
        sx={{ mb: 3 }}
        separator="›"
        aria-label="breadcrumb"
      >
        <Link
          color="inherit"
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
          }}
          sx={{ 
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' }
          }}
        >
          Home
        </Link>
        <Link
          color="inherit"
          href="/products"
          onClick={(e) => {
            e.preventDefault();
            navigate('/products');
          }}
          sx={{ 
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' }
          }}
        >
          Products
        </Link>
        <Typography color="text.primary">Cart</Typography>
      </Breadcrumbs>

      {/* Page Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
            sx={{ 
              color: '#3182ce',
              fontWeight: 500,
            }}
          >
            Back
          </Button>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: '#2d3748',
              fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            }}
          >
            Shopping Cart
          </Typography>
        </Box>

        {items.length > 0 && (
          <Button
            variant="outlined"
            color="error"
            onClick={handleClearCart}
            disabled={isClearing}
            startIcon={isClearing ? <CircularProgress size={16} /> : null}
            sx={{
              fontWeight: 500,
              textTransform: 'none',
              borderRadius: 2,
            }}
          >
            {isClearing ? 'Clearing...' : 'Clear Cart'}
          </Button>
        )}
      </Box>

      {/* Loading overlay for checkout */}
      {isCheckingOut && (
        <LoadingSpinner 
          fullScreen 
          message="Preparing your checkout..." 
          color="primary"
        />
      )}

      {/* Cart Content */}
      {items.length === 0 ? (
        <EmptyCartState />
      ) : (
        <>
          {/* Success Message */}
          <Alert
            severity="success"
            sx={{
              mb: 3,
              borderRadius: 2,
              backgroundColor: '#f0fff4',
              border: '1px solid #9ae6b4',
            }}
          >
            Great choice! You have {items.length} {items.length === 1 ? 'item' : 'items'} in your cart.
          </Alert>

          <Grid container spacing={4}>
            {/* Cart Items */}
            <Grid item xs={12} lg={8}>
              <Box sx={{ mb: 2 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: '#2d3748',
                    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                    mb: 2,
                  }}
                >
                  Cart Items ({items.length})
                </Typography>
                
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </Box>
            </Grid>

            {/* Cart Summary */}
            <Grid item xs={12} lg={4}>
              <CartSummary />
            </Grid>
          </Grid>
        </>
      )}

      {/* Additional Information */}
      {items.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Alert
            severity="info"
            sx={{
              borderRadius: 2,
              backgroundColor: '#ebf8ff',
              border: '1px solid #90cdf4',
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 500 }}>
              💝 Free shipping on orders over $100 | 🔒 Secure checkout | 📦 Fast delivery
            </Typography>
          </Alert>
        </Box>
      )}
    </Container>
  );
};

export default CartPage;