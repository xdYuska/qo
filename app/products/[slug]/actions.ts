"use server";

import { addToCart } from "@/lib/cart";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addToCartAction(formData: FormData) {
  const productId = formData.get("productId") as string;
  const slug = formData.get("slug") as string;
  const quantity = Number(formData.get("quantity")) || 1;

  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Create a guest session only when the visitor actually needs a cart.
    if (!user) {
      const { error } = await supabase.auth.signInAnonymously();

      if (error) {
        throw new Error("Could not create guest session.");
      }
    }

    await addToCart(productId, quantity);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not add to cart.";

    redirect(`/products/${slug}?error=${encodeURIComponent(message)}`);
  }

  revalidatePath("/cart");
  redirect(`/products/${slug}?success=true`);
}

export async function toggleFavorite(productId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.is_anonymous) {
    throw new Error("Please log in to save favorites.");
  }

  const { data: existing } = await supabase
    .from("favorites")
    .select("id")
    .eq("user_id", user.id)
    .eq("product_id", productId)
    .single();

  if (existing) {
    await supabase.from("favorites").delete().eq("id", existing.id);
  } else {
    await supabase.from("favorites").insert({
      user_id: user.id,
      product_id: productId,
    });
  }

  revalidatePath("/favorites");
}