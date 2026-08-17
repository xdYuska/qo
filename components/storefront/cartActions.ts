"use server";

import { addToCart } from "@/lib/cart";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function quickAddToCart(productId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Create a guest session only when the visitor actually needs a cart.
  if (!user) {
    const { error } = await supabase.auth.signInAnonymously();

    if (error) {
      return { success: false, message: "Could not create guest session." };
    }
  }

  try {
    await addToCart(productId, 1);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not add to cart.";
    return { success: false, message };
  }

  revalidatePath("/cart");
  revalidatePath("/", "layout");

  return { success: true };
}