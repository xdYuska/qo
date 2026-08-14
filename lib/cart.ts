import { createClient } from "@/lib/supabase/server";

export async function getOrCreateCart() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("No user session found.");
  }

  const { data: existingCart } = await supabase
    .from("carts")
    .select("id")
    .eq("user_id", user.id)
    .single();

  if (existingCart) {
    return existingCart.id;
  }

  const { data: newCart, error } = await supabase
    .from("carts")
    .insert({ user_id: user.id })
    .select("id")
    .single();

  if (error) {
    console.error("Error creating cart:", error.message);
    throw new Error("Could not create cart.");
  }

  return newCart.id;
}

export async function addToCart(productId: string, quantity: number = 1) {
  const supabase = await createClient();
  const cartId = await getOrCreateCart();

  const { data: product } = await supabase
    .from("products")
    .select("stock_quantity")
    .eq("id", productId)
    .single();

  if (!product) {
    throw new Error("Product not found.");
  }

  const { data: existingItem } = await supabase
    .from("cart_items")
    .select("id, quantity")
    .eq("cart_id", cartId)
    .eq("product_id", productId)
    .single();

  const currentQuantityInCart = existingItem?.quantity ?? 0;
  const requestedTotal = currentQuantityInCart + quantity;

  if (requestedTotal > product.stock_quantity) {
    throw new Error(
      `Only ${product.stock_quantity} in stock (you already have ${currentQuantityInCart} in your cart).`
    );
  }

  if (existingItem) {
    const { error } = await supabase
      .from("cart_items")
      .update({ quantity: requestedTotal })
      .eq("id", existingItem.id);

    if (error) {
      console.error("Error updating cart item:", error.message);
      throw new Error("Could not update cart.");
    }
  } else {
    const { error } = await supabase
      .from("cart_items")
      .insert({ cart_id: cartId, product_id: productId, quantity });

    if (error) {
      console.error("Error adding cart item:", error.message);
      throw new Error("Could not add to cart.");
    }
  }
}

export async function mergeCartItemsIntoCurrentCart(
  items: { product_id: string; quantity: number }[]
) {
  const supabase = await createClient();
  const cartId = await getOrCreateCart();

  for (const item of items) {
    const { data: existing } = await supabase
      .from("cart_items")
      .select("id, quantity")
      .eq("cart_id", cartId)
      .eq("product_id", item.product_id)
      .single();

    if (existing) {
      await supabase
        .from("cart_items")
        .update({ quantity: existing.quantity + item.quantity })
        .eq("id", existing.id);
    } else {
      await supabase
        .from("cart_items")
        .insert({
          cart_id: cartId,
          product_id: item.product_id,
          quantity: item.quantity,
        });
    }
  }
}