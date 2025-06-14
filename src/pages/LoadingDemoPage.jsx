import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  Card,
  CardContent,
  Divider,
  Switch,
  FormControlLabel,
  Alert,
  Chip
} from '@mui/material';
import { 
  PlayArrow, 
  Stop, 
  Refresh,
  ShoppingCart,
  Download,
  CloudUpload
} from '@mui/icons-material';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ProductSkeleton from '../components/common/ProductSkeleton';
import { useLoadingState, useAsyncOperation } from '../hooks/useLoadingState';

const LoadingDemoPage = () => {
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const { isLoading, startLoading, stopLoading } = useLoadingState();

  // Demo async operation
  const mockAsyncOperation = async () => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    return 'Operation completed successfully!';
  };

  const { execute: runAsyncDemo, isLoading: asyncLoading } = useAsyncOperation(
    mockAsyncOperation,
    {
      onSuccess: (result) => {
        console.log('Success:', result);
      },
      onError: (error) => {
        console.error('Error:', error);
      }
    }
  );

  const handleFullScreenDemo = () => {
    setShowFullScreen(true);
    setTimeout(() => setShowFullScreen(false), 3000);
  };

  const handleOverlayDemo = () => {
    setShowOverlay(true);
    setTimeout(() => setShowOverlay(false), 2000);
  };

  const handleManualLoading = () => {
    if (isLoading) {
      stopLoading();
    } else {
      startLoading();
      setTimeout(stopLoading, 2000);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Page Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Loading Spinner Demo
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Comprehensive showcase of all loading states and spinner variants
        </Typography>
        <Alert severity="info" sx={{ maxWidth: 800, mx: 'auto' }}>
          This page demonstrates various loading patterns used throughout the ShopSmart application.
          Click the buttons to see different loading states in action.
        </Alert>
      </Box>

      {/* Demo Controls */}
      <Paper sx={{ p: 3, mb: 4, bgcolor: 'grey.50' }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
          Interactive Demos
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<PlayArrow />}
              onClick={handleFullScreenDemo}
              sx={{ py: 1.5 }}
            >
              Full Screen Loading
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<CloudUpload />}
              onClick={handleOverlayDemo}
              sx={{ py: 1.5 }}
            >
              Overlay Loading
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="contained"
              fullWidth
              startIcon={isLoading ? <Stop /> : <PlayArrow />}
              onClick={handleManualLoading}
              color={isLoading ? 'error' : 'primary'}
              sx={{ py: 1.5 }}
            >
              {isLoading ? 'Stop Loading' : 'Manual Loading'}
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<Download />}
              onClick={runAsyncDemo}
              disabled={asyncLoading}
              sx={{ py: 1.5 }}
            >
              {asyncLoading ? 'Processing...' : 'Async Operation'}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Spinner Variants */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Spinner Variants
      </Typography>

      <Grid container spacing={4}>
        {/* Circular Spinner */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Chip label="Default" color="primary" size="small" sx={{ mr: 1 }} />
                <Typography variant="h6">Circular Spinner</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Standard circular progress indicator with customizable message
              </Typography>
              <LoadingSpinner 
                variant="circular"
                message="Loading data..."
                size={50}
                minHeight={150}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Linear Progress */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Chip label="Progress" color="secondary" size="small" sx={{ mr: 1 }} />
                <Typography variant="h6">Linear Progress</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Linear progress bar for file uploads and downloads
              </Typography>
              <LoadingSpinner 
                variant="linear"
                message="Uploading files..."
                color="secondary"
              />
              <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                <Typography variant="body2">
                  Perfect for showing progress in forms, uploads, or step-by-step processes.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Cart Loading */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Chip label="E-commerce" color="success" size="small" sx={{ mr: 1 }} />
                <Typography variant="h6">Cart Loading</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Shopping cart themed loading with icon overlay
              </Typography>
              <LoadingSpinner 
                variant="cart"
                message="Adding to cart..."
                size={60}
                color="success"
                minHeight={150}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Inline Loading */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Chip label="Compact" color="warning" size="small" sx={{ mr: 1 }} />
                <Typography variant="h6">Inline Loading</Typography>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Small inline spinner for buttons and compact spaces
              </Typography>
              <Box sx={{ p: 3, textAlign: 'center' }}>
                <LoadingSpinner 
                  variant="inline"
                  message="Processing..."
                  color="warning"
                />
              </Box>
              <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                <Typography variant="body2">
                  Ideal for button loading states and inline feedback.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Skeleton Loading */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
          Skeleton Loading
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Single Product Skeleton</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Skeleton placeholder for individual product cards
                </Typography>
                <ProductSkeleton count={1} />
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Multiple Products</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Grid layout with multiple skeleton cards
                </Typography>
                <Box sx={{ maxHeight: 400, overflow: 'hidden' }}>
                  <ProductSkeleton count={4} showGrid />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Loading States in Context */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
          Contextual Loading States
        </Typography>
        
        <Grid container spacing={4}>
          {/* Button Loading States */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Button Loading</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Button
                    variant="contained"
                    disabled={asyncLoading}
                    startIcon={asyncLoading ? <LoadingSpinner variant="inline" showMessage={false} size={16} /> : <ShoppingCart />}
                    onClick={runAsyncDemo}
                  >
                    {asyncLoading ? 'Adding to Cart...' : 'Add to Cart'}
                  </Button>
                  
                  <Button
                    variant="outlined"
                    disabled={isLoading}
                    startIcon={isLoading ? <LoadingSpinner variant="inline" showMessage={false} size={16} /> : <Refresh />}
                    onClick={handleManualLoading}
                  >
                    {isLoading ? 'Refreshing...' : 'Refresh Data'}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Form Loading */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Form Loading</Typography>
                <Box sx={{ position: 'relative' }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box sx={{ height: 56, bgcolor: 'grey.100', borderRadius: 1 }} />
                    <Box sx={{ height: 56, bgcolor: 'grey.100', borderRadius: 1 }} />
                    <Box sx={{ height: 40, bgcolor: 'grey.100', borderRadius: 1 }} />
                  </Box>
                  {showOverlay && (
                    <LoadingSpinner 
                      variant="overlay"
                      message="Saving form..."
                      size={40}
                    />
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Data Loading */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Data Loading</Typography>
                {isLoading ? (
                  <LoadingSpinner 
                    variant="circular"
                    message="Fetching data..."
                    size={40}
                    minHeight={120}
                  />
                ) : (
                  <Box sx={{ p: 2, textAlign: 'center', minHeight: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography color="text.secondary">
                      Data loaded successfully!
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Usage Guidelines */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
          Usage Guidelines
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Alert severity="success" sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>✅ Best Practices</Typography>
              <Typography variant="body2">
                • Use skeleton loading for content that takes time to load<br/>
                • Show progress indicators for operations over 2 seconds<br/>
                • Provide meaningful loading messages<br/>
                • Use inline spinners for quick actions
              </Typography>
            </Alert>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Alert severity="warning" sx={{ mb: 2 }}>
              <Typography variant="subtitle2" gutterBottom>⚠️ Avoid</Typography>
              <Typography variant="body2">
                • Generic "Loading..." messages<br/>
                • Blocking the entire UI for small operations<br/>
                • Multiple loading states simultaneously<br/>
                • Loading states without timeout handling
              </Typography>
            </Alert>
          </Grid>
        </Grid>
      </Box>

      {/* Full Screen Loading Demo */}
      {showFullScreen && (
        <LoadingSpinner 
          fullScreen 
          message="Processing your request..." 
          color="primary"
        />
      )}
    </Container>
  );
};

export default LoadingDemoPage; 