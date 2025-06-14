import { 
  Box, 
  CircularProgress, 
  LinearProgress, 
  Typography, 
  Skeleton,
  useTheme,
  Fade
} from '@mui/material';
import { ShoppingCart, Refresh } from '@mui/icons-material';

/**
 * Enhanced Loading spinner component with multiple variants
 * @param {Object} props - Component props
 * @param {string} props.variant - Type of loading spinner ('circular', 'linear', 'skeleton', 'overlay', 'inline', 'cart')
 * @param {string} props.message - Optional message to display
 * @param {number} props.size - Size of the spinner (default: 40)
 * @param {string} props.color - Color of the spinner (default: 'primary')
 * @param {boolean} props.fullScreen - Whether to show as full screen overlay
 * @param {number} props.minHeight - Minimum height for the container
 * @param {boolean} props.showMessage - Whether to show the loading message
 */
const LoadingSpinner = ({ 
  variant = 'circular',
  message = 'Loading...', 
  size = 40, 
  color = 'primary',
  fullScreen = false,
  minHeight = 200,
  showMessage = true
}) => {
  const theme = useTheme();

  // Full screen overlay loading
  if (fullScreen) {
    return (
      <Fade in timeout={300}>
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <CircularProgress size={60} color={color} thickness={4} />
          {showMessage && (
            <Typography 
              variant="h6" 
              sx={{ 
                mt: 3, 
                color: 'text.primary',
                fontWeight: 500
              }}
            >
              {message}
            </Typography>
          )}
        </Box>
      </Fade>
    );
  }

  // Linear progress bar
  if (variant === 'linear') {
    return (
      <Box sx={{ width: '100%', mb: 2 }}>
        <LinearProgress color={color} />
        {showMessage && (
          <Typography 
            variant="body2" 
            sx={{ 
              mt: 1, 
              textAlign: 'center',
              color: 'text.secondary' 
            }}
          >
            {message}
          </Typography>
        )}
      </Box>
    );
  }

  // Skeleton loading
  if (variant === 'skeleton') {
    return (
      <Box sx={{ p: 2 }}>
        <Skeleton variant="rectangular" width="100%" height={200} sx={{ mb: 2 }} />
        <Skeleton variant="text" width="80%" height={30} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="60%" height={20} />
      </Box>
    );
  }

  // Inline loading (small, for buttons)
  if (variant === 'inline') {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <CircularProgress size={16} color={color} />
        {showMessage && (
          <Typography variant="body2" color="text.secondary">
            {message}
          </Typography>
        )}
      </Box>
    );
  }

  // Cart loading with shopping cart icon
  if (variant === 'cart') {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 4,
          minHeight: minHeight,
        }}
      >
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress
            size={size}
            color={color}
            thickness={4}
          />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ShoppingCart 
              sx={{ 
                fontSize: size * 0.4,
                color: theme.palette[color].main 
              }} 
            />
          </Box>
        </Box>
        {showMessage && (
          <Typography 
            variant="body1" 
            sx={{ 
              mt: 2, 
              color: 'text.secondary',
              textAlign: 'center'
            }}
          >
            {message}
          </Typography>
        )}
      </Box>
    );
  }

  // Overlay loading (for components)
  if (variant === 'overlay') {
    return (
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
          borderRadius: 1,
        }}
      >
        <CircularProgress size={size} color={color} />
        {showMessage && (
          <Typography 
            variant="body2" 
            sx={{ 
              mt: 2, 
              color: 'text.secondary' 
            }}
          >
            {message}
          </Typography>
        )}
      </Box>
    );
  }

  // Default circular loading
  return (
    <Fade in timeout={300}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 3,
          minHeight: minHeight,
        }}
      >
        <CircularProgress 
          size={size} 
          color={color} 
          thickness={4}
        />
        {showMessage && (
          <Typography 
            variant="body1" 
            sx={{ 
              mt: 2, 
              color: 'text.secondary',
              textAlign: 'center'
            }}
          >
            {message}
          </Typography>
        )}
      </Box>
    </Fade>
  );
};

export default LoadingSpinner;
