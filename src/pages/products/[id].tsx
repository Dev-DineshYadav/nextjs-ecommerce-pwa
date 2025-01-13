import { GetStaticPaths, GetStaticProps } from 'next';
import { Product } from '../../types/product';
import { getProduct, getProducts } from '../../utils/api';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCart } from '@/contexts/CartContext';
import { ArrowLeft, Star } from 'lucide-react';
import { useState } from 'react';

interface ProductPageProps {
  product: Product;
}

export default function ProductPage({ product }: ProductPageProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const [mainImageLoading, setMainImageLoading] = useState(true);
  const [thumbnailLoadingStates, setThumbnailLoadingStates] = useState<boolean[]>(
    new Array(product.images?.length || 0).fill(true)
  );

  const handleBack = () => {
    router.back();
  };

  const handleThumbnailLoad = (index: number) => {
    setThumbnailLoadingStates(prev => {
      const newStates = [...prev];
      newStates[index] = false;
      return newStates;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <button
          onClick={handleBack}
          className="text-gray-600 hover:text-gray-800 mb-8 flex items-center space-x-2 group transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="font-medium">Back to Products</span>
        </button>

        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <div className="relative aspect-square w-11/12 overflow-hidden rounded-xl border border-gray-200 bg-gray-100">
                {mainImageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  quality={85}
                  onLoad={() => setMainImageLoading(false)}
                  className={`object-cover object-center transition-opacity duration-300
                    ${mainImageLoading ? 'opacity-0' : 'opacity-100'}`}
                />
              </div>
              {product.images && product.images.length > 0 && (
                <div className="grid grid-cols-4 gap-3">
                  {product.images.map((image, index) => (
                    <div 
                      key={index} 
                      className="relative aspect-square w-11/12 rounded-lg border border-gray-200 overflow-hidden bg-gray-100"
                    >
                      {thumbnailLoadingStates[index] && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-6 h-6 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
                        </div>
                      )}
                      <Image
                        src={image}
                        alt={`${product.title} - Image ${index + 1}`}
                        fill
                        sizes="(max-width: 768px) 25vw, 12vw"
                        quality={75}
                        onLoad={() => handleThumbnailLoad(index)}
                        className={`object-cover object-center hover:scale-105 transition-all duration-300
                          ${thumbnailLoadingStates[index] ? 'opacity-0' : 'opacity-100'}`}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="ml-1 text-gray-600">{product.rating}</span>
                  </div>
                  {product.stock && (
                    <span className={`text-sm ${
                      product.stock > 10 ? 'text-green-600' : 'text-orange-600'
                    }`}>
                      {product.stock > 10 ? 'In Stock' : `Only ${product.stock} left`}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>

              <div className="space-y-4">
                <div className="flex items-baseline space-x-3">
                  <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                </div>

                <button
                  onClick={() => addToCart(product)}
                  className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { products } = await getProducts();
  const paths = products.map((product) => ({
    params: { id: product.id.toString() },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;
  const product = await getProduct(id);

  return {
    props: {
      product,
    },
    revalidate: 60,
  };
};