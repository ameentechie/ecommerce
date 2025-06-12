import {
  Box,
  Card,
  CardMedia,
  Typography,
  IconButton,
  TextField,
  Grid,
  Divider,
} from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { formatPrice } from '../../utils/formatters';
import useCart from '../../hooks/useCart';

/**
 * CartItem component for displaying and managing items in the shopping cart
 * @param {Object} props - Component props
 * @param {Object} props.item - Cart item data
 */
const CartItem = ({ item }) => {
  const { updateItem, removeItem } = useCart();
  
  // Handle quantity change
  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (newQuantity > 0) {
      updateItem(item.id, newQuantity);
    }
  };
  
  // Handle quantity increment
  const handleIncrement = () => {
    updateItem(item.id, item.quantity + 1);
  };
  
  // Handle quantity decrement
  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateItem(item.id, item.quantity - 1);
    }
  };
  
  // Handle item removal
  const handleRemove = () => {
    removeItem(item.id);
  };
  
  // Calculate item total
  const itemTotal = item.price * item.quantity;
  
  return (
    <Card sx={{ mb: 2, p: 2 }}>
      <Grid container spacing={2} alignItems="center">
        {/* Product Image */}
        <Grid item xs={12} sm={3} md={2}>
          <CardMedia
            component="img"
            height="100"
            image={item.image}
            alt={item.title}
            sx={{ objectFit: 'contain', backgroundColor: '#f5f5f5', borderRadius: 1 }}
          />
        </Grid>
        
        {/* Product Details */}
        <Grid item xs={12} sm={5} md={6}>
          <Typography variant="subtitle1" component="div" fontWeight="medium">
            {item.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Price: {formatPrice(item.price)}
          </Typography>
        </Grid>
        
        {/* Quantity Controls */}
        <Grid item xs={6} sm={2} md={2}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton 
              size="small" 
              onClick={handleDecrement}
              disabled={item.quantity <= 1}
            >
              <Remove fontSize="small" />
            </IconButton>
            <TextField
              size="small"
              value={item.quantity}
              onChange={handleQuantityChange}
              inputProps={{ 
                min: 1, 
                style: { textAlign: 'center' },
                'aria-label': 'quantity'
              }}
              sx={{ width: '60px', mx: 1 }}
            />
            <IconButton size="small" onClick={handleIncrement}>
              <Add fontSize="small" />
            </IconButton>
          </Box>
        </Grid>
        
        {/* Item Total and Remove Button */}
        <Grid item xs={6} sm={2} md={2}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {formatPrice(itemTotal)}
            </Typography>
            <IconButton 
              color="error" 
              size="small" 
              onClick={handleRemove}
              sx={{ mt: 1 }}
              aria-label="remove item"
            >
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CartItem;
