'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import { Category } from "@/types/types";
import { fetchAllCategories } from "@/lib/api";

export default function Header() {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const getCategories = async () => {
            const categories = await fetchAllCategories();
            setCategories(categories);
        };

        getCategories();
    }, []);

    return (
        <header className="w-full border-b">
            <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                    <Link href="/">
                        <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
                    </Link>
                </div>
                <div className="flex items-center gap-6 text-sm text-gray-800">
                    <div className="flex items-center gap-1 cursor-pointer">
                        <FaShoppingCart />
                        <span className="bg-black text-white text-xs px-2 py-0.5 rounded-full">0</span>
                        <span>Cart</span>
                    </div>
                </div>
            </div>

            <nav className="bg-blue-900 text-white text-sm font-semibold px-6 py-3">
                <ul className="flex flex-wrap gap-6">
                    {categories.map((category) => (
                        <li
                            key={category.slug}
                            className="flex items-center gap-1 cursor-pointer hover:underline capitalize"
                        >
                            <Link href={`/category/${encodeURIComponent(category.slug)}`}>
                                {category.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
