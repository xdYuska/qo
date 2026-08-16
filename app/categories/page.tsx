import Link from "next/link";
import { getAllCategories } from "@/lib/categories";
import CategoryIcon from "@/components/storefront/CategoryIcon";

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <main className="shop-wallpaper min-h-screen">
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Categories</h1>

      {categories.length === 0 ? (
        <p className="text-gray-500">No categories yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="flex flex-row items-center gap-3 min-h-20 p-4 border rounded-xl bg-background hover:bg-background hover:shadow-lg hover:-translate-y-1 active:scale-[0.98] active:translate-y-0 transition duration-200 ease-out"
            >
              <CategoryIcon slug={category.slug} className="w-8 h-8 shrink-0 text-brand" />
              <span className="text-xl font-medium text-black">
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