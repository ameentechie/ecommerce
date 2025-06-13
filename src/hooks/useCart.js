import { useSelector, useDispatch } from "react-redux";
import { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  decreaseQuantity, 
  clearCart 
} from "../store/slices/cartSlice";

export const useCart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const addItem = (item) => dispatch(addToCart(item));
  const removeItem = (id) => dispatch(removeFromCart(id));
  const updateItemQuantity = (id, quantity) => dispatch(updateQuantity({ id, quantity }));
  const decreaseItemQuantity = (id) => dispatch(decreaseQuantity(id));
  const clearAllItems = () => dispatch(clearCart());

  const getTotalPrice = () =>
    items.reduce((total, item) => total + item.price * item.quantity, 0);

  const getItemCount = () => 
    items.reduce((count, item) => count + item.quantity, 0);

  return { 
    items, 
    totalQuantity,
    totalAmount,
    addItem, 
    removeItem,
    updateItemQuantity,
    decreaseItemQuantity,
    clearAllItems,
    getTotalPrice,
    getItemCount
  };
};
