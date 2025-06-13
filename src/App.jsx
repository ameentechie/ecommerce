import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';

// Layout and Auth Components
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Page Components
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import BestSellersPage from './pages/BestSellersPage';
import NewItemsPage from './pages/NewItemsPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import HelpPage from './pages/HelpPage';

// Cart/Order Components
import CheckoutPage from './components/cart/CheckoutPage';
import OrderConfirmationPage from './components/cart/OrderConfirmationPage';
import ProductDetailPage from './pages/ProductDetailPage';

// You'll need to create these components:
// import NotFoundPage from './pages/NotFoundPage';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:id" element={<ProductDetailPage />} />
          <Route path="best-sellers" element={<BestSellersPage />} />
          <Route path="new-items" element={<NewItemsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="help" element={<HelpPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          
          {/* Protected Routes */}
          <Route path="cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
          <Route path="checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
          <Route path="order-confirmation" element={<ProtectedRoute><OrderConfirmationPage /></ProtectedRoute>} />
          <Route path="profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="orders" element={<ProtectedRoute><OrderHistoryPage /></ProtectedRoute>} />
          
          {/* <Route path="*" element={<NotFoundPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);

export default App;