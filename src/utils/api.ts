import axios from 'axios';
import { Product, ProductsResponse } from '@/types/product';

const API_URL = 'https://dummyjson.com';

const instance = axios.create({
  baseURL: API_URL,
  timeout: 5000,
});

export const getProducts = async (): Promise<ProductsResponse> => {
  try {
    const response = await instance.get('/products');
    return response.data;
  } catch {
    // Try to get from cache if network request fails
    if ('caches' in window) {
      const cache = await caches.open('e-commerce-cache-v1');
      const cachedResponse = await cache.match(`${API_URL}/products`);
      if (cachedResponse) {
        const data = await cachedResponse.json();
        return data;
      }
    }
    throw new Error('Failed to fetch products and no cached data available');
  }
};

export const getProduct = async (id: string): Promise<Product> => {
  try {
    const response = await instance.get(`/products/${id}`);
    return response.data;
  } catch {
    // Try to get from cache if network request fails
    if ('caches' in window) {
      const cache = await caches.open('e-commerce-cache-v1');
      const cachedResponse = await cache.match(`${API_URL}/products/${id}`);
      if (cachedResponse) {
        const data = await cachedResponse.json();
        return data;
      }
    }
    throw new Error(`Failed to fetch product ${id} and no cached data available`);
  }
};

