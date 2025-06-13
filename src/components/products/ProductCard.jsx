import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Box } from '@mui/material';
import Rating from '../common/Rating';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <Card sx={{ transition: '0.3s', '&:hover': { boxShadow: 6 } }}>
      <CardMedia
        component="img"
        image={product.image}
        alt={product.title}
        sx={{ objectFit: 'contain', height: 220, p: 2 }}
      />
      <CardContent>
        <Typography variant="h6" noWrap gutterBottom>{product.title}</Typography>
        <Typography variant="body1" color="primary" gutterBottom>₹ {product.price}</Typography>
        <Rating value={product.rating.rate} />
      </CardContent>
      <CardActions>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
