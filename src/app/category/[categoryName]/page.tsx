import { notFound } from 'next/navigation';
import Link from 'next/link';

interface Product {
  id: number;
  title: string;
  price: number;
}

export default async function CategoryPage({ params }: { params: { categoryName: string }; }) {
  const { categoryName } = await params
  const category = decodeURIComponent(categoryName);

  try {
    const res = await fetch(`https://dummyjson.com/products/category/${category}`);

    if (!res.ok) {
      if (res.status === 404) {
        return notFound();
      }
      throw new Error('Failed to fetch products');
    }

    const data = await res.json();
    const products: Product[] = data.products;

    if (!products || products.length === 0) {
      return notFound();
    }

    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Products in &quot;{category}&quot;</h1>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <li key={product.id} className="border p-4 rounded shadow">
              <h2 className="font-semibold text-lg">{product.title}</h2>
              <p>${product.price}</p>
              <Link
                href={`/product/${product.id}`}
                className="text-blue-500 hover:underline"
              >
                View Details
              </Link>
            </li>
          ))}
        </ul>
      </main>
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    return notFound();
  }
}