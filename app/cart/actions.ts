"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateCartItemQuantity(
  cartItemId: string,
  quantity: number
) {
  const supabase = await createClient();

  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new Error("Invalid quantity.");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in.");
  }

  const { data: cart, error: cartError } = await supabase
    .from("carts")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (cartError || !cart) {
    throw new Error("Cart not found.");
  }

  const { data: item, error: itemError } = await supabase
    .from("cart_items")
    .select("id, product_id")
    .eq("id", cartItemId)
    .eq("cart_id", cart.id)
    .single();

  if (itemError || !item) {
    throw new Error("Cart item not found.");
  }

  const { data: product, error: productError } = await supabase
    .from("products")
    .select("stock_quantity")
    .eq("id", item.product_id)
    .single();

  if (productError || !product) {
    throw new Error("Product not found.");
  }

  if (quantity > product.stock_quantity) {
    throw new Error(
      `Only ${product.stock_quantity} available in stock.`
    );
  }

  const { error: updateError } = await supabase
    .from("cart_items")
    .update({ quantity })
    .eq("id", cartItemId)
    .eq("cart_id", cart.id);

  if (updateError) {
    throw new Error("Could not update cart.");
  }

  revalidatePath("/cart");
  revalidatePath("/", "layout");
}

export async function removeCartItem(cartItemId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in.");
  }

  const { data: cart, error: cartError } = await supabase
    .from("carts")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (cartError || !cart) {
    throw new Error("Cart not found.");
  }

  const { error: deleteError } = await supabase
    .from("cart_items")
    .delete()
    .eq("id", cartItemId)
    .eq("cart_id", cart.id);

  if (deleteError) {
    throw new Error("Could not remove item from cart.");
  }

  revalidatePath("/cart");
}

export async function validateCartStock() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in.");
  }

  const { data: cart, error: cartError } = await supabase
    .from("carts")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (cartError || !cart) {
    throw new Error("Cart not found.");
  }

  const { data: cartItems, error: itemsError } = await supabase
    .from("cart_items")
    .select(`
      id,
      quantity,
      products (
        id,
        name,
        stock_quantity
      )
    `)
    .eq("cart_id", cart.id);

  if (itemsError) {
    throw new Error("Could not check cart stock.");
  }

  for (const item of cartItems ?? []) {
    const product = Array.isArray(item.products)
  ? item.products[0]
  : item.products;

    if (!product) {
      throw new Error("A product in your cart is no longer available.");
    }

    if (item.quantity > product.stock_quantity) {
      throw new Error(
        `Only ${product.stock_quantity} of ${product.name} are currently available.`
      );
    }
  }

  return true;
}