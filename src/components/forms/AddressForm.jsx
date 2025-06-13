import React from 'react';
import {
  Box,
  TextField,
  Typography,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select
} from '@mui/material';
import { validateName, validateAddress, validateCity, validatePostalCode, validatePhone } from '../../utils/validators';

const AddressForm = ({ 
  formData, 
  onChange, 
  errors = {}, 
  title = "Shipping Address",
  showCountry = true 
}) => {
  const countries = [
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    { code: 'UK', name: 'United Kingdom' },
    { code: 'IN', name: 'India' },
    { code: 'AU', name: 'Australia' },
    { code: 'DE', name: 'Germany' },
    { code: 'FR', name: 'France' },
    { code: 'JP', name: 'Japan' },
    { code: 'BR', name: 'Brazil' },
    { code: 'MX', name: 'Mexico' }
  ];

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    onChange(field, value);
  };

  const getFieldError = (field, value) => {
    if (!value || !value.trim()) {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }

    switch (field) {
      case 'fullName':
        return validateName(value) ? '' : 'Please enter a valid name';
      case 'address':
        return validateAddress(value) ? '' : 'Please enter a valid address';
      case 'city':
        return validateCity(value) ? '' : 'Please enter a valid city name';
      case 'pincode':
        return validatePostalCode(value, formData.country || 'US') ? '' : 'Please enter a valid postal code';
      case 'phone':
        return validatePhone(value) ? '' : 'Please enter a valid phone number';
      default:
        return '';
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
          <TextField
            label="Full Name"
            fullWidth
            required
            value={formData.fullName || ''}
            onChange={handleChange('fullName')}
            error={!!errors.fullName}
            helperText={errors.fullName}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              }
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Street Address"
            fullWidth
            required
            multiline
            rows={2}
            value={formData.address || ''}
            onChange={handleChange('address')}
            error={!!errors.address}
            helperText={errors.address}
            placeholder="Enter your full street address"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              }
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="City"
            fullWidth
            required
            value={formData.city || ''}
            onChange={handleChange('city')}
            error={!!errors.city}
            helperText={errors.city}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              }
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="State/Province"
            fullWidth
            value={formData.state || ''}
            onChange={handleChange('state')}
            error={!!errors.state}
            helperText={errors.state}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              }
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Postal Code"
            fullWidth
            required
            value={formData.pincode || ''}
            onChange={handleChange('pincode')}
            error={!!errors.pincode}
            helperText={errors.pincode}
            placeholder="Enter postal/ZIP code"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              }
            }}
          />
        </Grid>

        {showCountry && (
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Country</InputLabel>
              <Select
                value={formData.country || 'US'}
                onChange={handleChange('country')}
                label="Country"
                sx={{
                  borderRadius: '8px',
                }}
              >
                {countries.map((country) => (
                  <MenuItem key={country.code} value={country.code}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )}

        <Grid item xs={12}>
          <TextField
            label="Phone Number"
            fullWidth
            required
            value={formData.phone || ''}
            onChange={handleChange('phone')}
            error={!!errors.phone}
            helperText={errors.phone}
            placeholder="Enter your phone number"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
              }
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddressForm; 