import { createClient } from "@/lib/supabase/server";

export async function getOrderById(orderId: string) {
  const supabase = await createClient();

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select(
      "id, status, payment_method, payment_status, full_name, phone, email, delivery_address, total, created_at"
    )
    .eq("id", orderId)
    .single();

  if (orderError || !order) {
    return null;
  }

  const { data: items, error: itemsError } = await supabase
    .from("order_items")
    .select("id, product_name, unit_price, quantity")
    .eq("order_id", orderId);

  if (itemsError) {
    console.error("Error fetching order items:", itemsError.message);
    return null;
  }

  return { ...order, items: items ?? [] };
}