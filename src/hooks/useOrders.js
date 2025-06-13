import { useSelector, useDispatch } from 'react-redux';
import {
  placeOrder,
  updateOrderStatus,
  clearOrders,
  selectAllOrders,
  selectOrderById,
  selectOrdersLoading,
  selectOrdersError,
  selectUserOrders,
} from '../store/slices/orderSlice';

export const useOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectAllOrders);
  const isLoading = useSelector(selectOrdersLoading);
  const error = useSelector(selectOrdersError);

  const createOrder = (orderData) => {
    dispatch(placeOrder(orderData));
  };

  const updateStatus = (orderId, status) => {
    dispatch(updateOrderStatus({ orderId, status }));
  };

  const clearAllOrders = () => {
    dispatch(clearOrders());
  };

  const getOrderById = (orderId) => {
    return useSelector(state => selectOrderById(state, orderId));
  };

  const getUserOrders = (userId) => {
    return useSelector(state => selectUserOrders(state, userId));
  };

  return {
    orders,
    isLoading,
    error,
    createOrder,
    updateStatus,
    clearAllOrders,
    getOrderById,
    getUserOrders,
  };
}; 