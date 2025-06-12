import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Container,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  Paper,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
  Fade,
  Divider,
  useTheme,
} from '@mui/material';
import {
  LockOutlined,
  Visibility,
  VisibilityOff,
  PersonOutline,
  EmailOutlined,
  AccountCircleOutlined,
} from '@mui/icons-material';
import { useCreateUserMutation } from '../store/api/userApi';
import { setCredentials } from '../store/slices/userSlice';

const RegisterPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  
  // RTK Query mutation hook
  const [createUser, { isLoading, error }] = useCreateUserMutation();
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear errors when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: '',
      });
    }
  };
  
  // Toggle password visibility
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  
  // Validate form
  const validateForm = () => {
    const errors = {};
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email address';
    }
    
    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      errors.username = 'Username must be at least 3 characters';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      // Create user object for API matching the db.json structure
      const userToCreate = {
        email: formData.email,
        username: formData.username,
        password: formData.password,
        name: {
          firstname: formData.firstName,
          lastname: formData.lastName
        },
        address: {
          city: "",
          street: "",
          number: 0,
          zipcode: "",
          geolocation: {
            lat: "",
            long: ""
          }
        },
        phone: ""
      };
      
      // Call the registration API
      const result = await createUser(userToCreate).unwrap();
      
      if (!result || !result.user) {
        throw new Error('Invalid response from server');
      }
      
      // Store user credentials in Redux (which will also save to localStorage)
      dispatch(setCredentials(result));
      
      // Navigate to home page after successful registration
      navigate('/', { replace: true });
    } catch (err) {
      console.error('Registration failed:', err);
      let errorMessage = 'Registration failed. Please try again.';
      
      if (err.status === 400) {
        errorMessage = 'Username or email already exists';
      } else if (err.data?.message) {
        errorMessage = err.data.message;
      }
      
      setFormErrors({
        ...formErrors,
        submit: errorMessage
      });
    }
  };
  
  // Custom styles for input fields to ensure full width
  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      width: '100%',
      borderRadius: 2,
      backgroundColor: theme.palette.background.paper,
      transition: 'all 0.3s ease-in-out',
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
      '&.Mui-focused': {
        backgroundColor: theme.palette.background.paper,
        boxShadow: `0 0 0 2px ${theme.palette.primary.main}25`,
      },
      '& fieldset': {
        borderWidth: '1px',
        borderColor: theme.palette.divider,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main,
      },
      '&.Mui-focused fieldset': {
        borderWidth: '2px',
      },
    },
    '& .MuiInputLabel-root': {
      transition: 'all 0.3s ease-in-out',
      '&.Mui-focused': {
        color: theme.palette.primary.main,
      },
    },
    '& .MuiInputAdornment-root': {
      '& .MuiSvgIcon-root': {
        fontSize: '1.3rem',
        color: theme.palette.text.secondary,
        transition: 'all 0.3s ease-in-out',
      },
    },
    '&:hover .MuiInputAdornment-root .MuiSvgIcon-root': {
      color: theme.palette.primary.main,
    },
    '& .Mui-focused .MuiInputAdornment-root .MuiSvgIcon-root': {
      color: theme.palette.primary.main,
    },
    width: '100%',
    display: 'block',
  };

  return (
    <Container component="main" maxWidth="xs">
      <Fade in timeout={800}>
        <Paper 
          elevation={6} 
          sx={{ 
            mt: 8, 
            p: { xs: 3, sm: 6 }, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
            borderRadius: 2,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            }}
          />
          
          <Avatar 
            sx={{ 
              m: 1, 
              width: 56, 
              height: 56,
              bgcolor: 'primary.main',
              boxShadow: 2,
            }}
          >
            <LockOutlined />
          </Avatar>
          
          <Typography 
            component="h1" 
            variant="h4" 
            sx={{ 
              mb: 3,
              fontWeight: 600,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Create Account
          </Typography>
          
          {error && (
            <Fade in>
              <Alert 
                severity="error" 
                sx={{ 
                  mt: 2, 
                  width: '100%',
                  borderRadius: 1,
                }}
              >
                {error.data?.message || 'Registration failed. Please try again.'}
              </Alert>
            </Fade>
          )}
          
          <Box 
            component="form" 
            onSubmit={handleSubmit} 
            noValidate 
            sx={{ 
              mt: 3,
              width: '100%',
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} sx={{ width: '100%' }}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={formData.firstName}
                  onChange={handleChange}
                  error={!!formErrors.firstName}
                  helperText={formErrors.firstName}
                  disabled={isLoading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutline />
                      </InputAdornment>
                    ),
                  }}
                  sx={inputStyles}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ width: '100%' }}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={!!formErrors.lastName}
                  helperText={formErrors.lastName}
                  disabled={isLoading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutline />
                      </InputAdornment>
                    ),
                  }}
                  sx={inputStyles}
                />
              </Grid>
              <Grid item xs={12} sx={{ width: '100%' }}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                  disabled={isLoading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlined />
                      </InputAdornment>
                    ),
                  }}
                  sx={inputStyles}
                />
              </Grid>
              <Grid item xs={12} sx={{ width: '100%' }}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={formData.username}
                  onChange={handleChange}
                  error={!!formErrors.username}
                  helperText={formErrors.username}
                  disabled={isLoading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircleOutlined />
                      </InputAdornment>
                    ),
                  }}
                  sx={inputStyles}
                />
              </Grid>
              <Grid item xs={12} sx={{ width: '100%' }}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!formErrors.password}
                  helperText={formErrors.password}
                  disabled={isLoading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlined />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleTogglePassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={inputStyles}
                />
              </Grid>
              <Grid item xs={12} sx={{ width: '100%' }}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type={showPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={!!formErrors.confirmPassword}
                  helperText={formErrors.confirmPassword}
                  disabled={isLoading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlined />
                      </InputAdornment>
                    ),
                  }}
                  sx={inputStyles}
                />
              </Grid>
            </Grid>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 4,
                mb: 2,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: 2,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                '&:hover': {
                  background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                },
                transition: 'all 0.3s ease-in-out',
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Create Account'
              )}
            </Button>
            
            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary">
                or
              </Typography>
            </Divider>
            
            <Grid container justifyContent="center">
              <Grid item>
                <Link 
                  component={RouterLink} 
                  to="/login" 
                  variant="body1"
                  sx={{
                    color: theme.palette.primary.main,
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Fade>
    </Container>
  );
};

export default RegisterPage; 