import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import Navbar from './Navbar';

/**
 * Main layout component that wraps all pages
 * Includes header, main content area, and footer
 */
const Layout = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Navbar />
      <Container 
        component="main" 
        maxWidth={false} 
        disableGutters
        sx={{ 
          flexGrow: 1,
          width: '100%',
          m: 0,
          p: 0
        }}
      >
        <Outlet />
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;
