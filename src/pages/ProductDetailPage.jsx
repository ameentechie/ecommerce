import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { 
  Container, 
  Grid, 
  Typography, 
  Button, 
  Box, 
  Card, 
  CardMedia, 
  Chip,
  CircularProgress,
  Alert,
  Breadcrumbs,
  Link,
  Divider,
  Paper
} from '@mui/material';
import { ArrowBack, ShoppingCart, CheckCircle } from '@mui/icons-material';
import { useGetProductByIdQuery } from '../store/api/productApi';
import { addToCart } from '../store/slices/cartSlice';
import Rating from '../components/common/Rating';
import ProductReviews from '../components/products/ProductReviews';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { data: product, isLoading, error } = useGetProductByIdQuery(id);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress size={60} sx={{ color: '#3182ce', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            Loading product details...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert 
          severity="error"
          sx={{ 
            borderRadius: 2,
            backgroundColor: '#fed7d7',
            border: '1px solid #feb2b2',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Failed to load product
          </Typography>
          <Typography variant="body2">
            Please try again later or go back to products.
          </Typography>
          <Button 
            variant="outlined" 
            onClick={() => navigate('/products')}
            sx={{ mt: 2 }}
          >
            Back to Products
          </Button>
        </Alert>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert 
          severity="warning"
          sx={{ 
            borderRadius: 2,
            backgroundColor: '#fefcbf',
            border: '1px solid #f6e05e',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Product not found
          </Typography>
          <Typography variant="body2">
            The product you're looking for doesn't exist.
          </Typography>
          <Button 
            variant="outlined" 
            onClick={() => navigate('/products')}
            sx={{ mt: 2 }}
          >
            Browse Products
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
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
        <Link
          color="inherit"
          href="/products"
          onClick={(e) => {
            e.preventDefault();
            navigate('/products');
          }}
          sx={{ 
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' }
          }}
        >
          Products
        </Link>
        <Typography color="text.primary" sx={{ textTransform: 'capitalize' }}>
          {product.category}
        </Typography>
        <Typography color="text.primary">
          {product.title.length > 30 ? `${product.title.substring(0, 30)}...` : product.title}
        </Typography>
      </Breadcrumbs>

      {/* Back Button */}
      <Button
        startIcon={<ArrowBack />}
        onClick={handleGoBack}
        sx={{ 
          mb: 4, 
          color: '#3182ce',
          fontWeight: 500,
          '&:hover': {
            backgroundColor: '#ebf8ff',
          }
        }}
      >
        Back to Products
      </Button>

      {/* Product Content with Border and Center Alignment */}
      <Paper
        elevation={0}
        sx={{
          border: '2px solid #e2e8f0',
          borderRadius: 4,
          p: 4,
          backgroundColor: '#fafafa',
          mb: 4,
        }}
      >
        <Grid container spacing={4} justifyContent="center" alignItems="center">
          {/* Enhanced Product Image - Increased Size */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Card 
                sx={{ 
                  borderRadius: 3, 
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  border: '1px solid #e2e8f0',
                  maxWidth: 500, // Increased from 350px
                  width: '100%',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    p: 4, // Increased padding for better proportion
                    backgroundColor: '#ffffff',
                    minHeight: 450, // Increased from 300px
                    position: 'relative',
                  }}
                >
                  <CardMedia
                    component="img"
                    image={product.image}
                    alt={product.title}
                    sx={{
                      objectFit: 'contain',
                      maxWidth: '100%',
                      maxHeight: 400, // Increased from 250px
                      borderRadius: 2,
                      transition: 'transform 0.3s ease-in-out',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      }
                    }}
                  />
                  {/* Stock Indicator */}
                  <Chip
                    icon={<CheckCircle />}
                    label="In Stock"
                    color="success"
                    variant="filled"
                    sx={{
                      position: 'absolute',
                      top: 16, // Adjusted for larger container
                      right: 16,
                      fontWeight: 600,
                      fontSize: '0.8rem', // Slightly larger for better visibility
                    }}
                  />
                </Box>
              </Card>
            </Box>
          </Grid>

          {/* Product Details - Center Aligned */}
          <Grid item xs={12} md={6}>
            <Box sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'center', // Center align content
              textAlign: 'center', // Center align text
              maxWidth: 500,
              mx: 'auto', // Center the box itself
            }}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  fontWeight: 700,
                  color: '#2d3748',
                  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                  lineHeight: 1.2,
                  mb: 2,
                }}
              >
                {product.title}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Rating value={product.rating?.rate || 0} size="medium" />
                <Typography 
                  variant="body1" 
                  color="text.secondary"
                  sx={{ fontWeight: 500 }}
                >
                  ({product.rating?.count || 0} reviews)
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h3"
                  sx={{
                    color: '#e53e3e',
                    fontWeight: 700,
                    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                    mb: 1,
                  }}
                >
                  ${product.price}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#38a169',
                    fontWeight: 600,
                    backgroundColor: '#f0fff4',
                    px: 2,
                    py: 0.5,
                    borderRadius: 1,
                    display: 'inline-block',
                  }}
                >
                  Free shipping on orders over $100
                </Typography>
              </Box>

              <Chip
                label={product.category?.toUpperCase() || 'PRODUCT'}
                variant="outlined"
                sx={{
                  mb: 3,
                  fontWeight: 600,
                  borderColor: '#3182ce',
                  color: '#3182ce',
                  backgroundColor: '#ebf8ff',
                }}
              />

              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  mb: 4,
                  backgroundColor: '#ffffff',
                  borderRadius: 2,
                  border: '1px solid #e2e8f0',
                  flex: 1,
                  width: '100%',
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontWeight: 600,
                    color: '#2d3748',
                    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                    mb: 2,
                  }}
                >
                  Product Description
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: '#4a5568',
                    lineHeight: 1.7,
                    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                    textAlign: 'left', // Left align description text for readability
                  }}
                >
                  {product.description}
                </Typography>
              </Paper>

              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCart />}
                onClick={handleAddToCart}
                sx={{
                  backgroundColor: '#3182ce',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  py: 2,
                  px: 6,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                  boxShadow: '0 4px 12px rgba(49, 130, 206, 0.4)',
                  transition: 'all 0.2s ease-in-out',
                  mb: 3,
                  '&:hover': {
                    backgroundColor: '#2c5aa0',
                    boxShadow: '0 6px 20px rgba(49, 130, 206, 0.5)',
                    transform: 'translateY(-2px)',
                  },
                  '&:active': {
                    transform: 'translateY(0)',
                  },
                }}
              >
                Add to Cart
              </Button>

              {/* Product Features */}
              <Box sx={{ pt: 2, borderTop: '1px solid #e2e8f0', width: '100%' }}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                        ✅ Quality Guaranteed
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                        🚚 Fast Delivery
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                        🔒 Secure Payment
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Divider */}
      <Divider sx={{ my: 4 }} />

      {/* Product Reviews Section */}
      <Box>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontWeight: 600,
            color: '#2d3748',
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            mb: 3,
            textAlign: 'center',
          }}
        >
          Customer Reviews & Ratings
        </Typography>
        <ProductReviews productId={id} />
      </Box>
    </Container>
  );
};

export default ProductDetailPage; 