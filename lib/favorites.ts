import { createClient } from "@/lib/supabase/server";

export async function getFavoriteProductIds() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.is_anonymous) {
    return new Set<string>();
  }

  const { data, error } = await supabase
    .from("favorites")
    .select("product_id")
    .eq("user_id", user.id);

  if (error) {
    console.error("Error fetching favorites:", error.message);
    return new Set<string>();
  }

  return new Set(data.map((f) => f.product_id));
}

export async function getFavoriteProducts() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.is_anonymous) {
    return [];
  }

  const { data, error } = await supabase
    .from("favorites")
    .select("product_id, products (id, name, slug, price, image_path, unit_label)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching favorite products:", error.message);
    return [];
  }

  return data
    .map((f) => (Array.isArray(f.products) ? f.products[0] : f.products))
    .filter((p) => p !== null);
}