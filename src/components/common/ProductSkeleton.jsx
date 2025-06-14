import { 
  Card, 
  CardContent, 
  CardMedia, 
  Skeleton, 
  Box, 
  Grid 
} from '@mui/material';

/**
 * Product card skeleton loading component
 * @param {Object} props - Component props
 * @param {number} props.count - Number of skeleton cards to show (default: 1)
 * @param {boolean} props.showGrid - Whether to wrap in grid layout
 */
const ProductSkeleton = ({ count = 1, showGrid = false }) => {
  const skeletonCard = (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        animation: 'pulse 1.5s ease-in-out infinite',
      }}
    >
      {/* Product Image Skeleton */}
      <Skeleton 
        variant="rectangular" 
        height={200}
        sx={{ 
          bgcolor: 'grey.200',
          borderRadius: 0 
        }}
      />
      
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        {/* Product Title Skeleton */}
        <Skeleton 
          variant="text" 
          width="90%" 
          height={28}
          sx={{ mb: 1 }}
        />
        
        {/* Product Description Skeleton */}
        <Skeleton 
          variant="text" 
          width="100%" 
          height={20}
          sx={{ mb: 0.5 }}
        />
        <Skeleton 
          variant="text" 
          width="75%" 
          height={20}
          sx={{ mb: 2 }}
        />
        
        {/* Rating Skeleton */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Skeleton 
            variant="rectangular" 
            width={100} 
            height={20}
            sx={{ mr: 1 }}
          />
          <Skeleton 
            variant="text" 
            width={40} 
            height={20}
          />
        </Box>
        
        {/* Price and Button Skeleton */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Skeleton 
            variant="text" 
            width={80} 
            height={32}
          />
          <Skeleton 
            variant="rectangular" 
            width={100} 
            height={36}
            sx={{ borderRadius: 1 }}
          />
        </Box>
      </CardContent>
    </Card>
  );

  if (showGrid) {
    return (
      <Grid container spacing={3}>
        {Array.from({ length: count }).map((_, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            {skeletonCard}
          </Grid>
        ))}
      </Grid>
    );
  }

  if (count === 1) {
    return skeletonCard;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {Array.from({ length: count }).map((_, index) => (
        <Box key={index}>
          {skeletonCard}
        </Box>
      ))}
    </Box>
  );
};

export default ProductSkeleton; 