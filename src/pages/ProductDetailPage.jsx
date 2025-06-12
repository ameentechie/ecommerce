import { useState } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  Rating,
  Divider,
  Breadcrumbs,
  Link,
  Paper,
  Tabs,
  Tab,
  Chip,
  IconButton,
  TextField,
  Alert,
  Skeleton,
} from '@mui/material';
import {
  ShoppingCart,
  Favorite,
  FavoriteBorder,
  Share,
  ArrowBack,
} from '@mui/icons-material';
import { useGetProductQuery } from '../store/api/productApi';
import { useGetProductReviewsQuery } from '../store/api/productApi';
import useCart from '../hooks/useCart';
import { formatPrice } from '../utils/formatters';
import LoadingSpinner from '../components/common/LoadingSpinner';

/**
 * ProductDetailPage component for displaying detailed product information
 */
const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  
  // Get cart functions from custom hook
  const { addItem, isInCart } = useCart();
  
  // Fetch product data
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductQuery(id);
  
  // Fetch product reviews (placeholder - would be implemented in a real API)
  // This is a mock since Fake Store API doesn't have reviews
  const reviews = [
    { id: 1, user: 'John D.', rating: 5, comment: 'Great product! Exactly as described.', date: '2023-05-15' },
    { id: 2, user: 'Sarah M.', rating: 4, comment: 'Good quality for the price.', date: '2023-04-22' },
    { id: 3, user: 'Robert K.', rating: 3, comment: 'Decent product but shipping was slow.', date: '2023-03-10' },
  ];
  
  // Handle quantity change
  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (value > 0) {
      setQuantity(value);
    }
  };
  
  // Handle add to cart
  const handleAddToCart = () => {
    if (product) {
      addItem({ ...product, quantity });
    }
  };
  
  // Handle favorite toggle
  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  
  // Handle share
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.title,
        text: `Check out this product: ${product?.title}`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };
  
  // If loading, show skeleton
  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Skeleton variant="rectangular" height={400} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Skeleton variant="text" height={40} width="80%" />
            <Skeleton variant="text" height={30} width="40%" sx={{ mt: 2 }} />
            <Skeleton variant="text" height={24} width="60%" sx={{ mt: 2 }} />
            <Skeleton variant="text" height={100} sx={{ mt: 2 }} />
            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Skeleton variant="rectangular" height={50} width={120} />
              <Skeleton variant="rectangular" height={50} width={120} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    );
  }
  
  // If error, show error message
  if (error) {
    return (
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="error" gutterBottom>
            Error loading product
          </Typography>
          <Typography variant="body1" paragraph>
            We couldn't load the product information. Please try again later.
          </Typography>
          <Button
            variant="contained"
            startIcon={<ArrowBack />}
            onClick={() => navigate('/products')}
          >
            Back to Products
          </Button>
        </Paper>
      </Container>
    );
  }
  
  // If product not found
  if (!product) {
    return (
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            Product not found
          </Typography>
          <Typography variant="body1" paragraph>
            The product you're looking for doesn't exist or has been removed.
          </Typography>
          <Button
            variant="contained"
            startIcon={<ArrowBack />}
            onClick={() => navigate('/products')}
          >
            Back to Products
          </Button>
        </Paper>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
        <Link underline="hover" color="inherit" component={RouterLink} to="/">
          Home
        </Link>
        <Link underline="hover" color="inherit" component={RouterLink} to="/products">
          Products
        </Link>
        {product.category && (
          <Link
            underline="hover"
            color="inherit"
            component={RouterLink}
            to={`/products?category=${encodeURIComponent(product.category)}`}
          >
            {product.category}
          </Link>
        )}
        <Typography color="text.primary">{product.title}</Typography>
      </Breadcrumbs>
      
      <Grid container spacing={4}>
        {/* Product Image */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 4,
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#f5f5f5',
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{
                maxWidth: '100%',
                maxHeight: '400px',
                objectFit: 'contain',
              }}
            />
          </Paper>
        </Grid>
        
        {/* Product Details */}
        <Grid item xs={12} md={6}>
          <Box>
            {/* Category */}
            {product.category && (
              <Chip
                label={product.category}
                size="small"
                sx={{ mb: 2 }}
              />
            )}
            
            {/* Title */}
            <Typography variant="h4" component="h1" gutterBottom>
              {product.title}
            </Typography>
            
            {/* Rating */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating
                value={product.rating?.rate || 0}
                precision={0.5}
                readOnly
              />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                ({product.rating?.count || 0} reviews)
              </Typography>
            </Box>
            
            {/* Price */}
            <Typography variant="h5" color="primary" gutterBottom>
              {formatPrice(product.price)}
            </Typography>
            
            {/* Description */}
            <Typography variant="body1" paragraph sx={{ my: 3 }}>
              {product.description}
            </Typography>
            
            <Divider sx={{ my: 3 }} />
            
            {/* Quantity Selector */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Typography variant="body1" sx={{ mr: 2 }}>
                Quantity:
              </Typography>
              <TextField
                type="number"
                InputProps={{ inputProps: { min: 1, max: 10 } }}
                value={quantity}
                onChange={handleQuantityChange}
                size="small"
                sx={{ width: '80px' }}
              />
            </Box>
            
            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCart />}
                onClick={handleAddToCart}
                disabled={isInCart(product.id)}
                color={isInCart(product.id) ? "success" : "primary"}
                sx={{ flex: '1 0 auto', minWidth: '180px' }}
              >
                {isInCart(product.id) ? 'In Cart' : 'Add to Cart'}
              </Button>
              
              <IconButton
                color={isFavorite ? 'error' : 'default'}
                onClick={handleToggleFavorite}
                sx={{ border: '1px solid', borderColor: 'divider' }}
              >
                {isFavorite ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
              
              <IconButton
                onClick={handleShare}
                sx={{ border: '1px solid', borderColor: 'divider' }}
              >
                <Share />
              </IconButton>
            </Box>
            
            {/* Stock Status */}
            <Alert severity="success" sx={{ mt: 3 }}>
              In Stock - Ready to Ship
            </Alert>
          </Box>
        </Grid>
      </Grid>
      
      {/* Product Tabs */}
      <Paper sx={{ mt: 6 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Description" />
          <Tab label="Reviews" />
          <Tab label="Shipping & Returns" />
        </Tabs>
        
        <Box sx={{ p: 3 }}>
          {/* Description Tab */}
          {activeTab === 0 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Product Description
              </Typography>
              <Typography variant="body1" paragraph>
                {product.description}
              </Typography>
              <Typography variant="body1" paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Typography>
              
              {/* Product Features */}
              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Features
              </Typography>
              <ul>
                <li>High-quality materials</li>
                <li>Durable construction</li>
                <li>Easy to use</li>
                <li>Modern design</li>
                <li>Satisfaction guaranteed</li>
              </ul>
            </Box>
          )}
          
          {/* Reviews Tab */}
          {activeTab === 1 && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">
                  Customer Reviews
                </Typography>
                <Button variant="outlined">Write a Review</Button>
              </Box>
              
              {/* Review List */}
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <Paper key={review.id} sx={{ p: 2, mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {review.user}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {review.date}
                      </Typography>
                    </Box>
                    <Rating value={review.rating} readOnly size="small" sx={{ my: 1 }} />
                    <Typography variant="body1">
                      {review.comment}
                    </Typography>
                  </Paper>
                ))
              ) : (
                <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', py: 3 }}>
                  No reviews yet. Be the first to review this product!
                </Typography>
              )}
            </Box>
          )}
          
          {/* Shipping Tab */}
          {activeTab === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>
                Shipping Information
              </Typography>
              <Typography variant="body1" paragraph>
                We offer free standard shipping on all orders over $50. Orders typically ship within 1-2 business days.
              </Typography>
              <Typography variant="body1" paragraph>
                Estimated delivery times:
              </Typography>
              <ul>
                <li>Standard Shipping: 3-5 business days</li>
                <li>Express Shipping: 1-2 business days (additional fee)</li>
              </ul>
              
              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Return Policy
              </Typography>
              <Typography variant="body1" paragraph>
                We accept returns within 30 days of delivery. Items must be unused and in original packaging.
              </Typography>
              <Typography variant="body1">
                Please contact our customer service team to initiate a return.
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>
      
      {/* Related Products would go here */}
    </Container>
  );
};

export default ProductDetailPage;
