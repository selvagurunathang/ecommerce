"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import QuantitySelector from "@/components/QuantitySelector";
import Image from 'next/image';

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
            <div className="divide-y">
              <div className="overflow-x-auto">
                <table className="min-w-full text-left border border-gray-200">
                  <thead className="hidden md:table-header-group bg-gray-100 text-sm uppercase font-bold text-gray-700">
                    <tr>
                      <th className="p-4">Item</th>
                      <th className="p-4">Unit Price</th>
                      <th className="p-4">Quantity</th>
                      <th className="p-4">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr
                        key={item.id}
                        className="shadow-sm block md:table-row"
                      >
                        <td className="pt-4 block md:table-cell">
                          <div className="flex items-center gap-4">
                            <Image
                              width={288}
                              height={288}
                              quality={100}
                              src={item.thumbnail}
                              alt={item.title}
                              className="w-14 h-14 object-contain flex-shrink-0"
                            />
                            <div>
                              <Link href={`/product/${item.id}`} className="cursor-pointer">
                                <p className="font-semibold">{item.title}</p>
                              </Link>
                              <p className="text-xs text-gray-500">{item.sku || "SKU: N/A"}</p>
                              <p className="mt-1 md:hidden font-medium text-sm">C${item.price.toFixed(2)}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 font-medium hidden md:table-cell">
                          C${item.price.toFixed(2)}
                        </td>
                        <td className="p-4 block md:table-cell">
                          <div className="flex items-center gap-2 mt-2 md:mt-0">
                            <span className="font-medium md:hidden">Quantity:</span>
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
                        <td className="pr-4 font-semibold block md:table-cell text-right md:text-left">
                          <span className="font-medium md:hidden block mb-1">Total:</span>
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
            <div className="border border-gray-200 p-6">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-semibold">C${subtotal.toFixed(2)}</span>
                </div>
                <div className="pt-3 mt-3">
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