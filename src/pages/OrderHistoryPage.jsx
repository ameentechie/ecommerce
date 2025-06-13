import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Paper,
  Breadcrumbs,
  Link,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Chip,
} from '@mui/material';
import {
  ArrowBack,
  ShoppingBag,
  FilterList,
  Sort,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { selectAllOrders } from '../store/slices/orderSlice';
import OrderCard from '../components/orders/OrderCard';

const OrderHistoryPage = () => {
  const navigate = useNavigate();
  const orders = useSelector(selectAllOrders);
  const currentUser = useSelector((state) => state.user.user);
  
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Filter orders by current user
  const userOrders = orders.filter(order => 
    currentUser ? order.userId === currentUser.id : false
  );

  // Apply filters
  const filteredOrders = userOrders.filter(order => {
    if (statusFilter === 'all') return true;
    return order.status.toLowerCase() === statusFilter.toLowerCase();
  });

  // Apply sorting
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date) - new Date(a.date);
      case 'oldest':
        return new Date(a.date) - new Date(b.date);
      case 'amount-high':
        return b.total - a.total;
      case 'amount-low':
        return a.total - b.total;
      default:
        return 0;
    }
  });

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  const getOrderStats = () => {
    const totalOrders = userOrders.length;
    const totalSpent = userOrders.reduce((sum, order) => sum + order.total, 0);
    const recentOrders = userOrders.filter(order => {
      const orderDate = new Date(order.date);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return orderDate >= thirtyDaysAgo;
    }).length;

    return { totalOrders, totalSpent, recentOrders };
  };

  const stats = getOrderStats();

  const EmptyOrdersState = () => (
    <Paper
      elevation={0}
      sx={{
        textAlign: 'center',
        py: 8,
        px: 4,
        backgroundColor: '#f8fafc',
        borderRadius: 3,
        border: '2px dashed #cbd5e0',
      }}
    >
      <ShoppingBag
        sx={{
          fontSize: 100,
          color: '#a0aec0',
          mb: 3,
        }}
      />
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 600,
          color: '#4a5568',
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          mb: 2,
        }}
      >
        No Orders Yet
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: '#718096',
          mb: 4,
          maxWidth: 400,
          mx: 'auto',
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          lineHeight: 1.6,
        }}
      >
        You haven't placed any orders yet. Start shopping to see your order history here.
      </Typography>
      <Button
        variant="contained"
        size="large"
        startIcon={<ShoppingBag />}
        onClick={handleContinueShopping}
        sx={{
          backgroundColor: '#3182ce',
          color: 'white',
          fontWeight: 600,
          px: 4,
          py: 1.5,
          borderRadius: 2,
          textTransform: 'none',
          fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
          boxShadow: '0 4px 12px rgba(49, 130, 206, 0.4)',
          '&:hover': {
            backgroundColor: '#2c5aa0',
            boxShadow: '0 6px 20px rgba(49, 130, 206, 0.5)',
            transform: 'translateY(-2px)',
          },
        }}
      >
        Start Shopping
      </Button>
    </Paper>
  );

  if (!currentUser) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert
          severity="warning"
          sx={{
            borderRadius: 2,
            backgroundColor: '#fefcbf',
            border: '1px solid #f6e05e',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Please log in to view your orders
          </Typography>
          <Typography variant="body2">
            You need to be logged in to access your order history.
          </Typography>
          <Button 
            variant="outlined" 
            onClick={() => navigate('/login')}
            sx={{ mt: 2 }}
          >
            Go to Login
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs
        sx={{ mb: 3 }}
        separator="›"
        aria-label="breadcrumb"
      >
        <Link
          color="inherit"
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
          }}
          sx={{ 
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' }
          }}
        >
          Home
        </Link>
        <Link
          color="inherit"
          href="/profile"
          onClick={(e) => {
            e.preventDefault();
            navigate('/profile');
          }}
          sx={{ 
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' }
          }}
        >
          Profile
        </Link>
        <Typography color="text.primary">My Orders</Typography>
      </Breadcrumbs>

      {/* Page Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
            sx={{ 
              color: '#3182ce',
              fontWeight: 500,
            }}
          >
            Back
          </Button>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: '#2d3748',
              fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            }}
          >
            My Orders
          </Typography>
        </Box>
      </Box>

      {userOrders.length === 0 ? (
        <EmptyOrdersState />
      ) : (
        <>
          {/* Order Statistics */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 3,
                  textAlign: 'center',
                  borderRadius: 3,
                  border: '1px solid #e2e8f0',
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: '#3182ce',
                    mb: 1,
                  }}
                >
                  {stats.totalOrders}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Orders
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 3,
                  textAlign: 'center',
                  borderRadius: 3,
                  border: '1px solid #e2e8f0',
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: '#e53e3e',
                    mb: 1,
                  }}
                >
                  ${stats.totalSpent.toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Spent
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 3,
                  textAlign: 'center',
                  borderRadius: 3,
                  border: '1px solid #e2e8f0',
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                    color: '#38a169',
                    mb: 1,
                  }}
                >
                  {stats.recentOrders}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Recent Orders (30 days)
                </Typography>
              </Paper>
            </Grid>
          </Grid>

          {/* Filters and Sort */}
          <Paper
            sx={{
              p: 3,
              mb: 4,
              borderRadius: 3,
              border: '1px solid #e2e8f0',
            }}
          >
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth size="small">
                  <InputLabel id="status-filter-label">
                    <FilterList sx={{ mr: 1 }} fontSize="small" />
                    Filter by Status
                  </InputLabel>
                  <Select
                    labelId="status-filter-label"
                    value={statusFilter}
                    label="Filter by Status"
                    onChange={handleStatusFilterChange}
                    sx={{ borderRadius: 2 }}
                  >
                    <MenuItem value="all">All Orders</MenuItem>
                    <MenuItem value="confirmed">Confirmed</MenuItem>
                    <MenuItem value="processing">Processing</MenuItem>
                    <MenuItem value="shipped">Shipped</MenuItem>
                    <MenuItem value="delivered">Delivered</MenuItem>
                    <MenuItem value="cancelled">Cancelled</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6} md={4}>
                <FormControl fullWidth size="small">
                  <InputLabel id="sort-label">
                    <Sort sx={{ mr: 1 }} fontSize="small" />
                    Sort by
                  </InputLabel>
                  <Select
                    labelId="sort-label"
                    value={sortBy}
                    label="Sort by"
                    onChange={handleSortChange}
                    sx={{ borderRadius: 2 }}
                  >
                    <MenuItem value="newest">Newest First</MenuItem>
                    <MenuItem value="oldest">Oldest First</MenuItem>
                    <MenuItem value="amount-high">Amount: High to Low</MenuItem>
                    <MenuItem value="amount-low">Amount: Low to High</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Showing:
                  </Typography>
                  <Chip
                    label={`${sortedOrders.length} orders`}
                    variant="outlined"
                    size="small"
                    sx={{
                      borderColor: '#3182ce',
                      color: '#3182ce',
                      fontWeight: 500,
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Paper>

          {/* Orders List */}
          <Box>
            {sortedOrders.length === 0 ? (
              <Alert
                severity="info"
                sx={{
                  borderRadius: 2,
                  backgroundColor: '#ebf8ff',
                  border: '1px solid #90cdf4',
                }}
              >
                No orders found matching your filters. Try adjusting your filter criteria.
              </Alert>
            ) : (
              <>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: '#2d3748',
                    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                    mb: 3,
                  }}
                >
                  Order History ({sortedOrders.length})
                </Typography>
                
                {sortedOrders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </>
            )}
          </Box>

          {/* Continue Shopping CTA */}
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              variant="outlined"
              size="large"
              startIcon={<ShoppingBag />}
              onClick={handleContinueShopping}
              sx={{
                borderColor: '#3182ce',
                color: '#3182ce',
                fontWeight: 600,
                px: 4,
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                '&:hover': {
                  borderColor: '#2c5aa0',
                  backgroundColor: '#ebf8ff',
                },
              }}
            >
              Continue Shopping
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default OrderHistoryPage; 