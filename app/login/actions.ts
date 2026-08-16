"use server";

import { createClient } from "@/lib/supabase/server";
import { createServiceClient } from "@/lib/supabase/service";
import { mergeCartItemsIntoCurrentCart } from "@/lib/cart";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Capture the anonymous session's cart BEFORE switching sessions —
  // once we sign in, this old session is gone and unreadable.
  const {
    data: { user: previousUser },
  } = await supabase.auth.getUser();

  const wasAnonymous = previousUser?.is_anonymous === true;
  let anonCartId: string | null = null;
  let anonItems: { product_id: string; quantity: number }[] = [];

  if (wasAnonymous && previousUser) {
    const { data: anonCart } = await supabase
      .from("carts")
      .select("id")
      .eq("user_id", previousUser.id)
      .single();

    if (anonCart) {
      anonCartId = anonCart.id;
      const { data: items } = await supabase
        .from("cart_items")
        .select("product_id, quantity")
        .eq("cart_id", anonCart.id);

      anonItems = items ?? [];
    }
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  if (anonItems.length > 0) {
    await mergeCartItemsIntoCurrentCart(anonItems);
  }

  // Clean up the old anonymous cart and account, using elevated permissions
  // since our current (real) session has no rights to touch them anymore.
  if (wasAnonymous && previousUser) {
    const serviceClient = createServiceClient();

    if (anonCartId) {
      const { error: cartDeleteError } = await serviceClient
        .from("carts")
        .delete()
        .eq("id", anonCartId);

      if (cartDeleteError) {
        console.error("Error deleting anon cart:", cartDeleteError.message);
      }
    }

    const { error: deleteUserError } =
      await serviceClient.auth.admin.deleteUser(previousUser.id);

    if (deleteUserError) {
      console.error("Error deleting anon user:", deleteUserError.message);
    }
  }

  redirect("/account");
}