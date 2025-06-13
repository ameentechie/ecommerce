import { useGetProductsQuery } from '../store/api/productApi';

export const useProducts = () => {
  return useGetProductsQuery({});
};