"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, removeFromCart, updateCartItemQuantity, totalItems } = useCart();

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateCartItemQuantity(id, newQuantity);
  };

  const removeItem = (id: string) => {
    removeFromCart(id);
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Cart ({totalItems} {totalItems === 1 ? 'Item' : 'Items'})</h1>
      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg mb-4">Your cart is empty</p>
          <Link href="/" className="text-blue-600 hover:underline">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-grow">
            <div className="border rounded-lg divide-y">
              {cart.map((item) => (
                <div key={item.id} className="p-4 flex flex-col sm:flex-row gap-4">
                  <div className="flex-shrink-0">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-20 h-20 object-contain rounded"
                    />
                  </div>

                  <div className="flex-grow">
                    <h2 className="font-medium">{item.title}</h2>
                    <p className="text-sm text-gray-500">{item.sku || 'SKU: N/A'}</p>
                    <p className="text-lg font-semibold mt-1">C${item.price.toFixed(2)}</p>
                  </div>

                  <div className="flex flex-col items-end">
                    <div className="flex items-center border rounded mb-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-3">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                    <p className="font-medium">C${(item.price * item.quantity).toFixed(2)}</p>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 text-sm mt-2 hover:underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-80 flex-shrink-0">
            <div className="border rounded-lg p-6 bg-gray-50">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold">C${subtotal.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Grand Total:</span>
                    <span>C${subtotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold mb-4">
                CHECKOUT NOW
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}