import { createClient } from "@/lib/supabase/server";
import { getFavoriteProductIds } from "@/lib/favorites";

export async function getAllProducts(filters?: {
  search?: string;
  category?: string;
}) {
  const supabase = await createClient();

  let query = supabase
    .from("products")
    .select("id, name, slug, price, image_path, unit_label")
    .order("created_at", { ascending: false });

  if (filters?.search) {
    query = query.ilike("name", `%${filters.search}%`);
  }

  if (filters?.category) {
    const { data: category } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", filters.category)
      .single();

    if (category) {
      const { data: subcategories } = await supabase
        .from("categories")
        .select("id")
        .eq("parent_id", category.id);

      const categoryIds = [category.id, ...(subcategories ?? []).map((c) => c.id)];
      query = query.in("category_id", categoryIds);
    }
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching products:", error.message);
    return [];
  }

  const favoriteIds = await getFavoriteProductIds();

  return data.map((product) => ({
    ...product,
    isFavorite: favoriteIds.has(product.id),
  }));
}

export async function getProductBySlug(slug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("id, name, slug, description, price, stock_quantity, image_path, unit_label")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching product:", error.message);
    return null;
  }

  return data;
}