import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  InputAdornment,
  Chip
} from '@mui/material';
import {
  CreditCard,
  Security,
  CalendarToday
} from '@mui/icons-material';
import { 
  validateCreditCard, 
  validateCVV, 
  validateExpiryDate, 
  validateName,
  formatCardNumber,
  formatExpiryDate
} from '../../utils/validators';

const PaymentForm = ({ 
  formData, 
  onChange, 
  errors = {}, 
  title = "Payment Details" 
}) => {
  const [cardType, setCardType] = useState('');

  const paymentMethods = [
    { value: 'credit', label: 'Credit Card' },
    { value: 'debit', label: 'Debit Card' },
    { value: 'paypal', label: 'PayPal' },
    { value: 'apple_pay', label: 'Apple Pay' },
    { value: 'google_pay', label: 'Google Pay' }
  ];

  // Detect card type based on card number
  const detectCardType = (cardNumber) => {
    const cleanNumber = cardNumber.replace(/\s/g, '');
    
    if (/^4/.test(cleanNumber)) return 'visa';
    if (/^5[1-5]/.test(cleanNumber)) return 'mastercard';
    if (/^3[47]/.test(cleanNumber)) return 'amex';
    if (/^6/.test(cleanNumber)) return 'discover';
    if (/^35/.test(cleanNumber)) return 'jcb';
    
    return '';
  };

  const handleChange = (field) => (event) => {
    let value = event.target.value;
    
    // Format specific fields
    if (field === 'cardNumber') {
      value = formatCardNumber(value);
      const detectedType = detectCardType(value);
      setCardType(detectedType);
    } else if (field === 'expiryDate') {
      value = formatExpiryDate(value);
    } else if (field === 'cvv') {
      // Limit CVV to 3-4 digits
      value = value.replace(/\D/g, '').substring(0, cardType === 'amex' ? 4 : 3);
    }
    
    onChange(field, value);
  };

  const getCardTypeIcon = () => {
    switch (cardType) {
      case 'visa':
        return <Chip label="VISA" size="small" color="primary" />;
      case 'mastercard':
        return <Chip label="MC" size="small" color="secondary" />;
      case 'amex':
        return <Chip label="AMEX" size="small" color="success" />;
      case 'discover':
        return <Chip label="DISC" size="small" color="warning" />;
      default:
        return <CreditCard sx={{ color: '#6c757d' }} />;
    }
  };

  return (
    <Box>
      <Typography 
        variant="h6" 
        gutterBottom 
        sx={{ 
          fontWeight: 600,
          color: '#343a40',
          mb: 3
        }}
      >
        {title}
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Payment Method</InputLabel>
            <Select
              value={formData.paymentMethod || 'credit'}
              onChange={handleChange('paymentMethod')}
              label="Payment Method"
              sx={{
                borderRadius: '8px',
              }}
            >
              {paymentMethods.map((method) => (
                <MenuItem key={method.value} value={method.value}>
                  {method.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {(formData.paymentMethod === 'credit' || formData.paymentMethod === 'debit' || !formData.paymentMethod) && (
          <>
            <Grid item xs={12}>
              <TextField
                label="Card Number"
                fullWidth
                required
                value={formData.cardNumber || ''}
                onChange={handleChange('cardNumber')}
                error={!!errors.cardNumber}
                helperText={errors.cardNumber}
                placeholder="1234 5678 9012 3456"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {getCardTypeIcon()}
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  }
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Name on Card"
                fullWidth
                required
                value={formData.nameOnCard || ''}
                onChange={handleChange('nameOnCard')}
                error={!!errors.nameOnCard}
                helperText={errors.nameOnCard}
                placeholder="Enter name as shown on card"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Expiry Date"
                fullWidth
                required
                value={formData.expiryDate || ''}
                onChange={handleChange('expiryDate')}
                error={!!errors.expiryDate}
                helperText={errors.expiryDate}
                placeholder="MM/YY"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarToday sx={{ color: '#6c757d', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  }
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="CVV"
                fullWidth
                required
                value={formData.cvv || ''}
                onChange={handleChange('cvv')}
                error={!!errors.cvv}
                helperText={errors.cvv || `${cardType === 'amex' ? '4' : '3'} digits on ${cardType === 'amex' ? 'front' : 'back'} of card`}
                placeholder={cardType === 'amex' ? '1234' : '123'}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Security sx={{ color: '#6c757d', fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                  }
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Box 
                sx={{ 
                  p: 2, 
                  backgroundColor: '#f8f9fa', 
                  borderRadius: '8px',
                  border: '1px solid #e9ecef'
                }}
              >
                <Typography variant="body2" sx={{ color: '#6c757d', mb: 1 }}>
                  <Security sx={{ fontSize: 16, mr: 1, verticalAlign: 'middle' }} />
                  Your payment information is encrypted and secure
                </Typography>
                <Typography variant="caption" sx={{ color: '#6c757d' }}>
                  We use industry-standard SSL encryption to protect your data. 
                  Your card details are never stored on our servers.
                </Typography>
              </Box>
            </Grid>
          </>
        )}

        {formData.paymentMethod === 'paypal' && (
          <Grid item xs={12}>
            <Box 
              sx={{ 
                p: 3, 
                textAlign: 'center',
                backgroundColor: '#fff3cd',
                borderRadius: '8px',
                border: '1px solid #ffeaa7'
              }}
            >
              <Typography variant="h6" sx={{ color: '#856404', mb: 1 }}>
                PayPal Payment
              </Typography>
              <Typography variant="body2" sx={{ color: '#856404' }}>
                You will be redirected to PayPal to complete your payment securely.
              </Typography>
            </Box>
          </Grid>
        )}

        {(formData.paymentMethod === 'apple_pay' || formData.paymentMethod === 'google_pay') && (
          <Grid item xs={12}>
            <Box 
              sx={{ 
                p: 3, 
                textAlign: 'center',
                backgroundColor: '#d1ecf1',
                borderRadius: '8px',
                border: '1px solid #bee5eb'
              }}
            >
              <Typography variant="h6" sx={{ color: '#0c5460', mb: 1 }}>
                {formData.paymentMethod === 'apple_pay' ? 'Apple Pay' : 'Google Pay'}
              </Typography>
              <Typography variant="body2" sx={{ color: '#0c5460' }}>
                Use your {formData.paymentMethod === 'apple_pay' ? 'Touch ID, Face ID, or passcode' : 'fingerprint or PIN'} to complete the payment.
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default PaymentForm;