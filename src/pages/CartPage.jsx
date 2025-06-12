import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  TextField,
  Alert,
  Breadcrumbs,
  Link,
  IconButton,
} from '@mui/material';
import { ArrowBack, ShoppingCart } from '@mui/icons-material';
import CartItem from '../components/cart/CartItem';
import useCart from '../hooks/useCart';
import { formatPrice } from '../utils/formatters';
import LoadingSpinner from '../components/common/LoadingSpinner';

/**
 * CartPage component for displaying and managing the shopping cart
 */
const CartPage = () => {
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);
  
  // Get cart data from Redux store via custom hook
  const { items, totalItems, subtotal, isLoading, clearCart } = useCart();
  
  // Constants for cart calculations
  const TAX_RATE = 0.07; // 7% tax
  const SHIPPING_THRESHOLD = 50; // Free shipping over $50
  const SHIPPING_FEE = 5.99;
  
  // Calculate cart totals
  const tax = subtotal * TAX_RATE;
  const shipping = subtotal > SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + tax + shipping;
  
  // Handle promo code application
  const handleApplyPromo = () => {
    if (!promoCode.trim()) {
      setPromoError('Please enter a promo code');
      return;
    }
    
    setIsApplyingPromo(true);
    setPromoError('');
    setPromoSuccess('');
    
    // Simulate API call to validate promo code
    setTimeout(() => {
      if (promoCode.toUpperCase() === 'DISCOUNT20') {
        setPromoSuccess('Promo code applied successfully!');
      } else {
        setPromoError('Invalid or expired promo code');
      }
      setIsApplyingPromo(false);
    }, 1000);
  };
  
  // Handle checkout
  const handleCheckout = () => {
    navigate('/checkout');
  };
  
  // If cart is loading, show loading spinner
  if (isLoading) {
    return <LoadingSpinner message="Loading your cart..." />;
  }
  
  // Empty cart view
  if (totalItems === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link underline="hover" color="inherit" component={RouterLink} to="/">
            Home
          </Link>
          <Typography color="text.primary">Cart</Typography>
        </Breadcrumbs>
        
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <ShoppingCart sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Your cart is empty
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Looks like you haven't added any products to your cart yet.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            component={RouterLink} 
            to="/products"
            startIcon={<ArrowBack />}
            sx={{ mt: 2 }}
          >
            Continue Shopping
          </Button>
        </Paper>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <Link underline="hover" color="inherit" component={RouterLink} to="/">
          Home
        </Link>
        <Typography color="text.primary">Cart</Typography>
      </Breadcrumbs>
      
      {/* Page Title */}
      <Typography variant="h4" component="h1" gutterBottom>
        Your Shopping Cart
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
      </Typography>
      
      <Grid container spacing={4}>
        {/* Cart Items */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: { xs: 2, md: 3 }, mb: 3 }}>
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </Paper>
          
          {/* Cart Actions */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
            <Button
              variant="outlined"
              component={RouterLink}
              to="/products"
              startIcon={<ArrowBack />}
            >
              Continue Shopping
            </Button>
            
            <Button
              variant="outlined"
              color="error"
              onClick={clearCart}
            >
              Clear Cart
            </Button>
          </Box>
        </Grid>
        
        {/* Order Summary */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            
            <List disablePadding>
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Subtotal" />
                <Typography variant="body1">{formatPrice(subtotal)}</Typography>
              </ListItem>
              
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary="Tax" secondary="7%" />
                <Typography variant="body1">{formatPrice(tax)}</Typography>
              </ListItem>
              
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText 
                  primary="Shipping" 
                  secondary={subtotal > SHIPPING_THRESHOLD ? "Free shipping" : "Standard shipping"}
                />
                <Typography variant="body1">
                  {shipping === 0 ? 'Free' : formatPrice(shipping)}
                </Typography>
              </ListItem>
              
              <Divider sx={{ my: 2 }} />
              
              <ListItem sx={{ py: 1, px: 0 }}>
                <ListItemText primary={<Typography variant="h6">Total</Typography>} />
                <Typography variant="h6">{formatPrice(total)}</Typography>
              </ListItem>
            </List>
            
            {/* Promo Code */}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Promo Code
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  size="small"
                  placeholder="Enter code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  fullWidth
                  disabled={isApplyingPromo}
                />
                <Button 
                  variant="outlined" 
                  onClick={handleApplyPromo}
                  disabled={isApplyingPromo}
                >
                  Apply
                </Button>
              </Box>
              
              {promoError && (
                <Alert severity="error" sx={{ mt: 1 }}>
                  {promoError}
                </Alert>
              )}
              
              {promoSuccess && (
                <Alert severity="success" sx={{ mt: 1 }}>
                  {promoSuccess}
                </Alert>
              )}
            </Box>
            
            {/* Checkout Button */}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handleCheckout}
              sx={{ mt: 3 }}
            >
              Proceed to Checkout
            </Button>
            
            {/* Shipping Policy */}
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
              Free shipping on orders over {formatPrice(SHIPPING_THRESHOLD)}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartPage;
