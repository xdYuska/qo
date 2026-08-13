import { getAllProducts } from "@/lib/products";
import { getAllCategories } from "@/lib/categories";
import ProductCard from "@/components/storefront/ProductCard";
import SearchFilterForm from "@/components/storefront/SearchFilterForm";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string }>;
}) {
  const params = await searchParams;
  const [products, categories] = await Promise.all([
    getAllProducts(params),
    getAllCategories(),
  ]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">All Products</h1>

      <SearchFilterForm categories={categories} />

      {products.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}