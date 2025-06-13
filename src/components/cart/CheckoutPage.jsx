import React, { useState } from "react";
import { useCart } from "../../hooks/useCart";
import { useOrders } from "../../hooks/useOrders";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Breadcrumbs,
  Link,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Chip
} from "@mui/material";
import { 
  ArrowBack, 
  Payment, 
  LocalShipping,
  Receipt,
  CheckCircle
} from "@mui/icons-material";
import { formatPrice } from "../../utils/formatters";
import { validateCheckoutForm } from "../../utils/validators";
import LoadingSpinner from "../common/LoadingSpinner";
import AddressForm from "../forms/AddressForm";
import PaymentForm from "../forms/PaymentForm";

const CheckoutPage = () => {
  const { items, clearAllItems } = useCart();
  const { createOrder } = useOrders();
  const currentUser = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  // Stepper state
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Shipping Address', 'Payment Details', 'Review Order'];

  // Combined form state
  const [formData, setFormData] = useState({
    // Shipping data
    fullName: currentUser?.name ? `${currentUser.name.firstname} ${currentUser.name.lastname}` : '',
    address: currentUser?.address?.street || '',
    city: currentUser?.address?.city || '',
    state: '',
    pincode: currentUser?.address?.zipcode || '',
    country: 'US',
    phone: currentUser?.phone || '',
    
    // Payment data
    paymentMethod: 'credit',
    cardNumber: '',
    nameOnCard: '',
    expiryDate: '',
    cvv: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  if (!items) return <LoadingSpinner />;

  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = totalPrice > 100 ? 0 : 9.99;
  const tax = totalPrice * 0.08;
  const finalTotal = totalPrice + shippingCost + tax;

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateCurrentStep = () => {
    const validation = validateCheckoutForm(formData);
    setFormErrors(validation.errors);
    
    if (activeStep === 0) {
      // Validate shipping fields only
      const shippingFields = ['fullName', 'address', 'city', 'pincode', 'phone'];
      const shippingErrors = {};
      shippingFields.forEach(field => {
        if (validation.errors[field]) {
          shippingErrors[field] = validation.errors[field];
        }
      });
      return Object.keys(shippingErrors).length === 0;
    } else if (activeStep === 1) {
      // Validate payment fields only (if credit/debit card)
      if (formData.paymentMethod === 'credit' || formData.paymentMethod === 'debit') {
        const paymentFields = ['cardNumber', 'nameOnCard', 'expiryDate', 'cvv'];
        const paymentErrors = {};
        paymentFields.forEach(field => {
          if (validation.errors[field]) {
            paymentErrors[field] = validation.errors[field];
          }
        });
        return Object.keys(paymentErrors).length === 0;
      }
      return true; // Other payment methods don't need validation here
    }
    
    return validation.isValid;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handlePlaceOrder = async () => {
    if (!currentUser) {
      alert('Please log in to place an order');
      navigate('/login');
      return;
    }

    const validation = validateCheckoutForm(formData);
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare order data
      const orderData = {
        userId: currentUser.id,
        products: items.map(item => ({
          id: item.id,
          title: item.title,
          price: item.price,
          image: item.image,
          category: item.category,
          quantity: item.quantity || 1,
        })),
        shippingAddress: {
          fullName: formData.fullName,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          country: formData.country,
          phone: formData.phone,
        },
        paymentDetails: {
          method: formData.paymentMethod,
          cardLastFour: formData.cardNumber ? formData.cardNumber.slice(-4) : '',
        },
        total: finalTotal,
        status: 'confirmed',
        orderDate: new Date().toISOString(),
      };

      // Create the order
      createOrder(orderData);

      // Clear the cart
      clearAllItems();

      // Navigate to order confirmation
      navigate("/order-confirmation");
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!currentUser) {
    return (
      <Box sx={{ backgroundColor: '#f8f9fa', minHeight: '100vh', py: 4 }}>
        <Container maxWidth="md">
        <Alert
          severity="warning"
          sx={{
            borderRadius: 2,
            backgroundColor: '#fefcbf',
            border: '1px solid #f6e05e',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Please log in to checkout
          </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
            You need to be logged in to place an order.
          </Typography>
          <Button 
              variant="contained" 
            onClick={() => navigate('/login')}
              sx={{ 
                backgroundColor: '#007bff',
                '&:hover': { backgroundColor: '#0056b3' }
              }}
          >
            Go to Login
          </Button>
        </Alert>
      </Container>
      </Box>
    );
  }

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <AddressForm
            formData={formData}
            onChange={handleFormChange}
            errors={formErrors}
          />
        );
      case 1:
        return (
          <PaymentForm
            formData={formData}
            onChange={handleFormChange}
            errors={formErrors}
          />
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#343a40', mb: 3 }}>
              Review Your Order
            </Typography>
            
            {/* Shipping Address Review */}
            <Paper sx={{ p: 3, mb: 3, borderRadius: 2, border: '1px solid #e9ecef' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocalShipping sx={{ color: '#007bff' }} />
                Shipping Address
              </Typography>
              <Typography variant="body2" sx={{ color: '#6c757d' }}>
                {formData.fullName}<br />
                {formData.address}<br />
                {formData.city}, {formData.state} {formData.pincode}<br />
                {formData.phone}
              </Typography>
            </Paper>

            {/* Payment Method Review */}
            <Paper sx={{ p: 3, mb: 3, borderRadius: 2, border: '1px solid #e9ecef' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Payment sx={{ color: '#007bff' }} />
                Payment Method
              </Typography>
              <Typography variant="body2" sx={{ color: '#6c757d' }}>
                {formData.paymentMethod === 'credit' && 'Credit Card'}
                {formData.paymentMethod === 'debit' && 'Debit Card'}
                {formData.paymentMethod === 'paypal' && 'PayPal'}
                {formData.paymentMethod === 'apple_pay' && 'Apple Pay'}
                {formData.paymentMethod === 'google_pay' && 'Google Pay'}
                {formData.cardNumber && ` ending in ${formData.cardNumber.slice(-4)}`}
              </Typography>
            </Paper>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box sx={{ backgroundColor: '#f8f9fa', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Breadcrumbs sx={{ mb: 3 }}>
        <Link
          underline="hover"
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
          underline="hover"
          color="inherit"
          href="/cart"
          onClick={(e) => {
            e.preventDefault();
            navigate('/cart');
          }}
            sx={{ 
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' }
          }}
        >
          Cart
        </Link>
        <Typography color="text.primary">Checkout</Typography>
      </Breadcrumbs>

        <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, color: '#343a40', mb: 4 }}>
        Checkout
      </Typography>

        {/* Stepper */}
        <Paper sx={{ p: 3, mb: 4, borderRadius: 2, border: '1px solid #e9ecef' }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel
                  StepIconProps={{
                    sx: {
                      '&.Mui-active': {
                        color: '#007bff',
                      },
                      '&.Mui-completed': {
                        color: '#28a745',
                      },
                    },
                  }}
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          </Paper>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 4, borderRadius: 2, border: '1px solid #e9ecef' }}>
              {getStepContent(activeStep)}
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  startIcon={<ArrowBack />}
                  sx={{
                    color: '#6c757d',
                    '&:hover': { backgroundColor: '#f8f9fa' }
                  }}
                >
                  Back
                </Button>
                
                {activeStep === steps.length - 1 ? (
                  <Button
                    variant="contained"
                    onClick={handlePlaceOrder}
                    disabled={isSubmitting}
                    startIcon={<Receipt />}
                    sx={{
                      backgroundColor: '#28a745',
                      px: 4,
                      py: 1.5,
                      '&:hover': { backgroundColor: '#218838' }
                    }}
                  >
                    {isSubmitting ? 'Placing Order...' : 'Place Order'}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{
                      backgroundColor: '#007bff',
                      px: 4,
                      py: 1.5,
                      '&:hover': { backgroundColor: '#0056b3' }
                    }}
                  >
                    Next
                  </Button>
                )}
              </Box>
          </Paper>
        </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 2, border: '1px solid #e9ecef', position: 'sticky', top: 20 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Receipt sx={{ color: '#007bff' }} />
              Order Summary
            </Typography>
            <Divider sx={{ mb: 2 }} />

              <List sx={{ py: 0 }}>
              {items.map((item) => (
                <ListItem key={item.id} sx={{ py: 1, px: 0 }}>
                    <ListItemAvatar>
                      <Avatar 
                        src={item.image} 
                        alt={item.title}
                        variant="rounded"
                        sx={{ width: 50, height: 50 }}
                      />
                    </ListItemAvatar>
                  <ListItemText 
                      primary={
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {item.title.length > 30 ? `${item.title.substring(0, 30)}...` : item.title}
                        </Typography>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                          <Chip 
                            label={`Qty: ${item.quantity || 1}`} 
                            size="small" 
                            sx={{ backgroundColor: '#e9ecef', color: '#343a40' }}
                          />
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#007bff' }}>
                    {formatPrice(item.price * (item.quantity || 1))}
                  </Typography>
                        </Box>
                      }
                    />
                </ListItem>
              ))}
            </List>

            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ mb: 1, display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Subtotal:</Typography>
                <Typography sx={{ fontWeight: 500 }}>{formatPrice(totalPrice)}</Typography>
            </Box>
            
            <Box sx={{ mb: 1, display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Shipping:</Typography>
                <Typography sx={{ color: shippingCost === 0 ? '#28a745' : 'inherit', fontWeight: 500 }}>
                {shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}
              </Typography>
            </Box>
            
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Typography>Tax:</Typography>
                <Typography sx={{ fontWeight: 500 }}>{formatPrice(tax)}</Typography>
            </Box>

            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Total:
              </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#007bff' }}>
                {formatPrice(finalTotal)}
              </Typography>
            </Box>

              {shippingCost === 0 && (
                <Box sx={{ p: 2, backgroundColor: '#d4edda', borderRadius: 1, border: '1px solid #c3e6cb', mb: 2 }}>
                  <Typography variant="body2" sx={{ color: '#155724', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CheckCircle sx={{ fontSize: 16 }} />
                    You qualify for free shipping!
                  </Typography>
                </Box>
              )}

              <Button
                startIcon={<ArrowBack />}
                onClick={() => navigate("/cart")}
                variant="outlined"
                fullWidth
                sx={{
                  borderColor: '#6c757d',
                  color: '#6c757d',
                  fontWeight: 500,
                  textTransform: 'none',
                  borderRadius: 2,
                  '&:hover': {
                    borderColor: '#495057',
                    backgroundColor: '#f8f9fa'
                  }
                }}
              >
                Back to Cart
              </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
    </Box>
  );
};

export default CheckoutPage;
