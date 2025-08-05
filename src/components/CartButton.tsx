
"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/types";

export default function CartButton({ product, quantity }: {
    product: Product;
    quantity: number;
}) {
    const [cart, setCart] = useState<any[]>([]);

    useEffect(() => {
        const storedCart = sessionStorage.getItem("cart");
        if (storedCart) setCart(JSON.parse(storedCart));
    }, []);

    const addToCart = () => {
        const existingItemIndex = cart.findIndex((item) => item.id === product.id);

        let updatedCart;
        if (existingItemIndex !== -1) {
            updatedCart = [...cart];
            updatedCart[existingItemIndex].quantity += quantity;
        } else {
            updatedCart = [...cart, { ...product, quantity }];
        }

        setCart(updatedCart);
        sessionStorage.setItem("cart", JSON.stringify(updatedCart));
        alert(`${product.title} added to cart! (${quantity})`);
    };

    return (
        <button
            className="hover:pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold"
            onClick={addToCart}
        >
            Buy Now
        </button>
    );
}
