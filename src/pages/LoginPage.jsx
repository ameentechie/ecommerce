import { useState } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
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
  Divider,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material';
import {
  LockOutlined,
  Visibility,
  VisibilityOff,
  Google,
  Facebook,
  Email,
  Close,
} from '@mui/icons-material';
import { useLoginMutation } from '../store/api/userApi';
import { setCredentials } from '../store/slices/userSlice';

/**
 * LoginPage component for user authentication
 */
const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  // Get redirect path from location state or default to home
  const from = location.state?.from?.pathname || '/';
  
  // Form state
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  
  // Forgot password modal state
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetEmailError, setResetEmailError] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  
  // RTK Query login mutation
  const [login, { isLoading, error }] = useLoginMutation();
  
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
    
    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Validate email for password reset
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Handle forgot password modal
  const handleForgotPasswordOpen = (e) => {
    e.preventDefault(); // Prevent form submission
    e.stopPropagation(); // Stop event bubbling
    setForgotPasswordOpen(true);
    setResetEmail('');
    setResetEmailError('');
    setResetSuccess(false);
  };
  
  const handleForgotPasswordClose = () => {
    setForgotPasswordOpen(false);
    setResetEmail('');
    setResetEmailError('');
    setResetSuccess(false);
  };
  
  const handleResetEmailChange = (e) => {
    setResetEmail(e.target.value);
    if (resetEmailError) {
      setResetEmailError('');
    }
  };
  
  const handlePasswordReset = async () => {
    // Validate email
    if (!resetEmail.trim()) {
      setResetEmailError('Email address is required');
      return;
    }
    
    if (!validateEmail(resetEmail)) {
      setResetEmailError('Please enter a valid email address');
      return;
    }
    
    setResetLoading(true);
    
    // Simulate API call for password reset
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay
      
      // Simulate successful password reset
      setResetSuccess(true);
      setResetLoading(false);
      
      // Auto close modal after 3 seconds
      setTimeout(() => {
        handleForgotPasswordClose();
      }, 3000);
      
    } catch (error) {
      setResetLoading(false);
      setResetEmailError('Failed to send reset instructions. Please try again.');
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      const result = await login({
        username: formData.username,
        password: formData.password,
      }).unwrap();
      
      // Store user credentials in Redux
      dispatch(setCredentials(result));
      
      // Navigate to the previous page or home
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Login failed:', err);
      setFormErrors({
        ...formErrors,
        submit: err.data?.message || 'Invalid username or password. Please try again.',
      });
    }
  };
  
  // Demo login with predefined credentials
  const handleDemoLogin = async () => {
    setFormData({
      username: 'johnd',
      password: 'm38rmF$',
    });
    
    try {
      const result = await login({
        username: 'johnd',
        password: 'm38rmF$',
      }).unwrap();
      
      dispatch(setCredentials({
        user: result.user,
        token: result.token,
      }));
      
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Demo login failed:', err);
    }
  };
  
  // Handle external redirections
  const handleGoogleLogin = () => {
    // Redirect to Google's OAuth login page
    window.open('https://accounts.google.com/signin', '_blank');
  };

  const handleFacebookLogin = () => {
    // Redirect to Facebook's login page
    window.open('https://www.facebook.com/login', '_blank');
  };
  
  return (
    <>
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} sx={{ mt: 8, p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          
          {/* Error message */}
          {(error || formErrors.submit) && (
            <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
              {formErrors.submit || error?.data?.message || 'Login failed. Please try again.'}
            </Alert>
          )}
          
          {/* Login Form */}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={formData.username}
              onChange={handleChange}
              error={!!formErrors.username}
              helperText={formErrors.username}
              disabled={isLoading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              error={!!formErrors.password}
              helperText={formErrors.password}
              disabled={isLoading}
              InputProps={{
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
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
            
            <Button
              fullWidth
              variant="outlined"
              sx={{ mb: 2 }}
              onClick={handleDemoLogin}
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
            >
              {isLoading ? 'Loading Demo...' : 'Demo Login'}
            </Button>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 2 }}>
              <Button
                variant="text"
                size="small"
                onClick={handleForgotPasswordOpen}
                sx={{ 
                  textTransform: 'none',
                  fontSize: '0.875rem',
                  color: 'primary.main',
                  p: 0,
                  minWidth: 'auto',
                  '&:hover': { 
                    backgroundColor: 'transparent',
                    textDecoration: 'underline' 
                  }
                }}
              >
                Forgot password?
              </Button>
              <Link component={RouterLink} to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Box>
          
            <Divider sx={{ my: 3, width: '100%' }}>
              <Typography variant="body2" color="text.secondary">
                OR
              </Typography>
            </Divider>
            
            {/* Social Login Buttons */}
            <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Google />}
                onClick={handleGoogleLogin}
                sx={{ 
                  borderColor: '#DB4437', 
                  color: '#DB4437',
                  '&:hover': {
                    borderColor: '#DB4437',
                    backgroundColor: 'rgba(219, 68, 55, 0.04)',
                  }
                }}
              >
                Google
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Facebook />}
                onClick={handleFacebookLogin}
                sx={{ 
                  borderColor: '#4267B2', 
                  color: '#4267B2',
                  '&:hover': {
                    borderColor: '#4267B2',
                    backgroundColor: 'rgba(66, 103, 178, 0.04)',
                  }
                }}
              >
                Facebook
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>

      {/* Forgot Password Modal */}
      <Dialog 
        open={forgotPasswordOpen} 
        onClose={handleForgotPasswordClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Email color="primary" />
            <Typography variant="h6" component="span">
              Reset Password
            </Typography>
          </Box>
          <IconButton onClick={handleForgotPasswordClose} size="small">
            <Close />
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ pt: 2 }}>
          {!resetSuccess ? (
            <>
              <DialogContentText sx={{ mb: 3 }}>
                Enter your registered email address and we'll send you instructions to reset your password.
              </DialogContentText>
              
              <TextField
                autoFocus
                margin="dense"
                label="Email Address"
                type="email"
                fullWidth
                variant="outlined"
                value={resetEmail}
                onChange={handleResetEmailChange}
                error={!!resetEmailError}
                helperText={resetEmailError}
                disabled={resetLoading}
                placeholder="Enter your email address"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{ mt: 2 }}
              />
            </>
          ) : (
            <Box sx={{ textAlign: 'center', py: 2 }}>
              <Email sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom color="success.main">
                Reset Instructions Sent!
              </Typography>
              <Typography variant="body2" color="text.secondary">
                We've sent password reset instructions to <strong>{resetEmail}</strong>. 
                Please check your email and follow the instructions to reset your password.
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
                This modal will close automatically in a few seconds.
              </Typography>
            </Box>
          )}
        </DialogContent>
        
        {!resetSuccess && (
          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button 
              onClick={handleForgotPasswordClose} 
              color="inherit"
              disabled={resetLoading}
            >
              Cancel
            </Button>
            <Button 
              onClick={handlePasswordReset} 
              variant="contained"
              disabled={resetLoading || !resetEmail.trim()}
              startIcon={resetLoading ? <CircularProgress size={16} /> : <Email />}
            >
              {resetLoading ? 'Sending...' : 'Send Reset Instructions'}
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </>
  );
};

export default LoginPage;
