// src/components/layout/Header.jsx
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  MenuItem,
  Menu,
  Button,
  InputBase,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  CircularProgress,
  Popper,
  Paper,
  ClickAwayListener,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  AccountCircle,
  ShoppingCart,
  Home,
  Category,
} from '@mui/icons-material';
import { logout } from '../../store/slices/userSlice';
import { useGetProductsQuery } from '../../store/api/productApi';

// Styled components for search bar
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '4px',
  backgroundColor: '#fff',
  marginLeft: theme.spacing(3),
  marginRight: theme.spacing(3),
  width: '100%',
  maxWidth: '600px',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: '#000',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.2, 1, 1.2, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%',
    '::placeholder': {
      color: '#555',
      opacity: 1,
    },
  },
}));

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchAnchorEl, setSearchAnchorEl] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const cartItemCount = useSelector(state => state.cart?.items?.length || 0);
  const { user, token } = useSelector(state => state.user);
  const isAuthenticated = Boolean(user && token);

  // Fetch products for search suggestions
  const { data: products, isLoading } = useGetProductsQuery();

  const isMenuOpen = Boolean(anchorEl);

  // Filter products based on search query
  const filteredProducts = products?.filter(product => 
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5) || [];

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setShowSuggestions(true);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (product) => {
    navigate(`/products/${product.id}`);
    setSearchQuery('');
    setShowSuggestions(false);
  };

  const handleSearchFocus = () => {
    if (searchQuery.trim()) {
      setShowSuggestions(true);
    }
  };

  const handleSearchBlur = () => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
    navigate('/');
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {isAuthenticated ? (
        <>
          <MenuItem onClick={() => { handleMenuClose(); navigate('/profile'); }}>
            Profile
          </MenuItem>
          <MenuItem onClick={() => { handleMenuClose(); navigate('/orders'); }}>
            My Orders
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            Logout
          </MenuItem>
        </>
      ) : (
        <>
          <MenuItem onClick={() => { handleMenuClose(); navigate('/login'); }}>
            Login
          </MenuItem>
          <MenuItem onClick={() => { handleMenuClose(); navigate('/register'); }}>
            Register
          </MenuItem>
        </>
      )}
    </Menu>
  );

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
      <List>
        <ListItem button component={RouterLink} to="/">
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={RouterLink} to="/products">
          <ListItemIcon>
            <Category />
          </ListItemIcon>
          <ListItemText primary="All Products" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem>
          <ListItemText primary="Categories" primaryTypographyProps={{ fontWeight: 'bold' }} />
        </ListItem>
        {['Electronics', 'Jewelry', "Men's Clothing", "Women's Clothing"].map((text) => (
          <ListItem
            button
            key={text}
            component={RouterLink}
            to={`/products?category=${encodeURIComponent(text.toLowerCase())}`}
          >
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: '#131921',
          color: '#fff',
          minHeight: '60px',
          zIndex: (theme) => theme.zIndex.appBar + 2, // ensure header is on top
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Left side - Menu + Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                display: { xs: 'none', sm: 'block' },
                textDecoration: 'none',
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '20px',
              }}
            >
              ShopSmart
            </Typography>
          </Box>

          {/* Center - Search bar */}
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', position: 'relative' }}>
            <form onSubmit={handleSearchSubmit} style={{ width: '100%', maxWidth: '600px' }}>
              <Search>
                <SearchIconWrapper>
                  {isLoading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <SearchIcon />
                  )}
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search for products, brands and more…"
                  inputProps={{ 'aria-label': 'search' }}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                />
              </Search>
            </form>

            {/* Search Suggestions */}
            {showSuggestions && searchQuery.trim() && (
              <Paper
                sx={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '100%',
                  maxWidth: '600px',
                  mt: 1,
                  zIndex: 1,
                  maxHeight: '400px',
                  overflow: 'auto',
                }}
              >
                {isLoading ? (
                  <Box sx={{ p: 2, textAlign: 'center' }}>
                    <CircularProgress size={20} />
                  </Box>
                ) : filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <Box
                      key={product.id}
                      onClick={() => handleSuggestionClick(product)}
                      sx={{
                        p: 2,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        '&:hover': {
                          bgcolor: 'action.hover',
                        },
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                      }}
                    >
                      <Box
                        component="img"
                        src={product.image}
                        alt={product.title}
                        sx={{
                          width: 40,
                          height: 40,
                          objectFit: 'contain',
                        }}
                      />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {product.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          ${product.price}
                        </Typography>
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Box sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      No products found
                    </Typography>
                  </Box>
                )}
              </Paper>
            )}
          </Box>

          {/* Right side - Links */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            <Button
              color="inherit"
              component={RouterLink}
              to="/products"
              sx={{
                fontWeight: 'normal',
                textTransform: 'none',
                fontSize: '14px',
                color: '#fff',
              }}
            >
              Products
            </Button>
            {isAuthenticated && (
              <Button
                color="inherit"
                component={RouterLink}
                to="/orders"
                sx={{
                  fontWeight: 'normal',
                  textTransform: 'none',
                  fontSize: '14px',
                  color: '#fff',
                }}
              >
                Returns & Orders
              </Button>
            )}
            <IconButton
              size="large"
              color="inherit"
              component={RouterLink}
              to="/cart"
            >
              <Badge badgeContent={cartItemCount} color="error">
                <ShoppingCart />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              onClick={handleProfileMenuOpen}
            >
              <AccountCircle />
            </IconButton>
          </Box>

          {/* Mobile view - Account icon only */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              color="inherit"
              onClick={handleProfileMenuOpen}
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Header;
