import React from 'react';
import { Grid, Typography, Box, List, ListItem, Paper, Skeleton } from '@mui/material';
import LoadingSpinner from '../common/LoadingSpinner';
import ProductCard from './ProductCard';

const ProductGrid = ({ 
  products, 
  isLoading, 
  searchTerm, 
  selectedCategory, 
  sortBy = 'newest',
  viewMode = 'grid',
  priceRange = [0, 1000],
  minRating = 0,
  currentPage = 1,
  itemsPerPage = 12
}) => {
  if (isLoading) {
    return (
      <Grid container spacing={2.5} sx={{ p: 2, justifyContent: 'center' }}>
        {Array.from(new Array(12)).map((_, index) => (
          <Grid item xs={12} sm={6} md={3} lg={3} key={index}>
            <Skeleton variant="rectangular" height={300} sx={{ borderRadius: 2 }} />
          </Grid>
        ))}
      </Grid>
    );
  }

  // Enhanced filtering and sorting logic
  const processedProducts = React.useMemo(() => {
    if (!products) return [];
    
    let filtered = products.filter(product => {
      // Search term filtering - case insensitive with trimming
      const searchQuery = searchTerm?.toLowerCase().trim() || '';
      const matchesSearch = searchQuery === '' || [
        product.title?.toLowerCase() || '',
        product.description?.toLowerCase() || '',
        product.category?.toLowerCase() || ''
      ].some(field => field.includes(searchQuery));

      // Category filtering - exact match for category
      const matchesCategory = !selectedCategory || 
        product.category?.toLowerCase() === selectedCategory.toLowerCase();

      // Price range filtering
      const price = parseFloat(product.price) || 0;
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1];

      // Rating filtering
      const rating = parseFloat(product.rating?.rate) || 0;
      const matchesRating = rating >= minRating;

      return matchesSearch && matchesCategory && matchesPrice && matchesRating;
    });

    // Sorting logic
    const sortedProducts = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price_low':
          return parseFloat(a.price) - parseFloat(b.price);
        case 'price_high':
          return parseFloat(b.price) - parseFloat(a.price);
        case 'rating':
          return (parseFloat(b.rating?.rate) || 0) - (parseFloat(a.rating?.rate) || 0);
        case 'popularity':
          return (parseInt(b.rating?.count) || 0) - (parseInt(a.rating?.count) || 0);
        case 'newest':
        default:
          return a.id - b.id; // Assuming newer products have higher IDs
      }
    });

    return sortedProducts;
  }, [products, searchTerm, selectedCategory, sortBy, priceRange, minRating]);

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = processedProducts.slice(startIndex, startIndex + itemsPerPage);

  // Show empty state if no products found
  if (!products || products.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No products available
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Please try again later
        </Typography>
      </Box>
    );
  }

  if (processedProducts.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No products found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {searchTerm && selectedCategory 
            ? `No products match "${searchTerm}" in ${selectedCategory} category`
            : searchTerm 
            ? `No products match "${searchTerm}"`
            : selectedCategory
            ? `No products found in ${selectedCategory} category`
            : 'Try adjusting your search or filters'
          }
        </Typography>
      </Box>
    );
  }

  // Results summary
  const ResultsSummary = () => (
    <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="body2" color="text.secondary">
        Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, processedProducts.length)} of {processedProducts.length} products
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {sortBy === 'newest' && 'Sorted by newest first'}
        {sortBy === 'price_low' && 'Sorted by price: low to high'}
        {sortBy === 'price_high' && 'Sorted by price: high to low'}
        {sortBy === 'rating' && 'Sorted by highest rated'}
        {sortBy === 'popularity' && 'Sorted by most popular'}
      </Typography>
    </Box>
  );

  // Grid View
  if (viewMode === 'grid') {
  return (
      <Box>
        <ResultsSummary />
        <Grid container spacing={2.5} sx={{ justifyContent: 'center' }}>
          {paginatedProducts.map(product => (
        <Grid 
          item 
          xs={12} 
          sm={6} 
              md={4} 
          lg={3} 
          key={product.id}
          sx={{ 
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
      </Box>
    );
  }

  // List View
  return (
    <Box>
      <ResultsSummary />
      <List sx={{ width: '100%' }}>
        {paginatedProducts.map(product => (
          <ListItem key={product.id} sx={{ px: 0, py: 2 }}>
            <Paper
              elevation={1}
              sx={{
                width: '100%',
                p: 3,
                display: 'flex',
                gap: 3,
                borderRadius: 2,
                transition: 'all 0.3s ease',
                '&:hover': {
                  elevation: 3,
                  transform: 'translateY(-2px)',
                },
              }}
            >
              <Box
                component="img"
                src={product.image}
                alt={product.title}
                sx={{
                  width: 120,
                  height: 120,
                  objectFit: 'contain',
                  borderRadius: 1,
                  backgroundColor: 'grey.50',
                }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {product.description?.substring(0, 150)}...
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography variant="h6" color="primary">
                    ${product.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ⭐ {product.rating?.rate} ({product.rating?.count} reviews)
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.category}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ProductGrid;
