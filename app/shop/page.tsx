import { getAllProducts } from "@/lib/products";
import { getAllCategories } from "@/lib/categories";
import ProductCard from "@/components/storefront/ProductCard";
import SearchFilterForm from "@/components/storefront/SearchFilterForm";
import Link from "next/link";

export default async function ShopPage({
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
    <main className="shop-wallpaper min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between gap-4 mb-6">
  <h1 className="text-2xl font-bold">All Products</h1>
  <Link
    href="/categories"
    className="shrink-0 text-sm font-medium text-brand border border-[#08a2c1] rounded-lg px-3 py-2 hover:bg-[#08a2c1]/10 transition">
    Browse Categories
  </Link>
</div>

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
      </div>
    </main>
  );
}