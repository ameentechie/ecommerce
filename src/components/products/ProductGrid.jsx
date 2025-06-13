import React from 'react';
import { useGetProductsQuery } from '../../store/api/productApi';
import { Grid, Typography } from '@mui/material';
import LoadingSpinner from '../common/LoadingSpinner';
import ProductCard from './ProductCard';

const ProductGrid = ({ products, isLoading, searchTerm, selectedCategory, currentPage }) => {
  if (isLoading) return <div>Loading...</div>;

  // Apply search + category filters here if needed
  const filteredProducts = products?.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory ? product.category === selectedCategory : true)
  );

  return (
    <Grid container spacing={2}>
      {filteredProducts?.map(product => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
};


export default ProductGrid;
