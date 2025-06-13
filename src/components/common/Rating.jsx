import React from 'react';
import { Rating as MuiRating, Box } from '@mui/material';

const Rating = ({ value }) => (
  <Box display="flex" alignItems="center">
    <MuiRating value={value} precision={0.5} readOnly size="small" />
  </Box>
);

export default Rating;
