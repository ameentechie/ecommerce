import React, { useState } from 'react';
import { TextField, Box } from '@mui/material';

const ProductSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <Box sx={{ mb: 3 }}>
      <TextField
        fullWidth
        label="Search products"
        variant="outlined"
        value={searchTerm}
        onChange={handleChange}
      />
    </Box>
  );
};

export default ProductSearch;
