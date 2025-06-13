import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";

export const useCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const addItem = (item) => dispatch(addToCart(item));

  const getTotalPrice = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return { cartItems, addItem, getTotalPrice };
};
