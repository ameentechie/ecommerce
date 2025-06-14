import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Box,
  Avatar,
  Divider,
  Alert,
  CircularProgress,
  InputAdornment,
  useTheme,
  Fade,
  Card,
  CardContent,
  Collapse,
  Chip,
  IconButton,
  Skeleton,
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Home as HomeIcon,
  LocationCity as LocationCityIcon,
  LocationOn as LocationOnIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  AccountCircle,
  Logout,
  Security,
} from '@mui/icons-material';
import { useGetUserByIdQuery, useUpdateUserMutation } from '../store/api/userApi';
import { updateUserProfile, selectCurrentUser, setCredentials, logout } from '../store/slices/userSlice';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ProfilePage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const [isEditing, setIsEditing] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Get current user's full profile from API
  const { data: userProfile, isLoading: isLoadingProfile } = useGetUserByIdQuery(currentUser?.id);
  const [updateUser] = useUpdateUserMutation();

  // Initialize form data from localStorage or current user
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    firstname: '',
    lastname: '',
    phone: '',
    city: '',
    street: '',
    number: '',
    zipcode: '',
  });

  // Load user data from localStorage or current user on component mount
  useEffect(() => {
    const loadUserData = async () => {
      setIsLoading(true);
      try {
        // Try to load from localStorage first
        const storedUser = localStorage.getItem('user');
        let userData = currentUser;
        
        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            userData = parsedUser;
          } catch (error) {
            console.error('Error parsing stored user data:', error);
          }
        }

        if (userData) {
          setFormData({
            email: userData.email || '',
            username: userData.username || '',
            firstname: userData.name?.firstname || '',
            lastname: userData.name?.lastname || '',
            phone: userData.phone || '',
            city: userData.address?.city || '',
            street: userData.address?.street || '',
            number: userData.address?.number || '',
            zipcode: userData.address?.zipcode || '',
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email address';
    }

    if (!formData.firstname.trim()) {
      errors.firstname = 'First name is required';
    }

    if (!formData.lastname.trim()) {
      errors.lastname = 'Last name is required';
    }

    if (formData.phone && !/^\+?[\d\s-]+$/.test(formData.phone)) {
      errors.phone = 'Invalid phone number';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSaving(true);
    try {
      const updatedUser = {
        id: currentUser.id,
        email: formData.email,
        username: formData.username,
        name: {
          firstname: formData.firstname,
          lastname: formData.lastname,
        },
        phone: formData.phone,
        address: {
          city: formData.city,
          street: formData.street,
          number: formData.number ? parseInt(formData.number) : 0,
          zipcode: formData.zipcode,
          geolocation: userProfile?.address?.geolocation || currentUser?.address?.geolocation || { lat: '', long: '' },
        },
        password: currentUser.password, // Preserve the password
      };

      const result = await updateUser(updatedUser).unwrap();
      
      // Create a complete user object for Redux store and localStorage
      const completeUserData = {
        id: currentUser.id,
        username: result.username || formData.username,
        email: result.email || formData.email,
        name: {
          firstname: result.name?.firstname || formData.firstname,
          lastname: result.name?.lastname || formData.lastname,
        },
        phone: result.phone || formData.phone,
        address: {
          city: result.address?.city || formData.city,
          street: result.address?.street || formData.street,
          number: result.address?.number || formData.number,
          zipcode: result.address?.zipcode || formData.zipcode,
          geolocation: result.address?.geolocation || currentUser?.address?.geolocation || { lat: '', long: '' },
        },
        password: currentUser.password,
      };
      
      // Update Redux store
      dispatch(updateUserProfile(completeUserData));
      
      // Manually update localStorage to ensure persistence
      localStorage.setItem('user', JSON.stringify(completeUserData));
      
      // Update local form data to reflect changes
      setFormData({
        email: completeUserData.email,
        username: completeUserData.username,
        firstname: completeUserData.name.firstname,
        lastname: completeUserData.name.lastname,
        phone: completeUserData.phone,
        city: completeUserData.address.city,
        street: completeUserData.address.street,
        number: completeUserData.address.number,
        zipcode: completeUserData.address.zipcode,
      });
      
      setIsEditing(false);
      setUpdateSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setUpdateSuccess(false), 3000);
      
    } catch (err) {
      console.error('Failed to update profile:', err);
      setFormErrors({
        submit: err.data?.message || 'Failed to update profile. Please try again.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing - reset form data
      const userData = JSON.parse(localStorage.getItem('user')) || currentUser;
      setFormData({
        email: userData.email || '',
        username: userData.username || '',
        firstname: userData.name?.firstname || '',
        lastname: userData.name?.lastname || '',
        phone: userData.phone || '',
        city: userData.address?.city || '',
        street: userData.address?.street || '',
        number: userData.address?.number || '',
        zipcode: userData.address?.zipcode || '',
      });
      setFormErrors({});
      setShowAdditionalFields(false);
    } else {
      // Start editing - show additional fields
      setShowAdditionalFields(true);
    }
    setIsEditing(!isEditing);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  if (isLoading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Skeleton variant="circular" width={80} height={80} sx={{ mr: 3 }} />
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width="60%" height={40} />
              <Skeleton variant="text" width="40%" height={24} />
            </Box>
          </Box>
          
          <Divider sx={{ my: 3 }} />
          
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Skeleton variant="rectangular" height={56} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Skeleton variant="rectangular" height={56} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant="rectangular" height={56} />
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
            <Skeleton variant="rectangular" width={120} height={40} />
            <Skeleton variant="rectangular" width={100} height={40} />
          </Box>
        </Paper>
      </Container>
    );
  }

  if (!currentUser) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="error" gutterBottom>
            No user data available
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Please log in to view your profile
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/login')}
            sx={{ px: 4 }}
          >
            Go to Login
          </Button>
        </Paper>
      </Container>
    );
  }

  const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.primary.light,
      },
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: theme.palette.primary.main,
    },
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      transform: isEditing ? 'translateY(-2px)' : 'none',
    },
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Fade in timeout={600}>
        <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
          {/* Header Section */}
          <Box
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              p: 4,
              position: 'relative',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    bgcolor: 'rgba(255,255,255,0.2)',
                    mr: 3,
                    fontSize: '2rem'
                  }}
                >
                  <PersonIcon fontSize="large" />
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {formData.firstname} {formData.lastname}
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    {formData.email}
                  </Typography>
                </Box>
              </Box>
              
              <IconButton
                onClick={handleLogout}
                sx={{
                  color: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
                }}
              >
                <Logout />
              </IconButton>
            </Box>
          </Box>

          {/* Content Section */}
          <Box sx={{ p: 4 }}>
            {/* Success Message */}
            {updateSuccess && (
              <Fade in>
                <Alert severity="success" sx={{ mb: 3 }}>
                  Profile updated successfully! Changes have been saved.
                </Alert>
              </Fade>
            )}

            {/* Error Message */}
            {formErrors.submit && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {formErrors.submit}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* Basic Information Card - Always Visible */}
                <Grid item xs={12}>
                  <Card 
                    elevation={2}
                    sx={{ 
                      mb: 3,
                      background: theme.palette.background.paper,
                      borderRadius: 2,
                      transition: 'transform 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                      },
                    }}
                  >
                    <CardContent>
                      <Typography 
                        variant="h6" 
                        gutterBottom 
                        sx={{ 
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          color: theme.palette.primary.main,
                        }}
                      >
                        <PersonIcon /> Basic Information
                      </Typography>
                      <Divider sx={{ mb: 3 }} />
                      
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="First Name"
                            name="firstname"
                            value={formData.firstname}
                            onChange={handleChange}
                            disabled={!isEditing || isSaving}
                            error={!!formErrors.firstname}
                            helperText={formErrors.firstname}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <PersonIcon color={isEditing ? "primary" : "disabled"} />
                                </InputAdornment>
                              ),
                            }}
                            sx={textFieldStyles}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Last Name"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleChange}
                            disabled={!isEditing || isSaving}
                            error={!!formErrors.lastname}
                            helperText={formErrors.lastname}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <PersonIcon color={isEditing ? "primary" : "disabled"} />
                                </InputAdornment>
                              ),
                            }}
                            sx={textFieldStyles}
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={!isEditing || isSaving}
                            error={!!formErrors.email}
                            helperText={formErrors.email}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <EmailIcon color={isEditing ? "primary" : "disabled"} />
                                </InputAdornment>
                              ),
                            }}
                            sx={textFieldStyles}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Additional Information - Collapsible */}
                <Grid item xs={12}>
                  <Collapse in={showAdditionalFields}>
                    {/* Contact Information Card */}
                    <Card 
                      elevation={2}
                      sx={{ 
                        mb: 3,
                        background: theme.palette.background.paper,
                        borderRadius: 2,
                        transition: 'transform 0.2s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                        },
                      }}
                    >
                      <CardContent>
                        <Typography 
                          variant="h6" 
                          gutterBottom 
                          sx={{ 
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            color: theme.palette.primary.main,
                          }}
                        >
                          <PhoneIcon /> Contact Information
                        </Typography>
                        <Divider sx={{ mb: 3 }} />
                        
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Username"
                              name="username"
                              value={formData.username}
                              onChange={handleChange}
                              disabled={!isEditing || isSaving}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <PersonIcon color={isEditing ? "primary" : "disabled"} />
                                  </InputAdornment>
                                ),
                              }}
                              sx={textFieldStyles}
                            />
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              disabled={!isEditing || isSaving}
                              error={!!formErrors.phone}
                              helperText={formErrors.phone}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <PhoneIcon color={isEditing ? "primary" : "disabled"} />
                                  </InputAdornment>
                                ),
                              }}
                              sx={textFieldStyles}
                            />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>

                    {/* Address Information Card */}
                    <Card 
                      elevation={2}
                      sx={{ 
                        mb: 3,
                        background: theme.palette.background.paper,
                        borderRadius: 2,
                        transition: 'transform 0.2s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                        },
                      }}
                    >
                      <CardContent>
                        <Typography 
                          variant="h6" 
                          gutterBottom 
                          sx={{ 
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            color: theme.palette.primary.main,
                          }}
                        >
                          <LocationCityIcon /> Address Information
                        </Typography>
                        <Divider sx={{ mb: 3 }} />

                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Street"
                              name="street"
                              value={formData.street}
                              onChange={handleChange}
                              disabled={!isEditing || isSaving}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <HomeIcon color={isEditing ? "primary" : "disabled"} />
                                  </InputAdornment>
                                ),
                              }}
                              sx={textFieldStyles}
                            />
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="Street Number"
                              name="number"
                              value={formData.number}
                              onChange={handleChange}
                              disabled={!isEditing || isSaving}
                              type="number"
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <HomeIcon color={isEditing ? "primary" : "disabled"} />
                                  </InputAdornment>
                                ),
                              }}
                              sx={textFieldStyles}
                            />
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="City"
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              disabled={!isEditing || isSaving}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <LocationCityIcon color={isEditing ? "primary" : "disabled"} />
                                  </InputAdornment>
                                ),
                              }}
                              sx={textFieldStyles}
                            />
                          </Grid>

                          <Grid item xs={12} sm={6}>
                            <TextField
                              fullWidth
                              label="ZIP Code"
                              name="zipcode"
                              value={formData.zipcode}
                              onChange={handleChange}
                              disabled={!isEditing || isSaving}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <LocationOnIcon color={isEditing ? "primary" : "disabled"} />
                                  </InputAdornment>
                                ),
                              }}
                              sx={textFieldStyles}
                            />
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Collapse>
                </Grid>

                {/* Action Buttons */}
                <Grid item xs={12}>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 2, 
                    mt: 2 
                  }}>
                    {/* Show/Hide Additional Fields Button - Only when not editing */}
                    {!isEditing && (
                      <Button
                        variant="text"
                        onClick={() => setShowAdditionalFields(!showAdditionalFields)}
                        startIcon={showAdditionalFields ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        sx={{
                          textTransform: 'none',
                          color: theme.palette.primary.main,
                        }}
                      >
                        {showAdditionalFields ? 'Hide Additional Info' : 'Show Additional Info'}
                      </Button>
                    )}

                    <Box sx={{ display: 'flex', gap: 2, ml: 'auto' }}>
                      {isEditing ? (
                        <>
                          <Button
                            variant="outlined"
                            onClick={handleEditToggle}
                            startIcon={<CancelIcon />}
                            sx={{
                              borderRadius: 2,
                              px: 3,
                              transition: 'all 0.2s',
                              '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: 2,
                              },
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            type="submit"
                            variant="contained"
                            disabled={isSaving}
                            startIcon={isSaving ? <CircularProgress size={20} /> : <SaveIcon />}
                            sx={{
                              borderRadius: 2,
                              px: 3,
                              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                              transition: 'all 0.2s',
                              '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: 2,
                              },
                            }}
                          >
                            {isSaving ? 'Saving...' : 'Save Changes'}
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="contained"
                          onClick={handleEditToggle}
                          startIcon={<EditIcon />}
                          sx={{
                            borderRadius: 2,
                            px: 3,
                            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                            transition: 'all 0.2s',
                            '&:hover': {
                              transform: 'translateY(-2px)',
                              boxShadow: 2,
                            },
                          }}
                        >
                          Edit Profile
                        </Button>
                      )}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Paper>
      </Fade>

      {/* Loading overlay for save operation */}
      {isSaving && (
        <LoadingSpinner 
          fullScreen 
          message="Saving your profile changes..." 
          color="primary"
        />
      )}
    </Container>
  );
};

export default ProfilePage; 