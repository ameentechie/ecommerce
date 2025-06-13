import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
} from '@mui/icons-material';
import { useGetUserByIdQuery, useUpdateUserMutation } from '../store/api/userApi';
import { updateUserProfile } from '../store/slices/userSlice';

const ProfilePage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.user);
  const [isEditing, setIsEditing] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Get current user's full profile from API
  const { data: userProfile, isLoading: isLoadingProfile } = useGetUserByIdQuery(currentUser?.id);
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const [formData, setFormData] = useState({
    email: currentUser?.email || '',
    username: currentUser?.username || '',
    firstname: currentUser?.name?.firstname || '',
    lastname: currentUser?.name?.lastname || '',
    phone: currentUser?.phone || '',
    city: currentUser?.address?.city || '',
    street: currentUser?.address?.street || '',
    number: currentUser?.address?.number || '',
    zipcode: currentUser?.address?.zipcode || '',
  });

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
          geolocation: userProfile?.address?.geolocation || { lat: '', long: '' },
        },
        password: currentUser.password, // Preserve the password
      };

      const result = await updateUser(updatedUser).unwrap();
      
      // Create a complete user object for Redux store
      const completeUserData = {
        ...currentUser,
        ...result,
        name: {
          ...currentUser.name,
          ...result.name,
        },
        address: {
          ...currentUser.address,
          ...result.address,
        },
      };
      
      // Update Redux store with complete user data
      dispatch(updateUserProfile(completeUserData));
      
      // Update local form data to reflect changes
      setFormData({
        email: result.email,
        username: result.username,
        firstname: result.name.firstname,
        lastname: result.name.lastname,
        phone: result.phone,
        city: result.address.city,
        street: result.address.street,
        number: result.address.number,
        zipcode: result.address.zipcode,
      });
      
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to update profile:', err);
      setFormErrors({
        submit: err.data?.message || 'Failed to update profile. Please try again.',
      });
    }
  };

  if (isLoadingProfile) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
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
      transform: 'translateY(-2px)',
    },
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Fade in timeout={800}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4,
            background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
            borderRadius: 2,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative top border */}
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

          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 4,
            position: 'relative',
          }}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                bgcolor: theme.palette.primary.main,
                mr: 3,
                boxShadow: 3,
                border: `4px solid ${theme.palette.background.paper}`,
              }}
            >
              <PersonIcon sx={{ fontSize: 50 }} />
            </Avatar>
            <Box>
              <Typography 
                variant="h4" 
                component="h1" 
                gutterBottom
                sx={{
                  fontWeight: 600,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: 'text',
                  textFillColor: 'transparent',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {isEditing ? 'Edit Profile' : 'Profile'}
              </Typography>
              <Typography 
                variant="subtitle1" 
                color="text.secondary"
                sx={{ opacity: 0.8 }}
              >
                Manage your personal information
              </Typography>
            </Box>
          </Box>

          {formErrors.submit && (
            <Fade in>
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 3,
                  borderRadius: 2,
                  boxShadow: 1,
                }}
              >
                {formErrors.submit}
              </Alert>
            </Fade>
          )}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Personal Information Card */}
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
                      <PersonIcon /> Personal Information
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
                          disabled={!isEditing}
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
                          disabled={!isEditing}
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

                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          disabled={!isEditing}
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

                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          disabled={!isEditing}
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
              </Grid>

              {/* Address Information Card */}
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
                          disabled={!isEditing}
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
                          disabled={!isEditing}
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
                          disabled={!isEditing}
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
                          disabled={!isEditing}
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
              </Grid>

              {/* Action Buttons */}
              <Grid item xs={12}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'flex-end', 
                  gap: 2, 
                  mt: 2 
                }}>
                  {isEditing ? (
                    <>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setIsEditing(false);
                          setFormErrors({});
                          setFormData({
                            email: currentUser?.email || '',
                            username: currentUser?.username || '',
                            firstname: currentUser?.name?.firstname || '',
                            lastname: currentUser?.name?.lastname || '',
                            phone: currentUser?.phone || '',
                            city: currentUser?.address?.city || '',
                            street: currentUser?.address?.street || '',
                            number: currentUser?.address?.number || '',
                            zipcode: currentUser?.address?.zipcode || '',
                          });
                        }}
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
                        disabled={isUpdating}
                        startIcon={isUpdating ? <CircularProgress size={20} /> : <SaveIcon />}
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
                        Save Changes
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={() => setIsEditing(true)}
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
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Fade>
    </Container>
  );
};

export default ProfilePage; 