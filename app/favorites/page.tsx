import Link from "next/link";
import { getFavoriteProducts } from "@/lib/favorites";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ProductCard from "@/components/storefront/ProductCard";

export default async function FavoritesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.is_anonymous) {
    redirect("/login");
  }

  const products = await getFavoriteProducts();

  return (
    <main className="shop-wallpaper min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="font-display font-bold text-2xl mb-2 text-foreground">
          My Favorites
        </h1>
        <p className="text-sm text-muted mb-6">
          {products.length === 0
            ? "Products you save will show up here."
            : `${products.length} saved product${
                products.length === 1 ? "" : "s"
              }.`}
        </p>

        {products.length === 0 ? (
          <div className="border border-dashed border-black/15 dark:border-white/15 rounded-2xl py-16 px-4 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-citrus/10 text-citrus flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
              </svg>
            </div>
            <p className="text-muted max-w-xs">
              You haven&apos;t favorited any products yet.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-block bg-foreground text-white text-sm font-medium px-6 py-3 rounded-lg hover:opacity-90 hover:shadow-lg hover:-translate-y-1 active:scale-[0.98] active:translate-y-0 transition duration-200 ease-out"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={{ ...product, isFavorite: true }}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}