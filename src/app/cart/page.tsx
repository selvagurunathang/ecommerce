"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import QuantitySelector from "@/components/QuantitySelector";

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
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-grow">
            <div className="border rounded divide-y">
              <div className="overflow-x-auto">
                <table className="min-w-full text-left">
                  <thead className="bg-gray-100 text-sm uppercase font-bold text-gray-700 border-b">
                    <tr>
                      <th className="p-4">Item</th>
                      <th className="p-4">Unit Price</th>
                      <th className="p-4">Quantity</th>
                      <th className="p-4">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="p-4 flex items-center gap-4">
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="w-14 h-14 object-contain"
                          />
                          <div>
                            <p className="font-semibold">{item.title}</p>
                            <p className="text-xs text-gray-500">{item.sku || "SKU: N/A"}</p>
                          </div>
                        </td>

                        <td className="p-4 font-medium">C${item.price.toFixed(2)}</td>

                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <QuantitySelector
                              quantity={item.quantity}
                              onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                              onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                            />
                            <button
                              onClick={() => removeItem(item.id)}
                              className="cursor-pointer text-gray-400 hover:text-red-500"
                              title="Remove"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>

                        <td className="p-4 font-semibold">
                          C${(item.price * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
              <button className="bg-[#c9921f] hover:bg-[#b8821a] w-full text-white py-3 rounded-lg font-semibold mb-4">
                CHECKOUT NOW
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}