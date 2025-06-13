import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ToggleButton,
  ToggleButtonGroup,
  Chip,
  Divider,
  Collapse,
  Button,
  IconButton
} from '@mui/material';
import { 
  ViewModule, 
  ViewList, 
  FilterList,
  Sort,
  ExpandMore,
  ExpandLess,
  Tune
} from '@mui/icons-material';
import ProductGrid from '../components/products/ProductGrid';
import ProductFilters from '../components/products/ProductFilters';
import ProductSearch from '../components/products/ProductSearch';
import PriceRangeFilter from '../components/products/PriceRangeFilter';
import RatingFilter from '../components/products/RatingFilter';
import Pagination from '../components/common/Pagination';
import { useProducts } from '../hooks/useProducts';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [minRating, setMinRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const { data: products, isLoading } = useProducts();

  // Calculate actual price range from products
  const actualPriceRange = React.useMemo(() => {
    if (!products) return [0, 1000];
    const prices = products.map(p => parseFloat(p.price)).filter(p => !isNaN(p));
    return [Math.floor(Math.min(...prices)), Math.ceil(Math.max(...prices))];
  }, [products]);

  // Initialize state from URL parameters
  useEffect(() => {
    const urlSearchTerm = searchParams.get('search') || '';
    const urlCategory = searchParams.get('category') || '';
    const urlSort = searchParams.get('sort') || 'newest';
    const urlView = searchParams.get('view') || 'grid';
    const urlMinPrice = searchParams.get('minPrice');
    const urlMaxPrice = searchParams.get('maxPrice');
    const urlMinRating = searchParams.get('minRating');
    
    setSearchTerm(urlSearchTerm);
    setSelectedCategory(urlCategory);
    setSortBy(urlSort);
    setViewMode(urlView);
    
    if (urlMinPrice && urlMaxPrice) {
      setPriceRange([parseFloat(urlMinPrice), parseFloat(urlMaxPrice)]);
    } else if (actualPriceRange[0] !== 0 || actualPriceRange[1] !== 1000) {
      setPriceRange(actualPriceRange);
    }
    
    if (urlMinRating) {
      setMinRating(parseFloat(urlMinRating));
    }
  }, [searchParams, actualPriceRange]);

  // Update URL when filters change
  const updateUrlParams = (updates) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });
    setSearchParams(newParams);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
    updateUrlParams({ search: value });
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setCurrentPage(1);
    updateUrlParams({ category: value });
  };

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortBy(value);
    updateUrlParams({ sort: value });
  };

  const handleViewModeChange = (event, newViewMode) => {
    if (newViewMode) {
      setViewMode(newViewMode);
      updateUrlParams({ view: newViewMode });
    }
  };

  const handlePriceRangeChange = (newRange) => {
    setPriceRange(newRange);
    setCurrentPage(1);
    updateUrlParams({ minPrice: newRange[0], maxPrice: newRange[1] });
  };

  const handleRatingChange = (rating) => {
    setMinRating(rating);
    setCurrentPage(1);
    updateUrlParams({ minRating: rating > 0 ? rating : null });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSortBy('newest');
    setPriceRange(actualPriceRange);
    setMinRating(0);
    setCurrentPage(1);
    setSearchParams({});
  };

  const activeFiltersCount = [
    searchTerm,
    selectedCategory,
    sortBy !== 'newest',
    priceRange[0] !== actualPriceRange[0] || priceRange[1] !== actualPriceRange[1],
    minRating > 0
  ].filter(Boolean).length;

  return (
    <Box sx={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
    <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Page Header */}
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              fontWeight: 600,
              color: '#343a40',
              fontSize: { xs: '1.75rem', md: '2.125rem' }
            }}
          >
            Products
          </Typography>
          <Typography variant="body1" sx={{ color: '#6c757d' }}>
            Discover our wide range of products
          </Typography>
        </Box>

        {/* Modern Filter Section - Two Row Layout */}
        <Paper
          elevation={0}
          sx={{
            mb: 4,
            borderRadius: '12px',
            border: '1px solid #e9ecef',
            backgroundColor: '#ffffff',
            overflow: 'hidden',
          }}
        >
          {/* Top Row - Search and Category */}
          <Box sx={{ p: 3, backgroundColor: '#ffffff' }}>
            <Grid container spacing={3} alignItems="stretch">
              <Grid item xs={12} md={6}>
                <ProductSearch 
                  onSearch={handleSearchChange} 
                  initialValue={searchTerm}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <ProductFilters 
                  onCategoryChange={handleCategoryChange}
                  initialCategory={selectedCategory}
                />
              </Grid>
            </Grid>
          </Box>

          {/* Divider */}
          <Divider sx={{ borderColor: '#e9ecef' }} />

          {/* Bottom Row - Controls */}
          <Box sx={{ p: 3, backgroundColor: '#f8f9fa' }}>
            <Grid container spacing={3} alignItems="center">
              {/* Sort Dropdown */}
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth size="small">
                  <InputLabel sx={{ color: '#6c757d' }}>Sort By</InputLabel>
                  <Select
                    value={sortBy}
                    label="Sort By"
                    onChange={handleSortChange}
                    sx={{
                      backgroundColor: '#ffffff',
                      borderRadius: '8px',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#e9ecef',
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
                        fontWeight: 500,
                      },
                    }}
                  >
                    <MenuItem value="newest">Newest First</MenuItem>
                    <MenuItem value="price_low">Price: Low to High</MenuItem>
                    <MenuItem value="price_high">Price: High to Low</MenuItem>
                    <MenuItem value="rating">Highest Rated</MenuItem>
                    <MenuItem value="popularity">Most Popular</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* View Toggle */}
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#6c757d',
                      fontWeight: 500,
                      minWidth: 'max-content'
                    }}
                  >
                    View:
                  </Typography>
                  <ToggleButtonGroup
                    value={viewMode}
                    exclusive
                    onChange={handleViewModeChange}
                    size="small"
                    sx={{
                      '& .MuiToggleButton-root': {
                        border: '1px solid #e9ecef',
                        borderRadius: '6px !important',
                        color: '#6c757d',
                        backgroundColor: '#ffffff',
                        minWidth: '44px',
                        height: '38px',
                        '&:hover': {
                          backgroundColor: '#f8f9fa',
                          borderColor: '#007bff',
                        },
                        '&.Mui-selected': {
                          backgroundColor: '#007bff',
                          color: '#ffffff',
                          borderColor: '#007bff',
                          '&:hover': {
                            backgroundColor: '#0056b3',
                          },
                        },
                      },
                    }}
                  >
                    <ToggleButton value="grid" aria-label="grid view">
                      <ViewModule fontSize="small" />
                    </ToggleButton>
                    <ToggleButton value="list" aria-label="list view">
                      <ViewList fontSize="small" />
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Box>
              </Grid>

              {/* Advanced Filters and Active Filter Count */}
              <Grid item xs={12} md={6}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 2, 
                  justifyContent: { xs: 'flex-start', md: 'flex-end' },
                  flexWrap: 'wrap'
                }}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Tune />}
                    endIcon={showAdvancedFilters ? <ExpandLess /> : <ExpandMore />}
                    onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    sx={{
                      minHeight: '38px',
                      borderColor: '#e9ecef',
                      color: '#343a40',
                      backgroundColor: '#ffffff',
                      fontWeight: 500,
                      borderRadius: '8px',
                      '&:hover': {
                        borderColor: '#007bff',
                        backgroundColor: '#f8f9fa',
                      },
                    }}
                  >
                    Advanced Filters
                  </Button>
                  
                  {activeFiltersCount > 0 && (
                    <Chip
                      icon={<FilterList fontSize="small" />}
                      label={`${activeFiltersCount} filter${activeFiltersCount > 1 ? 's' : ''}`}
                      variant="filled"
                      size="small"
                      onDelete={clearFilters}
                      sx={{
                        backgroundColor: '#007bff',
                        color: '#ffffff',
                        fontWeight: 500,
                        '& .MuiChip-deleteIcon': {
                          color: 'rgba(255, 255, 255, 0.8)',
                          '&:hover': {
                            color: '#ffffff',
                          },
                        },
                      }}
                    />
                  )}
                </Box>
              </Grid>
            </Grid>
      </Box>

          {/* Advanced Filters Collapsible Section */}
          <Collapse in={showAdvancedFilters}>
            <Divider sx={{ borderColor: '#e9ecef' }} />
            <Box sx={{ p: 3, backgroundColor: '#ffffff' }}>
              <Typography 
                variant="h6" 
                gutterBottom 
                sx={{ 
                  color: '#343a40',
                  fontWeight: 600,
                  mb: 3,
                  fontSize: '1.1rem'
                }}
              >
                Advanced Filters
              </Typography>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <PriceRangeFilter 
                    priceRange={priceRange}
                    onPriceRangeChange={handlePriceRangeChange}
                    minPrice={actualPriceRange[0]}
                    maxPrice={actualPriceRange[1]}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <RatingFilter 
                    minRating={minRating}
                    onRatingChange={handleRatingChange}
                  />
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </Paper>

        {/* Products Display */}
      <ProductGrid
        products={products}
        isLoading={isLoading}
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
          sortBy={sortBy}
          viewMode={viewMode}
          priceRange={priceRange}
          minRating={minRating}
        currentPage={currentPage}
      />

        {/* Pagination */}
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
      <Pagination
        currentPage={currentPage}
            totalPages={Math.ceil((products?.length || 0) / 12)}
        onPageChange={setCurrentPage}
      />
        </Box>
    </Container>
    </Box>
  );
};

export default ProductsPage;
