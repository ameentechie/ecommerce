import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  IconButton, 
  Box, 
  Grid,
  TextField,
  Button,
  CardMedia
} from '@mui/material';
import { Delete, Add, Remove } from '@mui/icons-material';
import { useCart } from '../../hooks/useCart';
import Rating from '../common/Rating';

const CartItem = ({ item }) => {
  const { removeItem, updateItemQuantity, decreaseItemQuantity } = useCart();

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value) || 1;
    if (newQuantity > 0) {
      updateItemQuantity(item.id, newQuantity);
    }
  };

  const handleIncreaseQuantity = () => {
    updateItemQuantity(item.id, item.quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      decreaseItemQuantity(item.id);
    }
  };

  const handleRemoveItem = () => {
    removeItem(item.id);
  };

  const itemTotal = (item.price * item.quantity).toFixed(2);

  return (
    <Card 
      sx={{ 
        mb: 2, 
        borderRadius: 3,
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        border: '1px solid #e2e8f0',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Grid container spacing={3} alignItems="center">
          {/* Product Image */}
          <Grid item xs={12} sm={3} md={2}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fafafa',
                borderRadius: 2,
                p: 1,
                minHeight: 100,
              }}
            >
              <CardMedia
                component="img"
                image={item.image}
                alt={item.title}
                sx={{
                  objectFit: 'contain',
                  maxWidth: '100%',
                  maxHeight: 80,
                  borderRadius: 1,
                }}
              />
            </Box>
          </Grid>

          {/* Product Details */}
          <Grid item xs={12} sm={5} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: '#2d3748',
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                lineHeight: 1.3,
                mb: 0.5,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {item.title}
            </Typography>
            
            <Typography
              variant="body2"
              sx={{
                color: '#718096',
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                textTransform: 'capitalize',
                mb: 1,
              }}
            >
              {item.category}
            </Typography>

            {/* Price and Rating - Reduced Gap */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <Typography
                variant="h6"
                sx={{
                  color: '#e53e3e',
                  fontWeight: 700,
                  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                }}
              >
                ${item.price}
              </Typography>
              {item.rating && (
                <Rating value={item.rating.rate} size="small" />
              )}
            </Box>
          </Grid>

          {/* Quantity Controls */}
          <Grid item xs={12} sm={2} md={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
              <IconButton
                size="small"
                onClick={handleDecreaseQuantity}
                disabled={item.quantity <= 1}
                sx={{
                  backgroundColor: '#f7fafc',
                  border: '1px solid #e2e8f0',
                  '&:hover': {
                    backgroundColor: '#edf2f7',
                  },
                  '&:disabled': {
                    backgroundColor: '#f7fafc',
                    color: '#a0aec0',
                  }
                }}
              >
                <Remove fontSize="small" />
              </IconButton>
              
              <TextField
                value={item.quantity}
                onChange={handleQuantityChange}
                inputProps={{
                  min: 1,
                  style: { textAlign: 'center', padding: '8px' }
                }}
                sx={{
                  width: 60,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                  }
                }}
                size="small"
                type="number"
              />
              
              <IconButton
                size="small"
                onClick={handleIncreaseQuantity}
                sx={{
                  backgroundColor: '#f7fafc',
                  border: '1px solid #e2e8f0',
                  '&:hover': {
                    backgroundColor: '#edf2f7',
                  }
                }}
              >
                <Add fontSize="small" />
              </IconButton>
            </Box>
          </Grid>

          {/* Total Price and Actions */}
          <Grid item xs={12} sm={2} md={3}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: '#2d3748',
                  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                }}
              >
                ${itemTotal}
              </Typography>
              
              <IconButton
                color="error"
                onClick={handleRemoveItem}
                sx={{
                  backgroundColor: '#fed7d7',
                  color: '#e53e3e',
                  '&:hover': {
                    backgroundColor: '#feb2b2',
                  },
                  borderRadius: 1,
                }}
                size="small"
              >
                <Delete fontSize="small" />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CartItem;