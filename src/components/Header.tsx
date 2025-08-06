'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { Category } from "@/types/types";
import { fetchAllCategories } from "@/lib/api";
import { useCart } from "@/context/CartContext";
import Image from 'next/image';

export default function Header() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [headerHeight, setHeaderHeight] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const headerRef = useRef<HTMLDivElement>(null);
    const { totalItems } = useCart();
    const sidebarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const getCategories = async () => {
            const categories = await fetchAllCategories();
            setCategories(categories);
        };

        getCategories();
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target as Node)
            ) {
                setIsMobileMenuOpen(false);
            }
        };

        if (isMobileMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMobileMenuOpen]);

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
                className="py-4 md:py-0 fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-sm"
            >
                <div className="flex items-center justify-between px-6 py-4 relative">
                    <button
                        className="md:hidden text-xl"
                        onClick={() => setIsMobileMenuOpen(true)}
                        aria-label="Open Menu"
                    >
                        <FaBars />
                    </button>
                    <div className="md:hidden absolute left-1/2 transform -translate-x-1/2">
                        <Link href="/">
                            <Image width={288} height={288} quality={100} src="/logo.png" alt="Logo" className="h-12 w-auto" />
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <Link href="/">
                            <Image width={288} height={288} quality={100} src="/logo.png" alt="Logo" className="h-12 w-auto" />
                        </Link>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-800">
                        <Link href="/cart" className="flex items-center gap-2 hover:text-black transition-colors">
                            <div className="relative">
                                <FaShoppingCart className="text-lg" />
                                <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                    {totalItems}
                                </span>
                            </div>
                            <span className="hidden md:inline">Cart</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div style={{ height: `${headerHeight}px` }} />
            <nav className="bg-blue-900 text-white text-sm font-semibold px-6 py-3 hidden md:block">
                <ul className="flex flex-wrap gap-6">
                    {categories.map((category) => (
                        <li
                            key={category.slug}
                            className="hover:underline capitalize"
                        >
                            <Link href={`/category/${encodeURIComponent(category.slug)}`}>
                                {category.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-opacity-30 z-40"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
            <div
                ref={sidebarRef}
                className={`fixed top-0 left-0 h-full w-64 bg-blue-900 text-white p-6 z-50 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Categories</h2>
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-white text-xl"
                        aria-label="Close Menu"
                    >
                        <FaTimes />
                    </button>
                </div>
                <div className="overflow-y-auto max-h-[calc(100vh-80px)] space-y-4">
                    {categories.map((category) => (
                        <Link
                            key={category.slug}
                            href={`/category/${encodeURIComponent(category.slug)}`}
                            className="capitalize block hover:underline"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {category.name}
                        </Link>
                    ))}
                </div>
            </div>
        </header>
    );
}
