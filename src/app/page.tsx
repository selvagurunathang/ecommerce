'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Category {
  slug: string;
  name: string;
  url: string;
}

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch('/api/categories.json')
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.slug}>
            <Link
              href={`/category/${encodeURIComponent(category.slug)}`}
              className="text-blue-600 hover:underline"
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
