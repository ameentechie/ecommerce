import { useSelector, useDispatch } from 'react-redux';
import { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart,
  selectCartItems,
  selectCartTotal,
  selectCartItemCount
} from '../store/slices/cartSlice';

/**
 * Custom hook for cart operations
 * @returns {Object} Cart state and methods
 */
const useCart = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const itemCount = useSelector(selectCartItemCount);
  
  /**
   * Add a product to the cart
   * @param {Object} product - Product to add
   * @param {number} quantity - Quantity to add (default: 1)
   */
  const addItem = (product, quantity = 1) => {
    dispatch(addToCart({ product, quantity }));
  };
  
  /**
   * Remove a product from the cart
   * @param {number|string} productId - ID of product to remove
   */
  const removeItem = (productId) => {
    dispatch(removeFromCart(productId));
  };
  
  /**
   * Update the quantity of a product in the cart
   * @param {number|string} productId - ID of product to update
   * @param {number} quantity - New quantity
   */
  const updateItem = (productId, quantity) => {
    if (quantity <= 0) {
      removeItem(productId);
    } else {
      dispatch(updateQuantity({ productId, quantity }));
    }
  };
  
  /**
   * Empty the cart
   */
  const emptyCart = () => {
    dispatch(clearCart());
  };
  
  /**
   * Check if a product is in the cart
   * @param {number|string} productId - ID of product to check
   * @returns {boolean} True if product is in cart
   */
  const isInCart = (productId) => {
    return items.some(item => item.id === productId);
  };
  
  /**
   * Get the quantity of a product in the cart
   * @param {number|string} productId - ID of product to check
   * @returns {number} Quantity in cart (0 if not in cart)
   */
  const getItemQuantity = (productId) => {
    const item = items.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };
  
  return {
    items,
    total,
    itemCount,
    addItem,
    removeItem,
    updateItem,
    emptyCart,
    isInCart,
    getItemQuantity,
  };
};

export default useCart;
