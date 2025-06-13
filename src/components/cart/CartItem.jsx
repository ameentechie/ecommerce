import React from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../../hooks/useCart';

const CartItem = ({ item }) => {
  const { removeItem } = useCart();

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{item.title}</Typography>
        <Typography>₹{item.price}</Typography>
        <IconButton color="error" onClick={() => removeItem(item.id)}>
          <DeleteIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default CartItem;