"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Product, CartItem, CartContextType } from "@/types/types";

const CartContext = createContext<CartContextType>({
    cart: [],
    totalItems: 0,
    addToCart: () => { },
    removeFromCart: () => { },
    updateCartItemQuantity: () => { },
});

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        const storedCart = sessionStorage.getItem("cart");
        if (storedCart) {
            try {
                const parsedCart = JSON.parse(storedCart) as CartItem[];
                setCart(parsedCart);
                updateTotalItems(parsedCart);
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    const updateTotalItems = (cartItems: CartItem[]) => {
        const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        setTotalItems(total);
    };

    const addToCart = (product: Product, quantity: number) => {
        const existingItemIndex = cart.findIndex((item) => item.id === product.id);

        let updatedCart: CartItem[];
        if (existingItemIndex !== -1) {
            updatedCart = [...cart];
            updatedCart[existingItemIndex].quantity += quantity;
        } else {
            updatedCart = [...cart, { ...product, quantity }];
        }
        console.log("Product", product);

        setCart(updatedCart);
        updateTotalItems(updatedCart);
        sessionStorage.setItem("cart", JSON.stringify(updatedCart));
        alert(`${product.title} added to cart! (${quantity})`);
    };

    const removeFromCart = (id: string) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
        updateTotalItems(updatedCart);
        sessionStorage.setItem("cart", JSON.stringify(updatedCart));
        alert(`product removed from cart!`);
    };

    const updateCartItemQuantity = (id: string, newQuantity: number) => {
        if (newQuantity < 1) return;

        const updatedCart = cart.map(item =>
            item.id === id ? { ...item, quantity: newQuantity } : item
        );

        setCart(updatedCart);
        updateTotalItems(updatedCart);
        sessionStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    return (
        <CartContext.Provider value={{
            cart,
            totalItems,
            addToCart,
            removeFromCart,
            updateCartItemQuantity
        }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);