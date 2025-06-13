import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../store/api/productApi';
import { Container, Typography, Box, Button, CardMedia } from '@mui/material';
import Rating from '../components/common/Rating';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useGetProductByIdQuery(id);

  if (isLoading) return <LoadingSpinner />;

  return (
    <Container sx={{ py: 4 }}>
      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>
        <CardMedia
          component="img"
          image={product.image}
          alt={product.title}
          sx={{ objectFit: 'contain', maxWidth: 400 }}
        />
        <Box flex={1}>
          <Typography variant="h4" gutterBottom>{product.title}</Typography>
          <Rating value={product.rating.rate} />
          <Typography variant="h5" color="primary" sx={{ my: 2 }}>₹ {product.price}</Typography>
          <Typography variant="body1" gutterBottom>{product.description}</Typography>
          <Button variant="contained" color="primary">Add to Cart</Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ProductDetailPage;
