# Architecture Patterns for ShopSmart

## Component Patterns

### Presentational vs Container Components
- **Presentational Components**: Focus on UI rendering, receive data via props
- **Container Components**: Connect to Redux store, handle data fetching and business logic

### Component Structure
```jsx
// Standard component structure
import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from './ComponentName.styles';

const ComponentName = ({ prop1, prop2 }) => {
  // Local state, effects, handlers
  
  return (
    <div className={classes.root}>
      {/* Component JSX */}
    </div>
  );
};

ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
};

ComponentName.defaultProps = {
  prop2: 0,
};

export default ComponentName;
```

### Error Boundary Pattern
```jsx
// Wrap components with error boundaries
<ErrorBoundary fallback={<ErrorMessage />}>
  <ComponentThatMightError />
</ErrorBoundary>
```

## State Management Patterns

### Redux Slice Pattern
```javascript
// productSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  filters: {
    category: 'all',
    priceRange: [0, 1000],
    rating: 0,
  },
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    // Other reducers
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setFilters } = productSlice.actions;
export default productSlice.reducer;
```

### RTK Query Pattern
```javascript
// apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/products',
    }),
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
    }),
    // Other endpoints
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = apiSlice;
```

## Hook Patterns

### Custom Hook Pattern
```javascript
// useCart.js
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, updateQuantity } from '../store/slices/cartSlice';

export const useCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  
  const addItem = (product, quantity = 1) => {
    dispatch(addToCart({ product, quantity }));
  };
  
  const removeItem = (productId) => {
    dispatch(removeFromCart(productId));
  };
  
  const updateItem = (productId, quantity) => {
    dispatch(updateQuantity({ productId, quantity }));
  };
  
  return {
    cart,
    addItem,
    removeItem,
    updateItem,
    totalItems: cart.items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
  };
};
```

## Form Handling Patterns

### React Hook Form Pattern
```jsx
// LoginForm.jsx
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const LoginForm = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register('email')}
        label="Email"
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        {...register('password')}
        type="password"
        label="Password"
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <Button type="submit">Login</Button>
    </form>
  );
};
```

## API Integration Patterns

### Data Fetching with Loading States
```jsx
// ProductsPage.jsx
import { useGetProductsQuery } from '../store/api/productApi';

const ProductsPage = () => {
  const { data: products, isLoading, isError, error } = useGetProductsQuery();
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  if (isError) {
    return <ErrorMessage message={error.message} />;
  }
  
  return (
    <div>
      <ProductGrid products={products} />
    </div>
  );
};
```

## Routing Patterns

### Protected Routes Pattern
```jsx
// ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <Outlet />;
};

// Usage in App.jsx
<Routes>
  <Route path="/" element={<Layout />}>
    <Route index element={<HomePage />} />
    <Route path="products" element={<ProductsPage />} />
    <Route element={<ProtectedRoute />}>
      <Route path="profile" element={<ProfilePage />} />
      <Route path="orders" element={<OrderHistoryPage />} />
    </Route>
  </Route>
</Routes>
```

## Collaboration Patterns

### Module Boundary Pattern
- Define clear interfaces between different feature areas
- Use selectors for accessing state across feature boundaries
- Create shared hooks for cross-feature functionality

### Feature Development Workflow
1. Create feature branch from development
2. Implement feature with tests
3. Create pull request
4. Code review
5. Address feedback
6. Merge to development branch
7. Test integration
8. Merge to main when ready for release

## Testing Patterns

### Component Testing Pattern
```jsx
// ProductCard.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductCard from './ProductCard';

describe('ProductCard', () => {
  const mockProduct = {
    id: 1,
    title: 'Test Product',
    price: 99.99,
    image: 'test.jpg',
    rating: { rate: 4.5, count: 10 },
  };
  
  test('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByAltText('Test Product')).toHaveAttribute('src', 'test.jpg');
  });
  
  test('calls onAddToCart when add button is clicked', () => {
    const mockAddToCart = jest.fn();
    render(<ProductCard product={mockProduct} onAddToCart={mockAddToCart} />);
    
    userEvent.click(screen.getByRole('button', { name: /add to cart/i }));
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct, 1);
  });
});
```

## Error Handling Patterns

### API Error Handling Pattern
```javascript
// apiSlice.js
export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fakestoreapi.com',
    prepareHeaders: (headers) => {
      // Add auth headers if needed
      return headers;
    },
  }),
  endpoints: () => ({}),
});

// Usage with error handling
const { data, error, isLoading } = useGetProductsQuery();

// Component with error handling
if (error) {
  if (error.status === 401) {
    return <Navigate to="/login" />;
  }
  return <ErrorMessage message="Failed to load products" />;
}
```

## Performance Patterns

### Memoization Pattern
```jsx
// Use React.memo for expensive components
const ProductCard = React.memo(({ product, onAddToCart }) => {
  // Component implementation
});

// Use useMemo for expensive calculations
const filteredProducts = useMemo(() => {
  return products.filter(product => product.price <= priceFilter);
}, [products, priceFilter]);

// Use useCallback for function props
const handleAddToCart = useCallback((product) => {
  dispatch(addToCart(product));
}, [dispatch]);
```

## Styling Patterns

### MUI Styling Pattern
```jsx
// Component with MUI styling
import { styled } from '@mui/material/styles';

const StyledProductCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: theme.spacing(2),
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.03)',
    boxShadow: theme.shadows[8],
  },
}));

const ProductCard = ({ product }) => {
  return (
    <StyledProductCard>
      {/* Card content */}
    </StyledProductCard>
  );
};
```

## Responsive Design Patterns

### Responsive Grid Pattern
```jsx
// Responsive grid with MUI
<Grid container spacing={2}>
  {products.map(product => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
      <ProductCard product={product} />
    </Grid>
  ))}
</Grid>
```
