import React, { useEffect, useState } from 'react';
import { useGetCategoriesQuery } from '../../store/api/productApi';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const ProductFilters = ({ onCategoryChange }) => {
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const [selected, setSelected] = useState('');

  const handleChange = (e) => {
    setSelected(e.target.value);
    onCategoryChange(e.target.value);
  };

  if (isLoading) return null;

  return (
    <FormControl fullWidth>
      <InputLabel>Category</InputLabel>
      <Select value={selected} label="Category" onChange={handleChange}>
        <MenuItem value="">All</MenuItem>
        {categories.map((cat) => (
          <MenuItem value={cat} key={cat}>{cat}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ProductFilters;
