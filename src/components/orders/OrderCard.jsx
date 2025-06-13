import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Divider,
  Grid,
  Avatar,
  Button,
  Modal,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Fade,
  Backdrop
} from '@mui/material';
import {
  CheckCircle,
  Schedule,
  LocalShipping,
  Receipt,
  Close,
  Payment,
  CalendarToday,
  ShoppingCart,
  CreditCard,
  AccountBalanceWallet
} from '@mui/icons-material';
import { formatPrice } from '../../utils/formatters';

const OrderCard = ({ order }) => {
  const [detailsOpen, setDetailsOpen] = useState(false);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'success';
      case 'processing':
        return 'warning';
      case 'shipped':
        return 'info';
      case 'delivered':
        return 'success';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return <CheckCircle fontSize="small" />;
      case 'processing':
        return <Schedule fontSize="small" />;
      case 'shipped':
        return <LocalShipping fontSize="small" />;
      case 'delivered':
        return <CheckCircle fontSize="small" />;
      default:
        return <Receipt fontSize="small" />;
    }
  };

  const getPaymentIcon = (method) => {
    switch (method?.toLowerCase()) {
      case 'credit':
      case 'debit':
        return <CreditCard sx={{ color: '#007bff' }} />;
      case 'paypal':
        return <AccountBalanceWallet sx={{ color: '#0070ba' }} />;
      case 'apple_pay':
      case 'google_pay':
        return <Payment sx={{ color: '#4285f4' }} />;
      default:
        return <Payment sx={{ color: '#6c757d' }} />;
    }
  };

  const getPaymentMethodName = (method) => {
    switch (method?.toLowerCase()) {
      case 'credit':
        return 'Credit Card';
      case 'debit':
        return 'Debit Card';
      case 'paypal':
        return 'PayPal';
      case 'apple_pay':
        return 'Apple Pay';
      case 'google_pay':
        return 'Google Pay';
      default:
        return 'Credit Card';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatDetailedDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleViewDetails = () => {
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
  };

  const OrderDetailsModal = () => (
    <Modal
      open={detailsOpen}
      onClose={handleCloseDetails}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={detailsOpen}>
        <Paper
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '95%', sm: '90%', md: '80%', lg: '70%' },
            maxWidth: '900px',
            maxHeight: '90vh',
            overflow: 'auto',
            borderRadius: 3,
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            outline: 'none'
          }}
        >
          {/* Modal Header */}
          <Box
            sx={{
              p: 3,
              backgroundColor: '#007bff',
              color: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: '12px 12px 0 0'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Receipt sx={{ fontSize: 28 }} />
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Order Details
              </Typography>
            </Box>
            <IconButton
              onClick={handleCloseDetails}
              sx={{
                color: 'white',
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
              }}
            >
              <Close />
            </IconButton>
          </Box>

          {/* Modal Content */}
          <Box sx={{ p: 4 }}>
            {/* Order Info Section */}
            <Grid container spacing={4} sx={{ mb: 4 }}>
              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    p: 3,
                    backgroundColor: '#f8f9fa',
                    borderRadius: 2,
                    border: '1px solid #e9ecef'
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: '#343a40',
                      mb: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    <Receipt sx={{ color: '#007bff' }} />
                    Order Information
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ color: '#6c757d', mb: 0.5 }}>
                      Order ID
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#343a40' }}>
                      #{order.id || order.orderNumber || 'N/A'}
                    </Typography>
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ color: '#6c757d', mb: 0.5 }}>
                      Status
                    </Typography>
                    <Chip
                      icon={getStatusIcon(order.status)}
                      label={order.status.toUpperCase()}
                      color={getStatusColor(order.status)}
                      variant="filled"
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    p: 3,
                    backgroundColor: '#f8f9fa',
                    borderRadius: 2,
                    border: '1px solid #e9ecef'
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: '#343a40',
                      mb: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    <CalendarToday sx={{ color: '#007bff' }} />
                    Order Date
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#343a40', fontWeight: 500 }}>
                    {formatDetailedDate(order.date || order.orderDate)}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            {/* Items Ordered Section */}
            <Paper
              sx={{
                p: 3,
                mb: 4,
                borderRadius: 2,
                border: '1px solid #e9ecef'
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: '#343a40',
                  mb: 3,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <ShoppingCart sx={{ color: '#007bff' }} />
                Items Ordered ({order.products?.length || 0})
              </Typography>
              
              <List sx={{ py: 0 }}>
                {order.products?.map((product, index) => (
                  <React.Fragment key={product.id || index}>
                    <ListItem
                      sx={{
                        px: 0,
                        py: 2,
                        alignItems: 'flex-start'
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          src={product.image}
                          alt={product.title}
                          variant="rounded"
                          sx={{
                            width: 80,
                            height: 80,
                            mr: 2
                          }}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontWeight: 600,
                              color: '#343a40',
                              mb: 1
                            }}
                          >
                            {product.title}
                          </Typography>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" sx={{ color: '#6c757d', mb: 1 }}>
                              Category: {product.category}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Chip
                                label={`Qty: ${product.quantity || 1}`}
                                size="small"
                                sx={{
                                  backgroundColor: '#e9ecef',
                                  color: '#343a40',
                                  fontWeight: 500
                                }}
                              />
                              <Typography
                                variant="body1"
                                sx={{
                                  fontWeight: 600,
                                  color: '#007bff'
                                }}
                              >
                                {formatPrice(product.price)} each
                              </Typography>
                            </Box>
                          </Box>
                        }
                      />
                      <Box sx={{ textAlign: 'right', ml: 2 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            color: '#28a745'
                          }}
                        >
                          {formatPrice(product.price * (product.quantity || 1))}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#6c757d' }}>
                          Subtotal
                        </Typography>
                      </Box>
                    </ListItem>
                    {index < order.products.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>

            {/* Payment and Total Section */}
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    p: 3,
                    backgroundColor: '#f8f9fa',
                    borderRadius: 2,
                    border: '1px solid #e9ecef'
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: '#343a40',
                      mb: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    {getPaymentIcon(order.paymentDetails?.method)}
                    Payment Method
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#343a40', fontWeight: 500, mb: 1 }}>
                    {getPaymentMethodName(order.paymentDetails?.method)}
                  </Typography>
                  {order.paymentDetails?.cardLastFour && (
                    <Typography variant="body2" sx={{ color: '#6c757d' }}>
                      **** **** **** {order.paymentDetails.cardLastFour}
                    </Typography>
                  )}
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    p: 3,
                    backgroundColor: '#fff3cd',
                    borderRadius: 2,
                    border: '1px solid #ffeaa7'
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: '#856404',
                      mb: 2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    <Receipt sx={{ color: '#856404' }} />
                    Total Amount
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      color: '#856404'
                    }}
                  >
                    {formatPrice(order.total)}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            {/* Shipping Address (if available) */}
            {order.shippingAddress && (
              <Paper
                sx={{
                  p: 3,
                  mt: 4,
                  backgroundColor: '#f8f9fa',
                  borderRadius: 2,
                  border: '1px solid #e9ecef'
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    color: '#343a40',
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <LocalShipping sx={{ color: '#007bff' }} />
                  Shipping Address
                </Typography>
                <Typography variant="body1" sx={{ color: '#343a40', lineHeight: 1.6 }}>
                  {order.shippingAddress.fullName}<br />
                  {order.shippingAddress.address}<br />
                  {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.pincode}<br />
                  {order.shippingAddress.country}<br />
                  Phone: {order.shippingAddress.phone}
                </Typography>
              </Paper>
            )}
          </Box>

          {/* Modal Footer */}
          <Box
            sx={{
              p: 3,
              backgroundColor: '#f8f9fa',
              borderTop: '1px solid #e9ecef',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 2,
              borderRadius: '0 0 12px 12px'
            }}
          >
            <Button
              variant="outlined"
              onClick={handleCloseDetails}
              sx={{
                borderColor: '#6c757d',
                color: '#6c757d',
                '&:hover': {
                  borderColor: '#495057',
                  backgroundColor: '#f8f9fa'
                }
              }}
            >
              Close
            </Button>
            {order.status.toLowerCase() === 'delivered' && (
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#28a745',
                  '&:hover': { backgroundColor: '#218838' }
                }}
              >
                Reorder Items
              </Button>
            )}
          </Box>
        </Paper>
      </Fade>
    </Modal>
  );

  return (
    <>
      <Card
        sx={{
          mb: 3,
          borderRadius: 3,
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          border: '1px solid #e2e8f0',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
            transform: 'translateY(-2px)',
          },
        }}
      >
        <CardContent sx={{ p: 3 }}>
          {/* Order Header */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: '#2d3748',
                  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                }}
              >
                Order #{order.id || order.orderNumber || 'N/A'}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
              >
                Placed on {formatDate(order.date || order.orderDate)}
              </Typography>
            </Box>
            
            <Chip
              icon={getStatusIcon(order.status)}
              label={order.status.toUpperCase()}
              color={getStatusColor(order.status)}
              variant="filled"
              sx={{
                fontWeight: 600,
                fontSize: '0.75rem',
              }}
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Order Products */}
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                color: '#2d3748',
                mb: 1,
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
              }}
            >
              Items ({order.products?.length || 0})
            </Typography>
            
            <Grid container spacing={2}>
              {order.products?.slice(0, 3).map((product, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      p: 2,
                      backgroundColor: '#f8fafc',
                      borderRadius: 2,
                      border: '1px solid #e2e8f0',
                    }}
                  >
                    <Avatar
                      src={product.image}
                      alt={product.title}
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: 2,
                      }}
                      variant="rounded"
                    />
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          color: '#2d3748',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          lineHeight: 1.3,
                          fontSize: '0.85rem',
                        }}
                      >
                        {product.title}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ display: 'block', mt: 0.5 }}
                      >
                        Qty: {product.quantity || 1}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
              
              {order.products && order.products.length > 3 && (
                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    color="primary"
                    sx={{
                      textAlign: 'center',
                      fontWeight: 500,
                      mt: 1,
                    }}
                  >
                    +{order.products.length - 3} more items
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Order Summary */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: '#e53e3e',
                  fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                }}
              >
                {formatPrice(order.total)}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: 'block' }}
              >
                Total Amount
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                size="small"
                onClick={handleViewDetails}
                sx={{
                  borderColor: '#3182ce',
                  color: '#3182ce',
                  textTransform: 'none',
                  fontWeight: 500,
                  borderRadius: 2,
                  '&:hover': {
                    borderColor: '#2c5aa0',
                    backgroundColor: '#ebf8ff',
                  },
                }}
              >
                View Details
              </Button>
              
              {order.status.toLowerCase() === 'delivered' && (
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    backgroundColor: '#38a169',
                    textTransform: 'none',
                    fontWeight: 500,
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: '#2f855a',
                    },
                  }}
                >
                  Reorder
                </Button>
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>

      <OrderDetailsModal />
    </>
  );
};

export default OrderCard; 