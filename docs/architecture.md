# Architecture & Project Setup for ShopSmart

## Folder Structure

```
src/
├── components/
│   ├── common/              # Reusable UI components
│   │   ├── LoadingSpinner.jsx
│   │   ├── ErrorBoundary.jsx
│   │   ├── Rating.jsx
│   │   ├── Pagination.jsx
│   │   └── EmptyState.jsx
│   ├── layout/              # Layout components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   └── Layout.jsx
│   ├── products/            # Product components
│   │   ├── ProductCard.jsx
│   │   ├── ProductGrid.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── ProductFilters.jsx
│   │   ├── ProductSearch.jsx
│   │   ├── CategoryList.jsx
│   │   └── ProductReviews.jsx
│   ├── user/                # User components
│   │   ├── LoginForm.jsx
│   │   ├── RegisterForm.jsx
│   │   ├── UserProfile.jsx
│   │   └── PasswordReset.jsx
│   ├── cart/                # Cart components
│   │   ├── CartItem.jsx
│   │   ├── CartSummary.jsx
│   │   ├── CheckoutForm.jsx
│   │   └── OrderConfirmation.jsx
│   └── forms/               # Form components
│       ├── AddressForm.jsx
│       └── PaymentForm.jsx
├── pages/                   # Route components
│   ├── HomePage.jsx
│   ├── ProductsPage.jsx
│   ├── ProductDetailPage.jsx
│   ├── CartPage.jsx
│   ├── CheckoutPage.jsx
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── ProfilePage.jsx
│   └── OrderHistoryPage.jsx
├── store/                   # Redux store
│   ├── index.js             # Store configuration
│   ├── slices/
│   │   ├── productSlice.js  # Product state
│   │   ├── categorySlice.js # Category state
│   │   ├── userSlice.js     # User state
│   │   └── cartSlice.js     # Cart state
│   ├── api/
│   │   ├── apiSlice.js      # RTK Query base setup
│   │   ├── productApi.js    # Product endpoints
│   │   └── userApi.js       # User endpoints
│   └── selectors/
│       ├── productSelectors.js # Product selectors
│       └── cartSelectors.js    # Cart selectors
├── services/                # Data services
│   ├── authService.js       # Authentication
│   └── storageService.js    # Local storage operations
├── hooks/                   # Custom hooks
│   ├── useLocalStorage.js
│   ├── useProducts.js       # Product hooks
│   └── useCart.js           # Cart hooks
├── utils/                   # Helper functions
│   ├── formatters.js        # Price, date formatters
│   ├── validators.js        # Form validation
│   └── constants.js         # App constants
├── styles/                  # Global styles
│   └── theme.js            # MUI theme configuration
└── App.jsx                 # Main app component
```

## Data Models

### Product Object Structure
```javascript
{
  id: number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string,
  rating: {
    rate: number,
    count: number
  }
}
```

### User Object Structure
```javascript
{
  id: number,
  email: string,
  username: string,
  password: string,
  name: {
    firstname: string,
    lastname: string
  },
  address: {
    city: string,
    street: string,
    number: number,
    zipcode: string,
    geolocation: {
      lat: string,
      long: string
    }
  },
  phone: string
}
```

### Cart Object Structure
```javascript
{
  id: number,
  userId: number,
  date: string,
  products: [
    {
      productId: number,
      quantity: number
    }
  ]
}
```

### Order Object Structure
```javascript
{
  id: number,
  userId: number,
  products: [
    {
      productId: number,
      quantity: number
    }
  ],
  date: string,
  shippingAddress: {
    address: string,
    city: string,
    state: string,
    zipCode: string,
    country: string
  },
  paymentDetails: {
    method: string,
    cardLastFour: string
  },
  status: string,
  total: number
}
```

## Feature Organization

### Core Features
- Product browsing and catalog
- User authentication and profiles
- Shopping cart and checkout
- Order management

### Component Organization
- **Product-related**: 
  - `/components/products/`
  - `/store/slices/productSlice.js`
  - `/store/slices/categorySlice.js`
  - `/store/api/productApi.js`
  - `/pages/ProductsPage.jsx`
  - `/pages/ProductDetailPage.jsx`
  - `/pages/HomePage.jsx`

- **User-related**:
  - `/components/user/`
  - `/store/slices/userSlice.js`
  - `/store/api/userApi.js`
  - `/pages/LoginPage.jsx`
  - `/pages/RegisterPage.jsx`
  - `/pages/ProfilePage.jsx`

- **Cart & Checkout-related**:
  - `/components/cart/`
  - `/store/slices/cartSlice.js`
  - `/pages/CartPage.jsx`
  - `/pages/CheckoutPage.jsx`
  - `/pages/OrderHistoryPage.jsx`

- **Shared Components**:
  - `/components/common/`
  - `/components/layout/`
  - `/components/forms/`
  - `/utils/`
  - `/styles/`
  - `/App.jsx`

## API Integration

### Fake Store API Endpoints
- `GET /products` - Get all products
- `GET /products/{id}` - Get single product
- `GET /products/categories` - Get all categories
- `GET /products/category/{categoryName}` - Get products by category
- `POST /auth/login` - User login
- `GET /users` - Get all users
- `GET /users/{id}` - Get single user
- `POST /users` - Add new user
- `GET /carts` - Get all carts
- `GET /carts/{id}` - Get single cart
- `POST /carts` - Add new cart

## Git Workflow

1. **Main Branch**: Production-ready code
2. **Development Branch**: Integration branch
3. **Feature Branches**: Individual features
   - Format: `feature/feature-name` (e.g., `feature/product-grid`, `feature/cart-summary`)
4. **Pull Request Process**:
   - Code review before merging
   - Automated tests must pass
   - No merge conflicts
   - Documentation updated

## File Naming Conventions
- Components: PascalCase (`ProductCard.jsx`)
- Hooks: camelCase with 'use' prefix (`useProducts.js`)
- Utils: camelCase (`formatters.js`)
- Constants: SCREAMING_SNAKE_CASE (`PRODUCT_CATEGORIES`)
