'use client';

import { useEffect, useState } from 'react';
import ProductGrid from "@/components/ProductGrid";
import { Product } from "@/types/types";
import { fetchAllProducts } from "@/lib/api";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const products = await fetchAllProducts();
      setProducts(products);
    };

    getProducts();
  }, []);

  return (
    <>
      <main className="p-6">
        {products.length > 0 && <ProductGrid products={products} />}
      </main>
    </>
  );
}
