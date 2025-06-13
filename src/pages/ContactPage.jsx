import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Grid, 
  TextField, 
  Button, 
  Breadcrumbs, 
  Link,
  Card,
  CardContent,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { 
  Email, 
  Phone, 
  LocationOn, 
  AccessTime, 
  Send,
  Support,
  ContactMail
} from '@mui/icons-material';

const ContactPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Form submitted:', formData);
    setShowSuccess(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    // Hide success message after 5 seconds
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const contactInfo = [
    {
      icon: <Email sx={{ color: '#007bff', fontSize: 30 }} />,
      title: 'Email Us',
      content: 'support@shopsmart.com',
      subtitle: 'We\'ll respond within 24 hours'
    },
    {
      icon: <Phone sx={{ color: '#28a745', fontSize: 30 }} />,
      title: 'Call Us',
      content: '+1 (555) 123-4567',
      subtitle: 'Mon-Fri 9AM-6PM EST'
    },
    {
      icon: <LocationOn sx={{ color: '#dc3545', fontSize: 30 }} />,
      title: 'Visit Us',
      content: '123 Commerce Street, Business District',
      subtitle: 'New York, NY 10001'
    },
    {
      icon: <AccessTime sx={{ color: '#ffc107', fontSize: 30 }} />,
      title: 'Business Hours',
      content: 'Monday - Friday: 9AM - 6PM',
      subtitle: 'Saturday: 10AM - 4PM'
    }
  ];

  return (
    <Box sx={{ backgroundColor: '#f8f9fa', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Breadcrumbs */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Breadcrumbs
            sx={{ justifyContent: 'center', display: 'inline-flex' }}
            separator="›"
            aria-label="breadcrumb"
          >
            <Link
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
            <Typography color="text.primary">Contact</Typography>
          </Breadcrumbs>
        </Box>

        {/* Page Header */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 3 }}>
            <ContactMail sx={{ fontSize: 40, color: '#007bff' }} />
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 700,
                color: '#343a40',
                fontSize: { xs: '2rem', md: '3rem' }
              }}
            >
              Contact Us
            </Typography>
          </Box>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#6c757d',
              maxWidth: '600px',
              mx: 'auto',
              px: 2
            }}
          >
            We'd love to hear from you. Get in touch with our team for any questions or support.
          </Typography>
        </Box>

        {/* Success Alert */}
        {showSuccess && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <Alert 
              severity="success" 
              sx={{ 
                borderRadius: 2,
                maxWidth: '600px',
                width: '100%'
              }}
              onClose={() => setShowSuccess(false)}
            >
              Thank you for contacting us! We'll get back to you within 24 hours.
            </Alert>
          </Box>
        )}

        {/* Main Content */}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Grid container spacing={4} sx={{ maxWidth: '1200px' }}>
            {/* Contact Form */}
            <Grid item xs={12} md={8}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    borderRadius: '12px',
                    border: '1px solid #e9ecef',
                    backgroundColor: '#ffffff',
                    width: '100%',
                    maxWidth: '700px'
                  }}
                >
                  <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 2 }}>
                      <Send sx={{ color: '#007bff' }} />
                      <Typography variant="h5" sx={{ fontWeight: 600, color: '#343a40' }}>
                        Send us a Message
                      </Typography>
                    </Box>
                  </Box>
                  
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Your Name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '8px',
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Email Address"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '8px',
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          required
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '8px',
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Message"
                          name="message"
                          multiline
                          rows={6}
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '8px',
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            startIcon={<Send />}
                            sx={{
                              backgroundColor: '#007bff',
                              px: 4,
                              py: 1.5,
                              borderRadius: '8px',
                              textTransform: 'none',
                              fontSize: '1.1rem',
                              fontWeight: 600,
                              '&:hover': {
                                backgroundColor: '#0056b3',
                              },
                            }}
                          >
                            Send Message
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </form>
                </Paper>
              </Box>
            </Grid>

            {/* Contact Information */}
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}>
                {contactInfo.map((info, index) => (
                  <Card
                    key={index}
                    elevation={0}
                    sx={{
                      border: '1px solid #e9ecef',
                      borderRadius: '12px',
                      transition: 'transform 0.2s',
                      width: '100%',
                      maxWidth: '350px',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3, textAlign: 'center' }}>
                      <Box
                        sx={{
                          display: 'inline-flex',
                          p: 2,
                          borderRadius: '12px',
                          backgroundColor: 'rgba(0, 123, 255, 0.1)',
                          mb: 2
                        }}
                      >
                        {info.icon}
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: '#343a40', mb: 1 }}>
                        {info.title}
                      </Typography>
                      <Typography variant="body1" sx={{ color: '#343a40', fontWeight: 500, mb: 0.5 }}>
                        {info.content}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#6c757d' }}>
                        {info.subtitle}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
                
                {/* Support Note */}
                <Card
                  elevation={0}
                  sx={{
                    border: '1px solid #e9ecef',
                    borderRadius: '12px',
                    width: '100%',
                    maxWidth: '350px'
                  }}
                >
                  <CardContent sx={{ p: 3, textAlign: 'center' }}>
                    <Support sx={{ fontSize: 40, color: '#007bff', mb: 2 }} />
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#343a40', mb: 1 }}>
                      Need Immediate Help?
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#6c757d', mb: 2 }}>
                      Check out our FAQ section or live chat for instant support.
                    </Typography>
                    <Button
                      variant="outlined"
                      onClick={() => navigate('/help')}
                      sx={{
                        borderColor: '#007bff',
                        color: '#007bff',
                        textTransform: 'none',
                        borderRadius: '6px',
                        px: 3,
                        py: 1,
                        '&:hover': {
                          backgroundColor: '#007bff',
                          color: '#ffffff',
                        },
                      }}
                    >
                      Visit Help Center
                    </Button>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactPage; 