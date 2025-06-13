import React, { useEffect, useState } from 'react';
import { useGetCategoriesQuery } from '../../store/api/productApi';
import { FormControl, InputLabel, Select, MenuItem, InputAdornment } from '@mui/material';
import { Category } from '@mui/icons-material';

const ProductFilters = ({ onCategoryChange, initialCategory = '' }) => {
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const [selected, setSelected] = useState(initialCategory);

  // Update local state when initialCategory changes
  useEffect(() => {
    setSelected(initialCategory);
  }, [initialCategory]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSelected(value);
    onCategoryChange(value);
  };

  if (isLoading) return null;

  return (
    <FormControl fullWidth>
      <InputLabel 
        sx={{ 
          color: '#6c757d',
          fontWeight: 500,
          '&.Mui-focused': {
            color: '#007bff',
          },
        }}
      >
        Category
      </InputLabel>
      <Select 
        value={selected} 
        label="Category" 
        onChange={handleChange}
        startAdornment={
          <InputAdornment position="start">
            <Category sx={{ color: '#6c757d', ml: 1 }} />
          </InputAdornment>
        }
        sx={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          minHeight: '56px',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#e9ecef',
            borderWidth: '1px',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#007bff',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#007bff',
            borderWidth: '2px',
          },
          '& .MuiSelect-select': {
            color: '#343a40',
            fontSize: '1rem',
            fontWeight: 400,
            paddingLeft: '48px',
          },
        }}
      >
        <MenuItem value="" sx={{ color: '#6c757d' }}>All Categories</MenuItem>
        {categories?.map((cat) => (
          <MenuItem 
            value={cat} 
            key={cat}
            sx={{ 
              color: '#343a40',
              '&:hover': {
                backgroundColor: '#f8f9fa',
              },
            }}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ProductFilters;
