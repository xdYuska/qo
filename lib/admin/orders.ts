import { createClient } from "@/lib/supabase/server";

export async function getAllOrders() {
  const supabase = await createClient();

  const { data: orders, error } = await supabase
    .from("orders")
    .select(
      "id, status, payment_method, payment_status, full_name, phone, total, created_at"
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching all orders:", error.message);
    return [];
  }

  return orders;
}

export async function getOrderByIdAdmin(orderId: string) {
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