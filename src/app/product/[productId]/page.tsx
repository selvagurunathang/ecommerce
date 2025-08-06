"use client";

import { useEffect, useState } from "react";
import { fetchProductById } from "@/lib/api";
import CartButton from "@/components/CartButton";
import QuantitySelector from "@/components/QuantitySelector";
import React from "react";
import Image from 'next/image';

export default function ProductDetailsPage({ params }: { params: { productId: string } }) {
  const { productId } = React.use(params as unknown as Promise<{ productId: string }>);
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function getProduct() {
      const res = await fetchProductById(productId);
      setProduct(res);
    }

    getProduct();
  }, [productId]);

  if (!product) return <div className="p-6">Product not found</div>;

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <main className="p-6">
      <div className="max-w-5xl mx-auto border rounded-lg shadow p-6 flex flex-col md:flex-row gap-6 bg-white items-center md:items-start">
        <div className="flex-shrink-0">
          <Image
            width={288}
            height={288}
            quality={100}
            src={product.thumbnail}
            alt={product.title}
            className="w-72 h-auto rounded"
          />
        </div>

        <div className="flex-grow">
          <p className="text-xs uppercase text-gray-500 mb-1">{product.category}</p>
          <h1 className="text-2xl font-bold mb-1">{product.title}</h1>
          <p className="text-sm text-gray-500 mb-2">SKU: {product.sku}</p>
          <p className="text-green-600 font-medium mb-2">Availability: {product.availabilityStatus} ✅</p>
          <p className="text-lg font-semibold text-yellow-700 mb-2">
            C${product.price}
          </p>
          <div className="flex items-center gap-4 mb-4">
            <QuantitySelector
              quantity={quantity}
              onIncrease={increaseQty}
              onDecrease={decreaseQty}
            />
            <CartButton
              product={{
                id: product.id,
                title: product.title,
                price: product.price,
                thumbnail: product.thumbnail,
                sku: product.sku
              }}
              quantity={quantity}
            />
          </div>
          <p className="text-sm text-gray-600 mb-2">Average Rating: ⭐ {product.rating}</p>
        </div>
      </div>
    </main>
  );
}
