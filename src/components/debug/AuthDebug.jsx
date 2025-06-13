import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Alert,
  Divider,
  Grid,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import { 
  selectCurrentUser, 
  selectCurrentToken, 
  selectAuthStatus,
  logout 
} from '../../store/slices/userSlice';
import { useLoginMutation, useCreateUserMutation } from '../../store/api/userApi';

const AuthDebug = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const authStatus = useSelector(selectAuthStatus);
  
  const [login] = useLoginMutation();
  const [createUser] = useCreateUserMutation();
  
  const [testCredentials, setTestCredentials] = useState({
    username: 'johndoe',
    password: 'password123'
  });
  
  const [testResult, setTestResult] = useState('');
  
  const handleTestLogin = async () => {
    try {
      setTestResult('Testing login...');
      const result = await login(testCredentials).unwrap();
      setTestResult(`✅ Login successful! User: ${result.user.username}`);
    } catch (error) {
      setTestResult(`❌ Login failed: ${error.message || 'Unknown error'}`);
    }
  };
  
  const handleTestRegistration = async () => {
    try {
      setTestResult('Testing registration...');
      const newUser = {
        email: `test${Date.now()}@example.com`,
        username: `testuser${Date.now()}`,
        password: 'testpass123',
        name: {
          firstname: 'Test',
          lastname: 'User'
        },
        address: {
          city: 'Test City',
          street: 'Test Street',
          number: 123,
          zipcode: '12345',
          geolocation: { lat: '', long: '' }
        },
        phone: '123-456-7890'
      };
      
      const result = await createUser(newUser).unwrap();
      setTestResult(`✅ Registration successful! User: ${result.user.username}`);
    } catch (error) {
      setTestResult(`❌ Registration failed: ${error.message || 'Unknown error'}`);
    }
  };
  
  const handleLogout = () => {
    dispatch(logout());
    setTestResult('🚪 Logged out successfully');
  };
  
  const getStorageData = () => {
    try {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');
      return {
        user: storedUser ? JSON.parse(storedUser) : null,
        token: storedToken
      };
    } catch (error) {
      return { error: error.message };
    }
  };
  
  const storageData = getStorageData();
  
  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        🔐 Authentication Debug Panel
      </Typography>
      
      <Grid container spacing={3}>
        {/* Current Auth State */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Current Authentication State
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Chip 
                  label={`Status: ${authStatus}`} 
                  color={authStatus === 'succeeded' ? 'success' : 'default'}
                  sx={{ mr: 1 }}
                />
                <Chip 
                  label={currentUser ? 'Logged In' : 'Not Logged In'} 
                  color={currentUser ? 'success' : 'error'}
                />
              </Box>
              
              {currentUser && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2">User Info:</Typography>
                  <Typography variant="body2">ID: {currentUser.id}</Typography>
                  <Typography variant="body2">Username: {currentUser.username}</Typography>
                  <Typography variant="body2">Email: {currentUser.email}</Typography>
                  <Typography variant="body2">
                    Name: {currentUser.name?.firstname} {currentUser.name?.lastname}
                  </Typography>
                </Box>
              )}
              
              {token && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2">Token:</Typography>
                  <Typography variant="body2" sx={{ wordBreak: 'break-all', fontSize: '0.8rem' }}>
                    {token.substring(0, 50)}...
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        {/* LocalStorage State */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                LocalStorage State
              </Typography>
              
              {storageData.error ? (
                <Alert severity="error">Error reading storage: {storageData.error}</Alert>
              ) : (
                <>
                  <Box sx={{ mb: 2 }}>
                    <Chip 
                      label={storageData.user ? 'User Data Found' : 'No User Data'} 
                      color={storageData.user ? 'success' : 'warning'}
                      sx={{ mr: 1 }}
                    />
                    <Chip 
                      label={storageData.token ? 'Token Found' : 'No Token'} 
                      color={storageData.token ? 'success' : 'warning'}
                    />
                  </Box>
                  
                  {storageData.user && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="subtitle2">Stored User:</Typography>
                      <Typography variant="body2">Username: {storageData.user.username}</Typography>
                      <Typography variant="body2">Email: {storageData.user.email}</Typography>
                    </Box>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
        
        {/* Test Controls */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Authentication Tests
              </Typography>
              
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Username"
                    value={testCredentials.username}
                    onChange={(e) => setTestCredentials({
                      ...testCredentials,
                      username: e.target.value
                    })}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    value={testCredentials.password}
                    onChange={(e) => setTestCredentials({
                      ...testCredentials,
                      password: e.target.value
                    })}
                  />
                </Grid>
              </Grid>
              
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
                <Button variant="contained" onClick={handleTestLogin}>
                  Test Login
                </Button>
                <Button variant="contained" color="secondary" onClick={handleTestRegistration}>
                  Test Registration
                </Button>
                {currentUser && (
                  <Button variant="outlined" color="error" onClick={handleLogout}>
                    Logout
                  </Button>
                )}
              </Box>
              
              {testResult && (
                <Alert 
                  severity={testResult.includes('✅') ? 'success' : testResult.includes('❌') ? 'error' : 'info'}
                  sx={{ mt: 2 }}
                >
                  {testResult}
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AuthDebug; 