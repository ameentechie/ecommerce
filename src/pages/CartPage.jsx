import React from 'react';
import { useCart } from '../hooks/useCart';
import { Container, Typography, Box, Button } from '@mui/material';
import CartItem from '../components/cart/CartItem';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { items } = useCart();
  const navigate = useNavigate();

  return (
    <Container>
      <Typography variant="h4">Cart</Typography>
      {items.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <Box>
          {items.map(item => <CartItem key={item.id} item={item} />)}
          <Button variant="contained" onClick={() => navigate('/checkout')}>Checkout</Button>
        </Box>
      )}
    </Container>
  );
};

export default CartPage;