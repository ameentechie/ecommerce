import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid, 
  Card,
  CardContent,
  Breadcrumbs, 
  Link,
  Button,
  Chip,
  TextField,
  InputAdornment
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { 
  ExpandMore,
  Help as HelpIcon,
  Search,
  QuestionAnswer,
  Support,
  ShoppingCart,
  LocalShipping,
  AccountCircle,
  Payment,
  Assignment,
  Security,
  ContactSupport
} from '@mui/icons-material';

const HelpPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [expanded, setExpanded] = useState(false);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const categories = [
    {
      icon: <ShoppingCart sx={{ color: '#007bff', fontSize: 30 }} />,
      title: 'Orders & Shopping',
      description: 'Everything about placing orders and shopping',
      count: 8
    },
    {
      icon: <LocalShipping sx={{ color: '#28a745', fontSize: 30 }} />,
      title: 'Shipping & Delivery',
      description: 'Shipping times, tracking, and delivery info',
      count: 6
    },
    {
      icon: <Payment sx={{ color: '#17a2b8', fontSize: 30 }} />,
      title: 'Payments & Billing',
      description: 'Payment methods, refunds, and billing',
      count: 5
    },
    {
      icon: <AccountCircle sx={{ color: '#fd7e14', fontSize: 30 }} />,
      title: 'Account & Profile',
      description: 'Account settings and profile management',
      count: 4
    },
    {
      icon: <Assignment sx={{ color: '#6f42c1', fontSize: 30 }} />,
      title: 'Returns & Exchanges',
      description: 'Return policy and exchange process',
      count: 7
    },
    {
      icon: <Security sx={{ color: '#dc3545', fontSize: 30 }} />,
      title: 'Security & Privacy',
      description: 'Security settings and privacy policy',
      count: 3
    }
  ];

  const faqs = [
    {
      category: 'General',
      question: 'How do I create an account?',
      answer: 'To create an account, click on the "Register" button in the top right corner. Fill in your email, create a password, and verify your email address. You\'ll be able to start shopping immediately after verification.'
    },
    {
      category: 'Orders',
      question: 'How can I track my order?',
      answer: 'Once your order is shipped, you\'ll receive a tracking number via email. You can also track your orders by logging into your account and visiting the "My Orders" section. Real-time tracking information will be displayed there.'
    },
    {
      category: 'Shipping',
      question: 'What are your shipping options and costs?',
      answer: 'We offer standard shipping (5-7 business days) for $5.99, express shipping (2-3 business days) for $12.99, and overnight shipping for $24.99. Free standard shipping is available for orders over $50.'
    },
    {
      category: 'Returns',
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for most items. Items must be in original condition with tags attached. To start a return, go to your order history and click "Return Item". We\'ll provide a prepaid return label.'
    },
    {
      category: 'Payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay. All payments are processed securely using industry-standard encryption.'
    },
    {
      category: 'Account',
      question: 'How do I reset my password?',
      answer: 'Click on "Login" and then "Forgot Password". Enter your email address, and we\'ll send you a password reset link. Follow the instructions in the email to create a new password.'
    },
    {
      category: 'Products',
      question: 'How do I know if a product is in stock?',
      answer: 'Product availability is shown on each product page. If an item is out of stock, you\'ll see an "Out of Stock" message. You can sign up for restock notifications to be alerted when it becomes available again.'
    },
    {
      category: 'Orders',
      question: 'Can I modify or cancel my order?',
      answer: 'You can modify or cancel your order within 1 hour of placing it, as long as it hasn\'t been processed for shipping. Go to your order history and click "Modify" or "Cancel". After this window, please contact customer support.'
    }
  ];

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <Typography color="text.primary">Help</Typography>
          </Breadcrumbs>
        </Box>

        {/* Page Header */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 3 }}>
            <HelpIcon sx={{ fontSize: 40, color: '#007bff' }} />
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 700,
                color: '#343a40',
                fontSize: { xs: '2rem', md: '3rem' }
              }}
            >
              Help Center
            </Typography>
          </Box>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#6c757d',
              maxWidth: '600px',
              mx: 'auto',
              mb: 3,
              px: 2
            }}
          >
            Find answers to your questions and get the support you need
          </Typography>

          {/* Search Bar */}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
              placeholder="Search for help topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: '#6c757d' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                maxWidth: '500px',
                width: '100%',
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  '& fieldset': {
                    borderColor: '#e9ecef',
                  },
                  '&:hover fieldset': {
                    borderColor: '#007bff',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#007bff',
                    borderWidth: '2px',
                  },
                },
              }}
            />
          </Box>
        </Box>

        {/* Quick Links */}
        <Box sx={{ mb: 6 }}>
          <Typography 
            variant="h5" 
            gutterBottom 
            sx={{ 
              fontWeight: 600, 
              color: '#343a40', 
              mb: 4,
              textAlign: 'center'
            }}
          >
            Quick Help Categories
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Grid container spacing={3} sx={{ maxWidth: '1000px' }}>
              {categories.map((category, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card
                    elevation={0}
                    sx={{
                      border: '1px solid #e9ecef',
                      borderRadius: '12px',
                      transition: 'all 0.2s',
                      cursor: 'pointer',
                      height: '100%',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                        borderColor: '#007bff',
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <Box
                        sx={{
                          display: 'inline-flex',
                          p: 2,
                          borderRadius: '12px',
                          backgroundColor: 'rgba(0, 123, 255, 0.1)',
                          mb: 2,
                          alignSelf: 'center'
                        }}
                      >
                        {category.icon}
                      </Box>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 600, 
                          color: '#343a40',
                          mb: 1
                        }}
                      >
                        {category.title}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: '#6c757d',
                          mb: 2,
                          lineHeight: 1.5,
                          flex: 1
                        }}
                      >
                        {category.description}
                      </Typography>
                      <Chip
                        label={`${category.count} articles`}
                        size="small"
                        sx={{
                          backgroundColor: '#007bff',
                          color: '#ffffff',
                          fontWeight: 500,
                          alignSelf: 'center'
                        }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>

        {/* FAQ Section */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
          <Paper
            elevation={0}
            sx={{
              borderRadius: '12px',
              border: '1px solid #e9ecef',
              backgroundColor: '#ffffff',
              overflow: 'hidden',
              width: '100%',
              maxWidth: '900px'
            }}
          >
            <Box sx={{ p: 4, backgroundColor: '#f8f9fa', borderBottom: '1px solid #e9ecef', textAlign: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 1 }}>
                <QuestionAnswer sx={{ color: '#007bff' }} />
                <Typography variant="h5" sx={{ fontWeight: 600, color: '#343a40' }}>
                  Frequently Asked Questions
                </Typography>
              </Box>
              {searchQuery && (
                <Typography variant="body2" sx={{ color: '#6c757d' }}>
                  Found {filteredFAQs.length} result{filteredFAQs.length !== 1 ? 's' : ''} for "{searchQuery}"
                </Typography>
              )}
            </Box>
            
            <Box sx={{ p: 2 }}>
              {filteredFAQs.map((faq, index) => (
                <Accordion
                  key={index}
                  expanded={expanded === `panel${index}`}
                  onChange={handleAccordionChange(`panel${index}`)}
                  elevation={0}
                  sx={{
                    '&:before': {
                      display: 'none',
                    },
                    '&.Mui-expanded': {
                      margin: 0,
                    },
                    borderRadius: '8px',
                    mb: 1,
                    border: '1px solid #e9ecef',
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    sx={{
                      minHeight: '56px',
                      '&.Mui-expanded': {
                        minHeight: '56px',
                      },
                      '& .MuiAccordionSummary-content': {
                        alignItems: 'center',
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                      <Chip
                        label={faq.category}
                        size="small"
                        sx={{
                          backgroundColor: '#e9ecef',
                          color: '#343a40',
                          fontWeight: 500,
                          fontSize: '0.75rem'
                        }}
                      />
                      <Typography 
                        variant="subtitle1" 
                        sx={{ 
                          fontWeight: 500,
                          color: '#343a40'
                        }}
                      >
                        {faq.question}
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails sx={{ pt: 0 }}>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: '#6c757d',
                        lineHeight: 1.6,
                        pl: 6
                      }}
                    >
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
              
              {filteredFAQs.length === 0 && searchQuery && (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography variant="h6" sx={{ color: '#6c757d', mb: 2 }}>
                    No results found for "{searchQuery}"
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6c757d' }}>
                    Try different keywords or browse our help categories above
                  </Typography>
                </Box>
              )}
            </Box>
          </Paper>
        </Box>

        {/* Contact Support */}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: '12px',
              border: '1px solid #e9ecef',
              backgroundColor: '#ffffff',
              textAlign: 'center',
              width: '100%',
              maxWidth: '600px'
            }}
          >
            <ContactSupport sx={{ fontSize: 50, color: '#007bff', mb: 2 }} />
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#343a40' }}>
              Still Need Help?
            </Typography>
            <Typography variant="body1" sx={{ color: '#6c757d', mb: 3, maxWidth: '500px', mx: 'auto' }}>
              Can't find what you're looking for? Our customer support team is here to help you 24/7.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                startIcon={<Support />}
                onClick={() => navigate('/contact')}
                sx={{
                  backgroundColor: '#007bff',
                  px: 3,
                  py: 1.5,
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: '#0056b3',
                  },
                }}
              >
                Contact Support
              </Button>
              <Button
                variant="outlined"
                startIcon={<QuestionAnswer />}
                sx={{
                  borderColor: '#007bff',
                  color: '#007bff',
                  px: 3,
                  py: 1.5,
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: '#f8f9fa',
                    borderColor: '#0056b3',
                  },
                }}
              >
                Live Chat
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default HelpPage; 