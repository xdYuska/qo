import { createClient } from "@/lib/supabase/server";
import { getFavoriteProductIds } from "@/lib/favorites";

export async function getCategoryBySlug(slug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching category:", error.message);
    return null;
  }

  return data;
}

export async function getProductsByCategory(categoryId: string) {
  const supabase = await createClient();

  // Find this category's direct subcategories (if any)
  const { data: subcategories, error: subError } = await supabase
    .from("categories")
    .select("id")
    .eq("parent_id", categoryId);

  if (subError) {
    console.error("Error fetching subcategories:", subError.message);
    return [];
  }

  // Combine this category's own ID with all its subcategory IDs
  const categoryIds = [categoryId, ...subcategories.map((c) => c.id)];

  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("id, name, slug, price, image_path, unit_label")
    .in("category_id", categoryIds)
    .order("created_at", { ascending: false });

  if (productsError) {
    console.error("Error fetching products:", productsError.message);
    return [];
  }

const favoriteIds = await getFavoriteProductIds();

  return products.map((product) => ({
    ...product,
    isFavorite: favoriteIds.has(product.id),
  }));
}

export async function getAllCategories() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug")
    .is("parent_id", null)
    .order("name");

  if (error) {
    console.error("Error fetching categories:", error.message);
    return [];
  }

  return data;
}