import { Box, CircularProgress, Typography } from '@mui/material';

/**
 * Loading spinner component with optional message
 * @param {Object} props - Component props
 * @param {string} props.message - Optional message to display
 * @param {number} props.size - Size of the spinner (default: 40)
 * @param {string} props.color - Color of the spinner (default: 'primary')
 */
const LoadingSpinner = ({ message = 'Loading...', size = 40, color = 'primary' }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
        minHeight: '200px',
      }}
    >
      <CircularProgress size={size} color={color} />
      {message && (
        <Typography variant="body1" sx={{ mt: 2, color: 'text.secondary' }}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default LoadingSpinner;
