import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Grid, 
  Card,
  CardContent,
  Breadcrumbs, 
  Link,
  Avatar,
  Chip
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { 
  Business,
  People,
  TrendingUp,
  Security,
  LocalShipping,
  Star,
  Verified,
  Timeline
} from '@mui/icons-material';

const AboutPage = () => {
  const navigate = useNavigate();

  const stats = [
    { icon: <People sx={{ fontSize: 30 }} />, number: '50K+', label: 'Happy Customers' },
    { icon: <Business sx={{ fontSize: 30 }} />, number: '1000+', label: 'Products' },
    { icon: <LocalShipping sx={{ fontSize: 30 }} />, number: '100K+', label: 'Orders Delivered' },
    { icon: <Star sx={{ fontSize: 30 }} />, number: '4.8', label: 'Average Rating' }
  ];

  const values = [
    {
      icon: <Security sx={{ color: '#007bff', fontSize: 40 }} />,
      title: 'Trust & Security',
      description: 'We prioritize your security with encrypted transactions and secure data handling.'
    },
    {
      icon: <TrendingUp sx={{ color: '#28a745', fontSize: 40 }} />,
      title: 'Quality Products',
      description: 'Every product is carefully selected and quality-tested before reaching you.'
    },
    {
      icon: <LocalShipping sx={{ color: '#17a2b8', fontSize: 40 }} />,
      title: 'Fast Delivery',
      description: 'Quick and reliable shipping with real-time tracking for all orders.'
    },
    {
      icon: <People sx={{ color: '#fd7e14', fontSize: 40 }} />,
      title: 'Customer First',
      description: '24/7 customer support and hassle-free returns for your satisfaction.'
    }
  ];

  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      avatar: 'SJ',
      description: 'Visionary leader with 15+ years in e-commerce'
    },
    {
      name: 'Mike Chen',
      role: 'CTO',
      avatar: 'MC',
      description: 'Tech expert ensuring seamless shopping experience'
    },
    {
      name: 'Emily Davis',
      role: 'Head of Customer Success',
      avatar: 'ED',
      description: 'Dedicated to making every customer happy'
    }
  ];

  const timeline = [
    { year: '2020', event: 'ShopSmart Founded', description: 'Started with a vision to revolutionize online shopping' },
    { year: '2021', event: 'First 1K Customers', description: 'Reached our first milestone of 1,000 happy customers' },
    { year: '2022', event: 'Product Expansion', description: 'Expanded to over 500 products across multiple categories' },
    { year: '2023', event: 'Mobile App Launch', description: 'Launched our mobile app for better shopping experience' },
    { year: '2024', event: 'AI Integration', description: 'Integrated AI for personalized recommendations' }
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
            <Typography color="text.primary">About</Typography>
          </Breadcrumbs>
        </Box>

        {/* Page Header */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 3 }}>
            <Business sx={{ fontSize: 40, color: '#007bff' }} />
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 700,
                color: '#343a40',
                fontSize: { xs: '2rem', md: '3rem' }
              }}
            >
              About ShopSmart
            </Typography>
          </Box>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#6c757d',
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.6,
              px: 2
            }}
          >
            We're passionate about bringing you the best products at unbeatable prices, 
            with exceptional service that puts you first.
          </Typography>
        </Box>

        {/* Stats Section */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: '12px',
              border: '1px solid #e9ecef',
              backgroundColor: '#ffffff',
              width: '100%',
              maxWidth: '900px'
            }}
          >
            <Grid container spacing={4} justifyContent="center">
              {stats.map((stat, index) => (
                <Grid item xs={6} md={3} key={index}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Box
                      sx={{
                        display: 'inline-flex',
                        p: 2,
                        borderRadius: '50%',
                        backgroundColor: '#007bff',
                        color: '#ffffff',
                        mb: 2
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        fontWeight: 700, 
                        color: '#343a40',
                        mb: 1
                      }}
                    >
                      {stat.number}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#6c757d', fontWeight: 500 }}>
                      {stat.label}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Box>

        {/* Our Story Section */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: '12px',
              border: '1px solid #e9ecef',
              backgroundColor: '#ffffff',
              width: '100%',
              maxWidth: '900px',
              textAlign: 'center'
            }}
          >
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: '#343a40', mb: 3 }}>
              Our Story
            </Typography>
            <Box sx={{ textAlign: 'left', maxWidth: '800px', mx: 'auto' }}>
              <Typography variant="body1" sx={{ color: '#6c757d', lineHeight: 1.8, mb: 3 }}>
                Founded in 2020, ShopSmart began with a simple mission: to make online shopping 
                more accessible, affordable, and enjoyable for everyone. What started as a small 
                team with big dreams has grown into a thriving marketplace that serves thousands 
                of customers worldwide.
              </Typography>
              <Typography variant="body1" sx={{ color: '#6c757d', lineHeight: 1.8, mb: 3 }}>
                We believe that great products shouldn't be expensive or hard to find. That's why 
                we've built partnerships with trusted suppliers and manufacturers to bring you 
                quality items at competitive prices, all while maintaining the highest standards 
                of customer service.
              </Typography>
              <Typography variant="body1" sx={{ color: '#6c757d', lineHeight: 1.8 }}>
                Today, ShopSmart continues to evolve, constantly improving our platform and 
                expanding our product range to meet your changing needs. We're not just an 
                e-commerce site – we're your shopping partner.
              </Typography>
            </Box>
          </Paper>
        </Box>

        {/* Our Values */}
        <Box sx={{ mb: 6 }}>
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              fontWeight: 600, 
              color: '#343a40', 
              mb: 4,
              textAlign: 'center'
            }}
          >
            Our Values
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Grid container spacing={4} sx={{ maxWidth: '900px' }}>
              {values.map((value, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Card
                    elevation={0}
                    sx={{
                      height: '100%',
                      border: '1px solid #e9ecef',
                      borderRadius: '12px',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 4, textAlign: 'center' }}>
                      <Box
                        sx={{
                          display: 'inline-flex',
                          p: 2,
                          borderRadius: '12px',
                          backgroundColor: 'rgba(0, 123, 255, 0.1)',
                          mb: 3
                        }}
                      >
                        {value.icon}
                      </Box>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 600, 
                          color: '#343a40', 
                          mb: 2 
                        }}
                      >
                        {value.title}
                      </Typography>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: '#6c757d', 
                          lineHeight: 1.6 
                        }}
                      >
                        {value.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>

        {/* Meet Our Team */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: '12px',
              border: '1px solid #e9ecef',
              backgroundColor: '#ffffff',
              width: '100%',
              maxWidth: '900px'
            }}
          >
            <Typography 
              variant="h4" 
              gutterBottom 
              sx={{ 
                fontWeight: 600, 
                color: '#343a40', 
                mb: 4,
                textAlign: 'center'
              }}
            >
              Meet Our Team
            </Typography>
            <Grid container spacing={4} justifyContent="center">
              {teamMembers.map((member, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        mx: 'auto',
                        mb: 2,
                        backgroundColor: '#007bff',
                        fontSize: '1.5rem',
                        fontWeight: 600
                      }}
                    >
                      {member.avatar}
                    </Avatar>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 600, 
                        color: '#343a40',
                        mb: 1
                      }}
                    >
                      {member.name}
                    </Typography>
                    <Chip
                      label={member.role}
                      size="small"
                      sx={{
                        backgroundColor: '#007bff',
                        color: '#ffffff',
                        mb: 2,
                        fontWeight: 500
                      }}
                    />
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#6c757d', 
                        lineHeight: 1.5 
                      }}
                    >
                      {member.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Box>

        {/* Timeline */}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: '12px',
              border: '1px solid #e9ecef',
              backgroundColor: '#ffffff',
              width: '100%',
              maxWidth: '900px'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 4 }}>
              <Timeline sx={{ color: '#007bff' }} />
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 600, 
                  color: '#343a40'
                }}
              >
                Our Journey
              </Typography>
            </Box>
            <Box sx={{ maxWidth: '700px', mx: 'auto' }}>
              {timeline.map((item, index) => (
                <Box 
                  key={index}
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'flex-start', 
                    gap: 3,
                    mb: index < timeline.length - 1 ? 4 : 0,
                    justifyContent: 'center'
                  }}
                >
                  <Box
                    sx={{
                      minWidth: 80,
                      height: 40,
                      borderRadius: '20px',
                      backgroundColor: '#007bff',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 600,
                      fontSize: '0.9rem'
                    }}
                  >
                    {item.year}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 600, 
                        color: '#343a40',
                        mb: 1
                      }}
                    >
                      {item.event}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: '#6c757d', 
                        lineHeight: 1.6 
                      }}
                    >
                      {item.description}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default AboutPage; 