import React from 'react';
import { Box, Typography, Rating, ButtonGroup, Button } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';

const RatingFilter = ({ minRating, onRatingChange }) => {
  const ratingOptions = [
    { value: 0, label: 'All Ratings' },
    { value: 1, label: '1+ Stars' },
    { value: 2, label: '2+ Stars' },
    { value: 3, label: '3+ Stars' },
    { value: 4, label: '4+ Stars' },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Typography 
        variant="h6" 
        gutterBottom 
        sx={{ 
          color: '#343a40',
          fontWeight: 600,
          fontSize: '1rem',
          mb: 3
        }}
      >
        Minimum Rating
      </Typography>
      
      <ButtonGroup
        orientation="vertical"
        size="medium"
        sx={{ width: '100%' }}
      >
        {ratingOptions.map(({ value, label }) => (
          <Button
            key={value}
            variant={minRating === value ? 'contained' : 'outlined'}
            onClick={() => onRatingChange(value)}
            startIcon={value > 0 ? <Star fontSize="small" /> : <StarBorder fontSize="small" />}
            sx={{
              justifyContent: 'flex-start',
              minHeight: '44px',
              paddingY: '12px',
              paddingX: '16px',
              borderRadius: '6px',
              marginBottom: '8px',
              backgroundColor: minRating === value 
                ? '#007bff' 
                : '#ffffff',
              borderColor: '#e9ecef',
              color: minRating === value ? '#ffffff' : '#343a40',
              fontWeight: minRating === value ? 600 : 500,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: minRating === value 
                  ? '#0056b3' 
                  : '#f8f9fa',
                borderColor: '#007bff',
              },
              '&:not(:last-child)': {
                borderBottom: '1px solid #e9ecef',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
              <Typography variant="body2" sx={{ fontWeight: 'inherit' }}>
                {label}
              </Typography>
              {value > 0 && (
                <Rating
                  value={value}
                  max={5}
                  size="small"
                  readOnly
                  sx={{ 
                    ml: 'auto',
                    '& .MuiRating-iconFilled': {
                      color: minRating === value ? '#ffffff' : '#ffc107',
                    },
                    '& .MuiRating-iconEmpty': {
                      color: minRating === value ? 'rgba(255, 255, 255, 0.5)' : '#e9ecef',
                    },
                  }}
                />
              )}
            </Box>
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
};

export default RatingFilter; 