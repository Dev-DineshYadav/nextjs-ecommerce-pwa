import { GetStaticProps } from 'next';
import { useState } from 'react';
import { Product } from '../types/product';
import { getProducts } from '../utils/api';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';

interface HomeProps {
  products: Product[];
}

export default function Home({ products }: HomeProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 font-sans tracking-tight">
          E-Commerce <span className="text-blue-600">PWA</span>
        </h1>
        <div className="mb-8 max-w-4xl mx-auto">
          <SearchBar onSearch={setSearchQuery} />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { products } = await getProducts();
  return {
    props: {
      products,
    },
    revalidate: 60,
  };
};