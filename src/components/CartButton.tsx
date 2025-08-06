"use client";
import { Product } from "@/types/types";
import { useCart } from "@/context/CartContext";

export default function CartButton({ product, quantity }: {
    product: Product;
    quantity: number;
}) {
    const { addToCart } = useCart();

    return (
        <button
            className="cursor-pointer bg-[#c9921f] hover:bg-[#b8821a] text-white px-6 py-2 rounded font-semibold"
            onClick={() => addToCart(product, quantity)}
        >
            Buy Now
        </button>
    );
}