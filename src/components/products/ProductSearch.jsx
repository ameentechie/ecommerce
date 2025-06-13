import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';

const ProductSearch = ({ onSearch, initialValue = '' }) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);

  // Update local state when initialValue changes
  useEffect(() => {
    setSearchTerm(initialValue);
  }, [initialValue]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <TextField
      fullWidth
      label="Search Products"
      variant="outlined"
      value={searchTerm}
      onChange={handleChange}
      placeholder="Search by name, description"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search sx={{ color: '#6c757d' }} />
          </InputAdornment>
        ),
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          paddingLeft: '12px',
          paddingRight: '16px',
          minHeight: '56px',
          '& fieldset': {
            borderColor: '#e9ecef',
            borderWidth: '1px',
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
            fontSize: '1rem',
            fontWeight: 400,
            '&::placeholder': {
              color: '#6c757d',
              opacity: 1,
            },
          },
        },
        '& .MuiInputLabel-root': {
          color: '#6c757d',
          fontWeight: 500,
          '&.Mui-focused': {
            color: '#007bff',
          },
        },
      }}
    />
  );
};

export default ProductSearch;
