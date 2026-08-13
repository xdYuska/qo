import { createClient } from "@/lib/supabase/server";

export async function getAllProducts() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("id, name, slug, price, image_path")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error.message);
    return [];
  }

  return data;
}

export async function getProductBySlug(slug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("id, name, slug, description, price, stock_quantity, image_path")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching product:", error.message);
    return null;
  }

  return data;
}