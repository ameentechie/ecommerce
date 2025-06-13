import React, { useMemo } from 'react';
import { Container, Typography, Box, Breadcrumbs, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Star, TrendingUp } from '@mui/icons-material';
import ProductGrid from '../components/products/ProductGrid';
import { useProducts } from '../hooks/useProducts';

const BestSellersPage = () => {
  const navigate = useNavigate();
  const { data: products, isLoading } = useProducts();

  // Get top 10 products sorted by highest rating
  const bestSellerProducts = useMemo(() => {
    if (!products) return [];
    
    return [...products]
      .sort((a, b) => {
        const ratingA = parseFloat(a.rating?.rate) || 0;
        const ratingB = parseFloat(b.rating?.rate) || 0;
        return ratingB - ratingA;
      })
      .slice(0, 10);
  }, [products]);

  return (
    <Box sx={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs
          sx={{ mb: 3 }}
          separator="›"
          aria-label="breadcrumb"
        >
          <Link
            color="inherit"
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}
            sx={{ 
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' }
            }}
          >
            Home
          </Link>
          <Typography color="text.primary">Best Sellers</Typography>
        </Breadcrumbs>

        {/* Page Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 2 }}>
            <TrendingUp sx={{ fontSize: 40, color: '#007bff' }} />
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 700,
                color: '#343a40',
                fontSize: { xs: '2rem', md: '3rem' }
              }}
            >
              Best Sellers
            </Typography>
          </Box>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#6c757d',
              mb: 2,
              maxWidth: '600px',
              mx: 'auto'
            }}
          >
            Discover our top-rated products loved by customers worldwide
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <Star sx={{ color: '#ffc107', fontSize: 20 }} />
            <Typography variant="body1" sx={{ color: '#6c757d' }}>
              Top 10 products with highest customer ratings
            </Typography>
          </Box>
        </Box>

        {/* Products Display */}
        <ProductGrid
          products={bestSellerProducts}
          isLoading={isLoading}
          searchTerm=""
          selectedCategory=""
          sortBy="rating"
          viewMode="grid"
          priceRange={[0, 1000]}
          minRating={0}
          currentPage={1}
          itemsPerPage={10}
        />

        {/* Info Section */}
        <Box 
          sx={{ 
            mt: 6, 
            p: 4, 
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            border: '1px solid #e9ecef'
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#343a40' }}>
            Why These Products Are Best Sellers
          </Typography>
          <Typography variant="body1" sx={{ color: '#6c757d', lineHeight: 1.6 }}>
            Our best-selling products are determined by customer ratings and reviews. 
            These items have consistently received the highest ratings from our customers, 
            reflecting their quality, value, and customer satisfaction. Each product has been 
            thoroughly tested by real customers who have shared their honest feedback.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default BestSellersPage; 