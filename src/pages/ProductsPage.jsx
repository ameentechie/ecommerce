import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import ProductGrid from '../components/products/ProductGrid';
import ProductFilters from '../components/products/ProductFilters';
import ProductSearch from '../components/products/ProductSearch';
import Pagination from '../components/common/Pagination';
import { useProducts } from '../hooks/useProducts';
const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { data: products, isLoading } = useProducts();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Products</Typography>

      <ProductSearch onSearch={setSearchTerm} />
      <Box sx={{ my: 2 }}>
        <ProductFilters onCategoryChange={setSelectedCategory} />
      </Box>

      <ProductGrid
        products={products}
        isLoading={isLoading}
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        currentPage={currentPage}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={5}
        onPageChange={setCurrentPage}
      />
    </Container>
  );
};


export default ProductsPage;
