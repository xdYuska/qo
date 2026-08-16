import Link from "next/link";
import { getAllCategories } from "@/lib/categories";

export default async function CategoriesPage() {
  const categories = await getAllCategories();

  return (
    <main className="shop-wallpaper min-h-screen">
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Categories</h1>

      {categories.length === 0 ? (
        <p className="text-gray-500">No categories yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="flex items-center justify-center text-center min-h-28 p-4 border rounded-lg bg-[#08a2c1]/5 hover:bg-[#08a2c1]/10 hover:shadow-md active:scale-[0.98] transition"
            >
              <span className="text-sm font-medium text-brand">
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