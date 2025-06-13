import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Paper,
  Card,
  CardMedia,
  CardContent,
  Divider,
} from '@mui/material';
import { ShoppingBag, Favorite, LocalShipping, Support, WrapText } from '@mui/icons-material';
import { useGetProductsQuery } from '../store/api/productApi';
import ProductCard from '../components/products/ProductCard';

/**
 * HomePage component - Landing page for ShopSmart
 */
const HomePage = () => {
  // Fetch featured products using RTK Query
  const { data: products, isLoading } = useGetProductsQuery({ limit: 4, page: 1 });
  
  // Featured categories - in a real app, these might come from an API
  const categories = [
    { id: 1, name: "Electronics", image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" },
    { id: 2, name: "Jewelry", image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg" },
    { id: 3, name: "Men's Clothing", image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg" },
    { id: 4, name: "Women's Clothing", image: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg" },
  ];
  
  return (
    <Box>
      {/* Hero Section */}
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          backgroundImage: 'url(https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)',
          height: { xs: '60vh', md: '70vh' },
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Increase the priority of the hero background image */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,.5)',
            backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 100%)',
          }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: 'relative',
                  p: { xs: 3, md: 6 },
                  pr: { md: 0 },
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                }}
              >
                <Typography 
                  component="h1" 
                  variant="h2" 
                  color="inherit" 
                  sx={{ 
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    mb: 1
                  }}
                >
                  Summer Sale
                </Typography>
                <Typography 
                  variant="h3" 
                  color="primary.light" 
                  sx={{ 
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                    mb: 2
                  }}
                >
                  Up to 50% Off
                </Typography>
                <Typography 
                  variant="h5" 
                  color="inherit" 
                  sx={{
                    mb: 3,
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                  }}
                >
                  Discover our latest collection of trendy fashion, electronics, and more.
                  Limited time offer - Don't miss out!
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    component={RouterLink}
                    to="/products"
                    sx={{ 
                      py: 1.5,
                      px: 4,
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: 4,
                      },
                      transition: 'all 0.2s',
                    }}
                  >
                    Shop Now
                  </Button>
                  <Button
                    variant="outlined"
                    color="inherit"
                    size="large"
                    component={RouterLink}
                    to="/products?category=trending"
                    sx={{ 
                      py: 1.5,
                      px: 4,
                      fontSize: '1.1rem',
                      borderWidth: 2,
                      '&:hover': {
                        borderWidth: 2,
                        transform: 'translateY(-2px)',
                        boxShadow: 4,
                      },
                      transition: 'all 0.2s',
                    }}
                  >
                    Trending
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Paper>

      {/* Featured Categories */}
      <Container maxWidth="lg" sx={{ mb: 8, px: { xs: 2, sm: 3, md: 4 } }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              fontWeight: 'bold',
              mb: 1,
              background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Shop by Category
          </Typography>
          <Typography 
            variant="subtitle1" 
            color="text.secondary"
            sx={{ maxWidth: '600px', mx: 'auto' }}
          >
            Explore our wide range of products across different categories
          </Typography>
        </Box>
        <Grid 
          container 
          spacing={{ xs: 2, sm: 3, md: 4 }}
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
            gap: { xs: 2, sm: 3, md: 4 },
          }}
        >
          {categories.map((category) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={3} 
              key={category.id}
              sx={{
                display: 'flex',
                height: '100%',
              }}
            >
              <Card
                component={RouterLink}
                to={`/products?category=${encodeURIComponent(category.name.toLowerCase())}`}
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  textDecoration: 'none',
                  borderRadius: 4,
                  overflow: 'hidden',
                  transition: 'all 0.3s ease-in-out',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                    '& .category-image': {
                      transform: 'scale(1.05)',
                    },
                    '& .category-title': {
                      color: 'primary.main',
                    },
                  },
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    height: { xs: 160, sm: 180, md: 200 },
                    overflow: 'hidden',
                    backgroundColor: '#f5f5f5',
                  }}
                >
                  <CardMedia
                    component="img"
                    image={category.image}
                    alt={category.name}
                    className="category-image"
                    sx={{
                      height: '100%',
                      objectFit: 'contain',
                      p: 2,
                      transition: 'transform 0.3s ease-in-out',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 100%)',
                    }}
                  />
                </Box>
                <CardContent 
                  sx={{ 
                    flexGrow: 1, 
                    textAlign: 'center',
                    p: { xs: 2, sm: 2.5, md: 3 },
                    backgroundColor: 'background.paper',
                  }}
                >
                  <Typography 
                    className="category-title"
                    variant="h6" 
                    component="div"
                    sx={{
                      fontWeight: 600,
                      transition: 'color 0.3s ease-in-out',
                      color: 'text.primary',
                      fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
                    }}
                  >
                    {category.name}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ 
                      mt: 1,
                      fontSize: { xs: '0.875rem', sm: '0.9rem', md: '1rem' },
                    }}
                  >
                    Explore Collection
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Products */}
      <Box sx={{ bgcolor: 'background.paper', py: 8, px: { xs: 2, sm: 3, md: 4 } }}>
        <Container maxWidth="lg">
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              mb: 6,
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 2, sm: 0 },
              textAlign: { xs: 'center', sm: 'left' }
            }}
          >
            <Box>
              <Typography 
                variant="h4" 
                component="h2"
                sx={{ 
                  fontWeight: 'bold',
                  mb: 1,
                  background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                  backgroundClip: 'text',
                  textFillColor: 'transparent',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Featured Products
              </Typography>
              <Typography 
                variant="subtitle1" 
                color="text.secondary"
                sx={{ maxWidth: '600px' }}
              >
                Discover our handpicked selection of premium products
              </Typography>
            </Box>
            <Button 
              component={RouterLink} 
              to="/products" 
              variant="outlined"
              size="large"
              sx={{ 
                px: 4,
                py: 1.5,
                borderRadius: 2,
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                  transform: 'translateY(-2px)',
                  boxShadow: 4,
                },
                transition: 'all 0.2s',
              }}
            >
              View All
            </Button>
          </Box>
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {/* Left: Main Feature */}
            <Grid item xs={12} md={6} lg={6}>
              {isLoading || !products?.length ? (
                <Box sx={{ height: { xs: 220, md: 350 }, borderRadius: 3, bgcolor: 'grey.200' }} />
              ) : (
                <Box
                  sx={{
                    height: { xs: 220, md: 350 },
                    background: `url(${products[0].image}) center/cover`,
                    borderRadius: 3,
                    boxShadow: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    p: 3,
                    color: '#fff',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.35)' }} />
                  <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {products[0].title}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      {products[0].description}
                    </Typography>
                    <Button variant="contained" color="primary" component={RouterLink} to={`/products/${products[0].id}`}>
                      Shop Now
                    </Button>
                  </Box>
                </Box>
              )}
            </Grid>

            {/* Right: 2x2 Grid of Products */}
            <Grid item xs={12} md={6} lg={6}>
              <Box 
                sx={{ 
                  border: '2px solid', 
                  borderColor: 'divider', 
                  borderRadius: 3, 
                  p: 3, 
                  bgcolor: 'background.paper',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start'
                }}
              >
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontWeight: 'bold',
                    mb: 3,
                    background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                    backgroundClip: 'text',
                    textFillColor: 'transparent',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Best of Electronics
                </Typography>
                <Grid container spacing={2}>
                  {(() => {
                    if (isLoading) {
                      return Array.from(new Array(4)).map((_, idx) => (
                        <Grid item xs={6} key={idx}>
                          <Paper sx={{ height: 160 }} />
                        </Grid>
                      ));
                    }
                    
                    if (!products?.length) return null;

                    // Get first two products
                    const firstTwo = products.slice(0, 2);
                    
                    // Find specific products
                    const gamingConsole = products.find(p => 
                      p.title.toLowerCase().includes('gaming console') || 
                      p.title.toLowerCase().includes('console')
                    );
                    const bluetoothSpeaker = products.find(p => 
                      p.title.toLowerCase().includes('bluetooth speaker') || 
                      p.title.toLowerCase().includes('speaker')
                    );

                    // Create array with desired order
                    const featured = [
                      ...firstTwo,
                      gamingConsole || products[2],
                      bluetoothSpeaker || products[3]
                    ].filter(Boolean);

                    return featured.map((product, idx) => (
                      <Grid item xs={6} key={product.id || idx}>
                        <Paper
                          sx={{
                            p: 2,
                            borderRadius: 2,
                            boxShadow: 1,
                            textAlign: 'center',
                            height: 160,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            '&:hover': { 
                              boxShadow: 4, 
                              transform: 'translateY(-4px)',
                              cursor: 'pointer',
                              borderColor: 'primary.main',
                              border: '1px solid',
                            },
                            transition: 'all 0.2s',
                            position: 'relative',
                            overflow: 'hidden',
                          }}
                          component={RouterLink}
                          to={`/products/${product.id}`}
                        >
                          <Box
                            component="img"
                            src={product.image}
                            alt={product.title}
                            sx={{ 
                              width: '100%', 
                              height: 80, 
                              objectFit: 'contain', 
                              mb: 1,
                              transition: 'transform 0.3s ease',
                              '&:hover': {
                                transform: 'scale(1.05)',
                              }
                            }}
                          />
                          <Box sx={{ width: '100%' }}>
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                fontWeight: 600, 
                                fontSize: '0.9rem',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                mb: 0.5,
                                color: 'text.primary'
                              }}
                            >
                              {product.title}
                            </Typography>
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                color: 'primary.main',
                                fontWeight: 'bold',
                                fontSize: '1rem'
                              }}
                            >
                              ${product.price}
                            </Typography>
                          </Box>
                        </Paper>
                      </Grid>
                    ));
                  })()}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              fontWeight: 'bold',
              mb: 1,
              background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Why Choose Us
          </Typography>
          <Typography 
            variant="subtitle1" 
            color="text.secondary"
            sx={{ maxWidth: '600px', mx: 'auto' }}
          >
            Experience shopping with confidence through our premium services
          </Typography>
        </Box>
        <Grid 
          container 
          spacing={{ xs: 3, md: 4 }}
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
            gap: { xs: 3, md: 4 },
          }}
        >
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                borderRadius: 4,
                transition: 'all 0.3s ease-in-out',
                backgroundColor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                  borderColor: 'primary.main',
                  '& .feature-icon': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                  },
                },
              }}
            >
              <Box
                className="feature-icon"
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                  backgroundColor: 'primary.light',
                  color: 'primary.main',
                  transition: 'all 0.3s ease-in-out',
                }}
              >
                <LocalShipping sx={{ fontSize: 40 }} />
              </Box>
              <Typography 
                variant="h6" 
                component="h3" 
                sx={{ 
                  fontWeight: 'bold',
                  mb: 1,
                }}
              >
                Free Shipping
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ 
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                }}
              >
                On orders over $50
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                borderRadius: 4,
                transition: 'all 0.3s ease-in-out',
                backgroundColor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                  borderColor: 'primary.main',
                  '& .feature-icon': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                  },
                },
              }}
            >
              <Box
                className="feature-icon"
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                  backgroundColor: 'primary.light',
                  color: 'primary.main',
                  transition: 'all 0.3s ease-in-out',
                }}
              >
                <Support sx={{ fontSize: 40 }} />
              </Box>
              <Typography 
                variant="h6" 
                component="h3" 
                sx={{ 
                  fontWeight: 'bold',
                  mb: 1,
                }}
              >
                24/7 Support
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ 
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                }}
              >
                Get help when you need it
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                borderRadius: 4,
                transition: 'all 0.3s ease-in-out',
                backgroundColor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                  borderColor: 'primary.main',
                  '& .feature-icon': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                  },
                },
              }}
            >
              <Box
                className="feature-icon"
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                  backgroundColor: 'primary.light',
                  color: 'primary.main',
                  transition: 'all 0.3s ease-in-out',
                }}
              >
                <ShoppingBag sx={{ fontSize: 40 }} />
              </Box>
              <Typography 
                variant="h6" 
                component="h3" 
                sx={{ 
                  fontWeight: 'bold',
                  mb: 1,
                }}
              >
                Secure Checkout
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ 
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                }}
              >
                100% secure payment
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                borderRadius: 4,
                transition: 'all 0.3s ease-in-out',
                backgroundColor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                  borderColor: 'primary.main',
                  '& .feature-icon': {
                    backgroundColor: 'primary.main',
                    color: 'white',
                  },
                },
              }}
            >
              <Box
                className="feature-icon"
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                  backgroundColor: 'primary.light',
                  color: 'primary.main',
                  transition: 'all 0.3s ease-in-out',
                }}
              >
                <Favorite sx={{ fontSize: 40 }} />
              </Box>
              <Typography 
                variant="h6" 
                component="h3" 
                sx={{ 
                  fontWeight: 'bold',
                  mb: 1,
                }}
              >
                Easy Returns
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ 
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                }}
              >
                30 day return policy
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;
