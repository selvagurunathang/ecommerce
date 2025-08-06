"use client";

import React from "react";

type QuantitySelectorProps = {
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
};

export default function QuantitySelector({ quantity, onIncrease, onDecrease }: QuantitySelectorProps) {
    return (
        <div className="flex items-center">
            <button
                onClick={onDecrease}
                className="text-white rounded bg-[#c9921f] hover:bg-[#b8821a] cursor-pointer px-3 py-1 text-xl"
            >
                -
            </button>
            <span className="px-4">{quantity}</span>
            <button
                onClick={onIncrease}
                className="text-white rounded bg-[#c9921f] hover:bg-[#b8821a] cursor-pointer px-3 py-1 text-xl"
            >
                +
            </button>
        </div>
    );
}
