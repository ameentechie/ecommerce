import React, { useMemo } from 'react';
import { Container, Typography, Box, Breadcrumbs, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { NewReleases, AutoAwesome } from '@mui/icons-material';
import ProductGrid from '../components/products/ProductGrid';
import { useProducts } from '../hooks/useProducts';

const NewItemsPage = () => {
  const navigate = useNavigate();
  const { data: products, isLoading } = useProducts();

  // Get any 10 products from the list (simulating new items)
  const newItemProducts = useMemo(() => {
    if (!products) return [];
    
    // Shuffle array and take first 10 products to simulate "new items"
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10);
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
          <Typography color="text.primary">New Items</Typography>
        </Breadcrumbs>

        {/* Page Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 2 }}>
            <NewReleases sx={{ fontSize: 40, color: '#28a745' }} />
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 700,
                color: '#343a40',
                fontSize: { xs: '2rem', md: '3rem' }
              }}
            >
              New Items
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
            Explore our latest arrivals and trending products
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <Box 
              sx={{ 
                background: 'linear-gradient(45deg, #28a745, #20c997)',
                borderRadius: '50%',
                p: 0.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <AutoAwesome sx={{ color: '#ffffff', fontSize: 16 }} />
            </Box>
            <Typography variant="body1" sx={{ color: '#6c757d' }}>
              Fresh additions to our collection
            </Typography>
          </Box>
        </Box>

        {/* Products Display */}
        <ProductGrid
          products={newItemProducts}
          isLoading={isLoading}
          searchTerm=""
          selectedCategory=""
          sortBy="newest"
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
            What Makes Our New Items Special
          </Typography>
          <Typography variant="body1" sx={{ color: '#6c757d', lineHeight: 1.6, mb: 2 }}>
            Our new items collection features the latest additions to our product lineup. 
            These carefully curated products represent the newest trends, innovations, and 
            customer favorites that have recently joined our marketplace.
          </Typography>
          <Typography variant="body1" sx={{ color: '#6c757d', lineHeight: 1.6 }}>
            Stay ahead of the curve with these fresh arrivals that offer the perfect blend 
            of quality, style, and value. Each new item is selected based on customer demand 
            and market trends to ensure you have access to the most sought-after products.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default NewItemsPage; 