import { getAllProducts } from "@/lib/products";
import { getAllCategories } from "@/lib/categories";
import ProductCard from "@/components/storefront/ProductCard";
import SearchFilterForm from "@/components/storefront/SearchFilterForm";
import CategoryRail from "@/components/storefront/CategoryRail";
import ShopBanner from "@/components/storefront/ShopBanner";
import { getCategoryBySlug } from "@/lib/categories";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string }>;
}) {
  const params = await searchParams;
const [products, categories, activeCategory] = await Promise.all([
  getAllProducts(params),
  getAllCategories(),
  params.category ? getCategoryBySlug(params.category) : Promise.resolve(null),
]);

  return (
    <main className="shop-wallpaper min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <ShopBanner />

        <CategoryRail categories={categories} activeSlug={params.category} />

        <h1 className="font-display font-bold text-2xl mb-6 text-foreground">
  {activeCategory ? activeCategory.name : "All Products"}
</h1>

        <SearchFilterForm categories={categories} />

        {products.length === 0 ? (
          <p className="text-muted">No products found.</p>
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