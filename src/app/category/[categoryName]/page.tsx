import { notFound } from 'next/navigation';
import ProductGrid from "@/components/ProductGrid";
import { Product } from "@/types/types";
import { fetchProducts } from "@/lib/api";

export default async function CategoryPage({ params }: { params: { categoryName: string } }) {
  const category = decodeURIComponent(params.categoryName);

  try {
    const res = await fetchProducts(category);
    const products: Product[] = res;

    if (!products || products.length === 0) {
      return notFound();
    }

    return (
      <main className="p-6">
        {products.length > 0 && <ProductGrid products={products} />}
      </main>
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    return notFound();
  }
}