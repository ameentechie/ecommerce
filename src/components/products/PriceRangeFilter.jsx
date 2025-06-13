import React from 'react';
import { Box, Typography, Slider, TextField, InputAdornment } from '@mui/material';
import { AttachMoney } from '@mui/icons-material';

const PriceRangeFilter = ({ priceRange, onPriceRangeChange, minPrice = 0, maxPrice = 1000 }) => {
  const handleSliderChange = (event, newValue) => {
    onPriceRangeChange(newValue);
  };

  const handleMinInputChange = (event) => {
    const value = Number(event.target.value);
    if (!isNaN(value) && value >= minPrice && value <= priceRange[1]) {
      onPriceRangeChange([value, priceRange[1]]);
    }
  };

  const handleMaxInputChange = (event) => {
    const value = Number(event.target.value);
    if (!isNaN(value) && value >= priceRange[0] && value <= maxPrice) {
      onPriceRangeChange([priceRange[0], value]);
    }
  };

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
        Price Range
      </Typography>
      
      <Box sx={{ px: 2, mb: 3 }}>
        <Slider
          value={priceRange}
          onChange={handleSliderChange}
          valueLabelDisplay="auto"
          min={minPrice}
          max={maxPrice}
          valueLabelFormat={(value) => `$${value}`}
          sx={{
            color: '#007bff',
            height: 4,
            '& .MuiSlider-thumb': {
              backgroundColor: '#007bff',
              width: 18,
              height: 18,
              '&:hover': {
                boxShadow: '0 0 0 8px rgba(0, 123, 255, 0.16)',
              },
            },
            '& .MuiSlider-track': {
              backgroundColor: '#007bff',
              border: 'none',
            },
            '& .MuiSlider-rail': {
              backgroundColor: '#e9ecef',
              opacity: 1,
            },
            '& .MuiSlider-valueLabel': {
              backgroundColor: '#343a40',
              borderRadius: '4px',
            },
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          size="small"
          label="Min Price"
          type="number"
          value={priceRange[0]}
          onChange={handleMinInputChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AttachMoney fontSize="small" sx={{ color: '#6c757d' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            flex: 1,
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#ffffff',
              borderRadius: '6px',
              '& fieldset': {
                borderColor: '#e9ecef',
              },
              '&:hover fieldset': {
                borderColor: '#007bff',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#007bff',
                borderWidth: '2px',
              },
              '& input': {
                color: '#343a40',
                fontWeight: 500,
              },
            },
            '& .MuiInputLabel-root': {
              color: '#6c757d',
              '&.Mui-focused': {
                color: '#007bff',
              },
            },
          }}
        />
        <TextField
          size="small"
          label="Max Price"
          type="number"
          value={priceRange[1]}
          onChange={handleMaxInputChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AttachMoney fontSize="small" sx={{ color: '#6c757d' }} />
              </InputAdornment>
            ),
          }}
          sx={{
            flex: 1,
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#ffffff',
              borderRadius: '6px',
              '& fieldset': {
                borderColor: '#e9ecef',
              },
              '&:hover fieldset': {
                borderColor: '#007bff',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#007bff',
                borderWidth: '2px',
              },
              '& input': {
                color: '#343a40',
                fontWeight: 500,
              },
            },
            '& .MuiInputLabel-root': {
              color: '#6c757d',
              '&.Mui-focused': {
                color: '#007bff',
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default PriceRangeFilter; 