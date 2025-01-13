import React, { useState } from 'react';
import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);
    
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  return (
    <div className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 bg-white relative group">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
          {isImageLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
            quality={75}
            onLoad={() => setIsImageLoading(false)}
            className={`object-cover object-center transform group-hover:scale-105 transition-transform duration-300 
              ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
          />
        </div>
        <h3 className="text-base font-semibold text-gray-800 line-clamp-1 font-sans">
          {product.title}
        </h3>
        <p className="text-lg font-bold text-blue-600 mt-1">${product.price}</p>
        <div className="flex items-center mt-2">
          <span className="text-yellow-400">★</span>
          <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
        </div>
      </Link>
      <button
        onClick={handleAddToCart}
        disabled={isAdding}
        className={`mt-3 w-full py-2 px-4 rounded-lg text-sm font-medium 
          transition-all duration-300 ease-in-out transform
          flex items-center justify-center gap-2
          ${isAdding 
            ? 'bg-green-500 text-white scale-95' 
            : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
      >
        <span className={`transition-transform duration-300 ${isAdding ? 'scale-110' : ''}`}>
          {isAdding ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            <ShoppingCart className="w-4 h-4" />
          )}
        </span>
        <span className="inline-block transition-transform duration-300">
          {isAdding ? 'Added!' : 'Add to Cart'}
        </span>
      </button>
    </div>
  );
}