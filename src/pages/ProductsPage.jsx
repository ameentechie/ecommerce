import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  ToggleButtonGroup,
  ToggleButton,
  Breadcrumbs,
  Link,
  Pagination,
  Chip,
  Drawer,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  GridView as GridViewIcon,
  ViewList as ListViewIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useGetProductsQuery, useGetCategoriesQuery } from '../store/api/productApi';
import { 
  setViewMode, 
  setSortOption, 
  setCategory,
  setSearchQuery,
  resetFilters
} from '../store/slices/productSlice';
import { SORT_OPTIONS, VIEW_MODES } from '../utils/constants';
import ProductCard from '../components/products/ProductCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorBoundary from '../components/common/ErrorBoundary';

/**
 * ProductsPage component for displaying and filtering products
 */
const ProductsPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  // Get filter state from Redux
  const { 
    viewMode, 
    sortOption, 
    category: selectedCategory,
    searchQuery: storeSearchQuery
  } = useSelector((state) => state.products);

  // Get URL parameters
  const urlCategory = searchParams.get('category');
  const urlSearch = searchParams.get('search');

  // Initialize filters from URL if present
  useEffect(() => {
    if (urlCategory && urlCategory !== selectedCategory) {
      dispatch(setCategory(urlCategory));
    }
    
    if (urlSearch && urlSearch !== storeSearchQuery) {
      dispatch(setSearchQuery(urlSearch));
    }
  }, [urlCategory, urlSearch, dispatch, selectedCategory, storeSearchQuery]);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (selectedCategory) {
      params.set('category', selectedCategory);
    }
    
    if (storeSearchQuery) {
      params.set('search', storeSearchQuery);
    }
    
    setSearchParams(params);
  }, [selectedCategory, storeSearchQuery, setSearchParams]);

  // Fetch categories
  const { 
    data: categories = [], 
    isLoading: categoriesLoading 
  } = useGetCategoriesQuery();

  // Fetch products with filters
  const {
    data: productsData,
    isLoading: productsLoading,
    error: productsError,
  } = useGetProductsQuery({
    category: selectedCategory,
    limit: 100, // We'll handle pagination on the client side
  });

  // Filter and sort products
  const filteredProducts = productsData
    ? productsData.filter(product => 
        storeSearchQuery 
          ? product.title.toLowerCase().includes(storeSearchQuery.toLowerCase()) 
          : true
      )
    : [];

  // Sort products based on selected sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case SORT_OPTIONS.PRICE_LOW_TO_HIGH:
        return a.price - b.price;
      case SORT_OPTIONS.PRICE_HIGH_TO_LOW:
        return b.price - a.price;
      case SORT_OPTIONS.RATING:
        return (b.rating?.rate || 0) - (a.rating?.rate || 0);
      default:
        return 0;
    }
  });

  // Paginate products
  const paginatedProducts = sortedProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Calculate total pages
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);

  // Handle view mode change
  const handleViewModeChange = (_, newMode) => {
    if (newMode !== null) {
      dispatch(setViewMode(newMode));
    }
  };

  // Handle sort option change
  const handleSortChange = (event) => {
    dispatch(setSortOption(event.target.value));
  };

  // Handle category change
  const handleCategoryChange = (event) => {
    dispatch(setCategory(event.target.value));
    setPage(1); // Reset to first page when changing category
  };

  // Handle search
  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      dispatch(setSearchQuery(event.target.value));
      setPage(1); // Reset to first page when searching
    }
  };

  // Handle page change
  const handlePageChange = (_, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle filter drawer toggle
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Handle clear filters
  const handleClearFilters = () => {
    dispatch(resetFilters());
    setPage(1);
  };

  // Render loading state
  if (productsLoading || categoriesLoading) {
    return <LoadingSpinner message="Loading products..." />;
  }

  // Render error state
  if (productsError) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error" variant="h6">
          Error loading products. Please try again later.
        </Typography>
      </Box>
    );
  }

  return (
    <ErrorBoundary>
      <Container maxWidth="xl">
        {/* Breadcrumbs */}
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Typography color="text.primary">Products</Typography>
          {selectedCategory && (
            <Typography color="text.primary">{selectedCategory}</Typography>
          )}
        </Breadcrumbs>

        {/* Page Title */}
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" component="h1">
            {selectedCategory 
              ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`
              : 'All Products'}
          </Typography>
          
          {isMobile && (
            <Button 
              startIcon={<FilterListIcon />}
              variant="outlined"
              onClick={toggleDrawer}
            >
              Filters
            </Button>
          )}
        </Box>

        {/* Filter chips */}
        {(selectedCategory || storeSearchQuery) && (
          <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {selectedCategory && (
              <Chip 
                label={`Category: ${selectedCategory}`} 
                onDelete={() => dispatch(setCategory(''))}
              />
            )}
            {storeSearchQuery && (
              <Chip 
                label={`Search: ${storeSearchQuery}`} 
                onDelete={() => dispatch(setSearchQuery(''))}
              />
            )}
            {(selectedCategory || storeSearchQuery) && (
              <Chip 
                label="Clear All" 
                color="primary" 
                onClick={handleClearFilters}
              />
            )}
          </Box>
        )}

        <Grid container spacing={3}>
          {/* Filters - Desktop */}
          {!isMobile && (
            <Grid item xs={12} md={3}>
              <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Filters
                </Typography>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="category-select-label">Category</InputLabel>
                  <Select
                    labelId="category-select-label"
                    id="category-select"
                    value={selectedCategory}
                    label="Category"
                    onChange={handleCategoryChange}
                  >
                    <MenuItem value="">All Categories</MenuItem>
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                
                <FormControl fullWidth margin="normal">
                  <InputLabel id="sort-select-label">Sort By</InputLabel>
                  <Select
                    labelId="sort-select-label"
                    id="sort-select"
                    value={sortOption}
                    label="Sort By"
                    onChange={handleSortChange}
                  >
                    <MenuItem value={SORT_OPTIONS.FEATURED}>Featured</MenuItem>
                    <MenuItem value={SORT_OPTIONS.PRICE_LOW_TO_HIGH}>Price: Low to High</MenuItem>
                    <MenuItem value={SORT_OPTIONS.PRICE_HIGH_TO_LOW}>Price: High to Low</MenuItem>
                    <MenuItem value={SORT_OPTIONS.RATING}>Top Rated</MenuItem>
                  </Select>
                </FormControl>
                
                <TextField
                  fullWidth
                  margin="normal"
                  label="Search Products"
                  variant="outlined"
                  defaultValue={storeSearchQuery}
                  onKeyDown={handleSearch}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Paper>
            </Grid>
          )}

          {/* Products Grid */}
          <Grid item xs={12} md={!isMobile ? 9 : 12}>
            {/* View Controls */}
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2 
              }}
            >
              <Typography variant="body2" color="text.secondary">
                Showing {paginatedProducts.length} of {filteredProducts.length} products
              </Typography>
              
              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={handleViewModeChange}
                aria-label="view mode"
                size="small"
              >
                <ToggleButton value={VIEW_MODES.GRID} aria-label="grid view">
                  <GridViewIcon />
                </ToggleButton>
                <ToggleButton value={VIEW_MODES.LIST} aria-label="list view">
                  <ListViewIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            {/* Products Display */}
            {filteredProducts.length === 0 ? (
              <Paper sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>
                  No products found
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Try adjusting your search or filter criteria
                </Typography>
                <Button 
                  variant="contained" 
                  sx={{ mt: 2 }}
                  onClick={handleClearFilters}
                >
                  Clear Filters
                </Button>
              </Paper>
            ) : (
              <Grid 
                container 
                spacing={2} 
                columns={viewMode === VIEW_MODES.GRID ? { xs: 12, sm: 12, md: 12 } : { xs: 12 }}
              >
                {paginatedProducts.map((product) => (
                  <Grid 
                    item 
                    key={product.id} 
                    xs={12}
                    sm={viewMode === VIEW_MODES.GRID ? 6 : 12}
                    md={viewMode === VIEW_MODES.GRID ? 4 : 12}
                    lg={viewMode === VIEW_MODES.GRID ? 3 : 12}
                  >
                    <ProductCard product={product} />
                  </Grid>
                ))}
              </Grid>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination 
                  count={totalPages} 
                  page={page} 
                  onChange={handlePageChange} 
                  color="primary" 
                />
              </Box>
            )}
          </Grid>
        </Grid>

        {/* Mobile Filter Drawer */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer}
        >
          <Box sx={{ width: 280, p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Filters</Typography>
              <IconButton onClick={toggleDrawer}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Divider sx={{ mb: 2 }} />
            
            <FormControl fullWidth margin="normal">
              <InputLabel id="mobile-category-select-label">Category</InputLabel>
              <Select
                labelId="mobile-category-select-label"
                id="mobile-category-select"
                value={selectedCategory}
                label="Category"
                onChange={handleCategoryChange}
              >
                <MenuItem value="">All Categories</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            
            <FormControl fullWidth margin="normal">
              <InputLabel id="mobile-sort-select-label">Sort By</InputLabel>
              <Select
                labelId="mobile-sort-select-label"
                id="mobile-sort-select"
                value={sortOption}
                label="Sort By"
                onChange={handleSortChange}
              >
                <MenuItem value={SORT_OPTIONS.FEATURED}>Featured</MenuItem>
                <MenuItem value={SORT_OPTIONS.PRICE_LOW_TO_HIGH}>Price: Low to High</MenuItem>
                <MenuItem value={SORT_OPTIONS.PRICE_HIGH_TO_LOW}>Price: High to Low</MenuItem>
                <MenuItem value={SORT_OPTIONS.RATING}>Top Rated</MenuItem>
              </Select>
            </FormControl>
            
            <TextField
              fullWidth
              margin="normal"
              label="Search Products"
              variant="outlined"
              defaultValue={storeSearchQuery}
              onKeyDown={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            
            <Button 
              fullWidth 
              variant="contained" 
              color="primary" 
              onClick={toggleDrawer}
              sx={{ mt: 2 }}
            >
              Apply Filters
            </Button>
            
            <Button 
              fullWidth 
              variant="outlined" 
              onClick={handleClearFilters}
              sx={{ mt: 1 }}
            >
              Clear All
            </Button>
          </Box>
        </Drawer>
      </Container>
    </ErrorBoundary>
  );
};

export default ProductsPage;
