import React from 'react';
import { Box, Typography, Divider, List, ListItem, ListItemText, Rating } from '@mui/material';

const reviews = [
  { id: 1, user: 'Alice', rating: 5, comment: 'Great product!' },
  { id: 2, user: 'Bob', rating: 4, comment: 'Good value for money.' },
];

const ProductReviews = () => (
  <Box>
    <Typography variant="h6" gutterBottom>Customer Reviews</Typography>
    <Divider sx={{ mb: 2 }} />
    <List>
      {reviews.map((review) => (
        <ListItem key={review.id} alignItems="flex-start">
          <ListItemText
            primary={<><b>{review.user}</b> <Rating value={review.rating} readOnly size="small" /></>}
            secondary={review.comment}
          />
        </ListItem>
      ))}
    </List>
  </Box>
);

export default ProductReviews;
