import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Rating,
  Box,
  IconButton,
  Chip,
  Skeleton,
} from '@mui/material';
import { AddShoppingCart, Favorite, FavoriteBorder } from '@mui/icons-material';
import { formatPrice, truncateText } from '../../utils/formatters';
import useCart from '../../hooks/useCart';

/**
 * ProductCard component for displaying product information in a grid or list
 * @param {Object} props - Component props
 * @param {Object} props.product - Product data
 * @param {boolean} props.loading - Loading state
 */
const ProductCard = ({ product, loading = false }) => {
  const navigate = useNavigate();
  const { addItem, isInCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Handle click on the product card
  const handleClick = () => {
    if (!loading && product) {
      navigate(`/products/${product.id}`);
    }
  };
  
  // Handle add to cart
  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent card click
    if (!loading && product) {
      addItem(product);
    }
  };
  
  // Handle favorite toggle
  const handleToggleFavorite = (e) => {
    e.stopPropagation(); // Prevent card click
    if (!loading) {
      setIsFavorite(!isFavorite);
    }
  };
  
  // If loading, show skeleton
  if (loading) {
    return (
      <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Skeleton variant="rectangular" height={200} />
        <CardContent>
          <Skeleton variant="text" height={28} width="80%" />
          <Skeleton variant="text" height={24} width="40%" />
          <Box sx={{ mt: 1, mb: 1 }}>
            <Skeleton variant="text" height={24} width="60%" />
          </Box>
        </CardContent>
        <CardActions sx={{ mt: 'auto' }}>
          <Skeleton variant="rectangular" height={36} width={120} />
          <Box sx={{ flexGrow: 1 }} />
          <Skeleton variant="circular" width={40} height={40} />
        </CardActions>
      </Card>
    );
  }
  
  // If no product data, return null
  if (!product) return null;
  
  return (
    <Card 
      sx={{ 
        maxWidth: 345, 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        cursor: 'pointer',
      }}
      onClick={handleClick}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="200"
          image={product.image}
          alt={product.title}
          sx={{ objectFit: 'contain', p: 2, backgroundColor: '#f5f5f5' }}
        />
        <IconButton
          sx={{ position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(255,255,255,0.7)' }}
          onClick={handleToggleFavorite}
        >
          {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
        </IconButton>
        {product.category && (
          <Chip
            label={product.category}
            size="small"
            sx={{ position: 'absolute', bottom: 8, left: 8 }}
          />
        )}
      </Box>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ height: 60, overflow: 'hidden' }}>
          {truncateText(product.title, 50)}
        </Typography>
        <Typography variant="h6" color="primary" gutterBottom>
          {formatPrice(product.price)}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating
            name={`rating-${product.id}`}
            value={product.rating?.rate || 0}
            precision={0.5}
            readOnly
            size="small"
          />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({product.rating?.count || 0})
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button 
          variant="contained" 
          startIcon={<AddShoppingCart />}
          onClick={handleAddToCart}
          disabled={isInCart(product.id)}
          color={isInCart(product.id) ? "success" : "primary"}
        >
          {isInCart(product.id) ? 'In Cart' : 'Add to Cart'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
