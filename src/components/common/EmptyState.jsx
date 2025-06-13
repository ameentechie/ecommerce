import React from 'react';
import { Box, Typography } from '@mui/material';

const EmptyState = ({ message }) => (
  <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="200px" py={4}>
    <Typography variant="h6" color="textSecondary">
      {message}
    </Typography>
  </Box>
);

export default EmptyState;
