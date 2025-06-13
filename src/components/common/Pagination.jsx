import React from 'react';
import { Pagination as MuiPagination, Stack } from '@mui/material';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <Stack spacing={2} alignItems="center" sx={{ mt: 4 }}>
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={(e, value) => onPageChange(value)}
        color="primary"
      />
    </Stack>
  );
};

export default Pagination;
