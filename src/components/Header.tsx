'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import { Category } from "@/types/types";
import { fetchAllCategories } from "@/lib/api";

export default function Header() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [headerHeight, setHeaderHeight] = useState(0);
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const getCategories = async () => {
            const categories = await fetchAllCategories();
            setCategories(categories);
        };

        getCategories();
    }, []);

    useEffect(() => {
        if (headerRef.current) {
            const updateHeight = () => {
                setHeaderHeight(headerRef.current!.offsetHeight);
            };
            updateHeight();
            window.addEventListener('resize', updateHeight);
            return () => window.removeEventListener('resize', updateHeight);
        }
    }, []);

    return (
        <header className="w-full">
            <div
                ref={headerRef}
                className="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm"
            >
                <div className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-3">
                        <Link href="/">
                            <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
                        </Link>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-800">
                        <Link href="/cart" className="flex items-center gap-2 hover:text-black transition-colors">
                            <div className="relative">
                                <FaShoppingCart className="text-lg" />
                                <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">0</span>
                            </div>
                            <span>Cart</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div style={{ height: `${headerHeight}px` }} />
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
