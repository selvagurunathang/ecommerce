export default async function ProductDetailsPage({ params }: { params: { productId: string }; }) {

  const { productId } = await params;
  const res = await fetch(`https://dummyjson.com/products/${productId}`);
  const product = await res.json();

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <p className="mt-2 text-gray-700">{product.description}</p>
      <p className="mt-2 font-semibold">Price: ${product.price}</p>
      <img src={product.thumbnail} alt={product.title} className="mt-4 w-64 rounded" />
    </main>
  );
}
