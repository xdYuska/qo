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
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold text-[#08a2c1] mb-6">
        My Favorites
      </h1>

      {products.length === 0 ? (
        <p className="text-gray-500">
          You haven&apos;t favorited any products yet.
        </p>
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
    </main>
  );
}