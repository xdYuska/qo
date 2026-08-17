import Link from "next/link";
import { getAllCategories } from "@/lib/categories";
import CategoryIcon from "@/components/storefront/CategoryIcon";

const TILE_COLORS = ["bg-brand/10", "bg-citrus/15", "bg-leaf/15", "bg-sun/25"];

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <main className="shop-wallpaper min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="font-display font-bold text-2xl mb-6">Categories</h1>

        {categories.length === 0 ? (
          <p className="text-muted">No categories yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 justify-items-center">
            {categories.map((category, i) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="flex flex-col items-center gap-3 w-full"
              >
                <div
  className={`w-full aspect-square max-w-48 rounded-2xl flex items-center justify-center transition hover:shadow-lg hover:-translate-y-1 active:scale-[0.98] active:translate-y-0 duration-200 ease-out ${
    TILE_COLORS[i % TILE_COLORS.length]
  }`}
>
  <CategoryIcon slug={category.slug} className="w-20 h-20" />
</div>
                <span className="text-base font-medium text-center text-foreground">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}