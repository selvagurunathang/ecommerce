import React from "react";
import Link from "next/link";
import { ProductCardProps } from "@/types/types";

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <Link href={`/product/${product.id}`}>
            <div className="border rounded-md shadow-sm hover:shadow-md transition duration-300 flex flex-col items-center p-4">
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-40 object-contain mb-4"
                />
                <div className="text-center">
                    <h2 className="font-semibold text-sm">{product.title}</h2>
                    <p className="text-gray-500 text-sm">{product.brand}</p>
                    <p className="text-blue-700 font-bold mt-1">C${product.price.toFixed(2)}</p>
                </div>
            </div>
        </Link>
    );
}
