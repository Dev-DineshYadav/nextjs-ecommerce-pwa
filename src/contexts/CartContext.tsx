import { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '@/types/product';

interface CartContextType {
  cartItemCount: number;
  addToCart: (product: Product) => void;
}

const CartContext = createContext<CartContextType>({
  cartItemCount: 0,
  addToCart: () => {},
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItemCount(cart.length);
  }, []);

  const addToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = [...cart, { ...product, quantity: 1 }];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItemCount(updatedCart.length);
  };

  return (
    <CartContext.Provider value={{ cartItemCount, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
