import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Rating from '../common/Rating';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent navigation when clicking Add to Cart
    dispatch(addToCart(product));
  };

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <Card 
      onClick={handleCardClick}
      sx={{ 
        width: '100%',
        maxWidth: 260,
        minWidth: 240,
        height: 420, // Slightly increased height for better spacing
        borderRadius: 3,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        '&:hover': { 
          transform: 'translateY(-4px) scale(1.02)',
          boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
        },
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
        overflow: 'hidden',
        mx: 'auto'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 2,
          backgroundColor: '#fafafa',
          height: 180,
          minHeight: 180,
          maxHeight: 180,
        }}
      >
        <CardMedia
          component="img"
          image={product.image}
          alt={product.title}
          sx={{ 
            objectFit: 'contain', 
            width: '100%',
            height: '100%',
            maxHeight: 140,
            maxWidth: 140,
            borderRadius: 2,
          }}
        />
      </Box>
      
      {/* Restructured Content for Equal Spacing */}
      <CardContent sx={{ 
        p: 2, 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column',
        textAlign: 'center',
        justifyContent: 'space-between', // Equal distribution of space
      }}>
        {/* Product Title */}
        <Typography 
          variant="h6" 
          sx={{
            fontSize: '0.9rem',
            fontWeight: 600,
            lineHeight: 1.3,
            color: '#2d3748',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            height: '2.6em',
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            textAlign: 'center',
          }}
        >
          {product.title}
        </Typography>
        
        {/* Price */}
        <Typography 
          variant="h5" 
          sx={{
            color: '#e53e3e',
            fontWeight: 700,
            fontSize: '1.05rem',
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            textAlign: 'center',
            lineHeight: 1.2,
            my: 1, // Equal margin top and bottom
          }}
        >
          ${product.price}
        </Typography>
        
        {/* Rating */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center',
          my: 1, // Equal margin top and bottom
        }}>
          <Rating value={product.rating.rate} size="small" />
        </Box>
      </CardContent>
      
      {/* Add to Cart Button with Equal Spacing */}
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          onClick={handleAddToCart}
          sx={{
            backgroundColor: '#3182ce',
            color: 'white',
            fontWeight: 600,
            fontSize: '0.85rem',
            py: 0.8,
            borderRadius: 2,
            textTransform: 'none',
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            boxShadow: '0 2px 4px rgba(49, 130, 206, 0.3)',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              backgroundColor: '#2c5aa0',
              boxShadow: '0 4px 12px rgba(49, 130, 206, 0.4)',
              transform: 'translateY(-1px)',
            },
            '&:active': {
              transform: 'translateY(0)',
            }
          }}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
