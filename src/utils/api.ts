import axios from 'axios';
import { Product, ProductsResponse } from '@/types/product';

const API_URL = 'https://dummyjson.com';

export const getProducts = async (): Promise<ProductsResponse> => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

export const getProduct = async (id: string): Promise<Product> => {
  const response = await axios.get(`${API_URL}/products/${id}`);
  return response.data;
};