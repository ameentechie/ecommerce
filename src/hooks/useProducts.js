import { useSelector, useDispatch } from 'react-redux';
import { 
  setCategory, 
  setPriceRange, 
  setRating, 
  setSearchQuery, 
  setSortBy, 
  setSortOrder,
  setViewMode,
  resetFilters
} from '../store/slices/productSlice';
import { useGetProductsQuery, useGetProductsByCategoryQuery } from '../store/api/productApi';

/**
 * Custom hook for product filtering, sorting, and display
 * @returns {Object} Product state, filters, and methods
 */
const useProducts = () => {
  const dispatch = useDispatch();
  const filters = useSelector(state => state.products.filters);
  const sortBy = useSelector(state => state.products.sortBy);
  const sortOrder = useSelector(state => state.products.sortOrder);
  const viewMode = useSelector(state => state.products.viewMode);
  
  // Fetch products based on category
  const { 
    data: allProducts = [], 
    isLoading,
    isError,
    error,
    refetch
  } = filters.category === 'all' 
    ? useGetProductsQuery() 
    : useGetProductsByCategoryQuery(filters.category);
  
  // Filter and sort products
  const filteredProducts = allProducts
    .filter(product => {
      // Filter by price range
      const inPriceRange = product.price >= filters.priceRange[0] && 
                           product.price <= filters.priceRange[1];
      
      // Filter by rating
      const hasRating = filters.rating === 0 || 
                       (product.rating && product.rating.rate >= filters.rating);
      
      // Filter by search query
      const matchesSearch = !filters.searchQuery || 
                           product.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(filters.searchQuery.toLowerCase());
      
      return inPriceRange && hasRating && matchesSearch;
    })
    .sort((a, b) => {
      // Sort by selected criteria
      if (sortBy === 'price') {
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      } else if (sortBy === 'rating') {
        const ratingA = a.rating?.rate || 0;
        const ratingB = b.rating?.rate || 0;
        return sortOrder === 'asc' ? ratingA - ratingB : ratingB - ratingA;
      } else if (sortBy === 'newest') {
        // Note: Fake Store API doesn't have date fields, so this is a placeholder
        // In a real app, you would sort by date fields
        return sortOrder === 'asc' ? a.id - b.id : b.id - a.id;
      }
      return 0;
    });
  
  // Filter actions
  const updateCategory = (category) => {
    dispatch(setCategory(category));
  };
  
  const updatePriceRange = (range) => {
    dispatch(setPriceRange(range));
  };
  
  const updateRating = (rating) => {
    dispatch(setRating(rating));
  };
  
  const updateSearchQuery = (query) => {
    dispatch(setSearchQuery(query));
  };
  
  // Sort actions
  const updateSortBy = (sortOption) => {
    dispatch(setSortBy(sortOption));
  };
  
  const updateSortOrder = (order) => {
    dispatch(setSortOrder(order));
  };
  
  // View actions
  const updateViewMode = (mode) => {
    dispatch(setViewMode(mode));
  };
  
  // Reset all filters
  const clearFilters = () => {
    dispatch(resetFilters());
  };
  
  return {
    products: filteredProducts,
    filters,
    sortBy,
    sortOrder,
    viewMode,
    isLoading,
    isError,
    error,
    refetch,
    updateCategory,
    updatePriceRange,
    updateRating,
    updateSearchQuery,
    updateSortBy,
    updateSortOrder,
    updateViewMode,
    clearFilters,
  };
};

export default useProducts;
