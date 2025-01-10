import { Product } from '@/types/product';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 bg-white relative group">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
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
        onClick={() => addToCart(product)}
        className="mt-3 w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
      >
        Add to Cart
      </button>
    </div>
  );
}