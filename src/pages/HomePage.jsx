import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardMedia,
  CardContent,
  Divider,
  Paper,
  Skeleton,
} from '@mui/material';
import { ShoppingBag, Favorite, LocalShipping, Support } from '@mui/icons-material';
import { useGetProductsQuery } from '../store/api/productApi';
import ProductCard from '../components/products/ProductCard';

/**
 * HomePage component - Landing page for ShopSmart
 */
const HomePage = () => {
  // Fetch featured products using RTK Query
  const { data: products, isLoading } = useGetProductsQuery({ limit: 4 });
  
  // Featured categories - in a real app, these might come from an API
  const categories = [
    { id: 1, name: "Electronics", image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg" },
    { id: 2, name: "Jewelry", image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg" },
    { id: 3, name: "Men's Clothing", image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg" },
    { id: 4, name: "Women's Clothing", image: "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg" },
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
          backgroundImage: 'url(https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)',
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
            backgroundColor: 'rgba(0,0,0,.4)',
          }}
        />
        <Grid container>
          <Grid item md={6}>
            <Box
              sx={{
                position: 'relative',
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
                minHeight: 400,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                Welcome to ShopSmart
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                Your one-stop destination for quality products at competitive prices.
                Discover our wide range of products and enjoy a seamless shopping experience.
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                component={RouterLink}
                to="/products"
                sx={{ mt: 2, alignSelf: 'flex-start' }}
              >
                Shop Now
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Featured Categories */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4 }}>
          Shop by Category
        </Typography>
        <Grid container spacing={3}>
          {categories.map((category) => (
            <Grid item xs={6} md={3} key={category.id}>
              <Card
                component={RouterLink}
                to={`/products?category=${encodeURIComponent(category.name.toLowerCase())}`}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  textDecoration: 'none',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.03)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={category.image}
                  alt={category.name}
                  sx={{ objectFit: 'contain', p: 2, backgroundColor: '#f5f5f5' }}
                />
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {category.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Products */}
      <Box sx={{ bgcolor: 'background.paper', py: 6 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" component="h2">
              Featured Products
            </Typography>
            <Button component={RouterLink} to="/products" variant="outlined">
              View All
            </Button>
          </Box>
          <Grid container spacing={3}>
            {isLoading
              ? Array.from(new Array(4)).map((_, index) => (
                  <Grid item key={index} xs={12} sm={6} md={3}>
                    <ProductCard loading={true} />
                  </Grid>
                ))
              : products?.map((product) => (
                  <Grid item key={product.id} xs={12} sm={6} md={3}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ my: 6 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <LocalShipping color="primary" sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Free Shipping
              </Typography>
              <Typography variant="body2" color="text.secondary">
                On orders over $50
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Support color="primary" sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                24/7 Support
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Get help when you need it
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <ShoppingBag color="primary" sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Secure Checkout
              </Typography>
              <Typography variant="body2" color="text.secondary">
                100% secure payment
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center', p: 2 }}>
              <Favorite color="primary" sx={{ fontSize: 48, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Easy Returns
              </Typography>
              <Typography variant="body2" color="text.secondary">
                30 day return policy
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;
