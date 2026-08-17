"use server";

import { addToCart } from "@/lib/cart";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function quickAddToCart(productId: string, quantity: number = 1) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const { error } = await supabase.auth.signInAnonymously();

    if (error) {
      return { success: false, message: "Could not create guest session." };
    }
  }

  try {
    await addToCart(productId, quantity);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not add to cart.";
    return { success: false, message };
  }

  revalidatePath("/cart");
  revalidatePath("/", "layout");

  return { success: true };
}