"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

const VALID_STATUSES = ["pending", "confirmed", "completed", "cancelled"];

export async function updateOrderStatus(orderId: string, status: string) {
  if (!VALID_STATUSES.includes(status)) {
    throw new Error("Invalid status.");
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in.");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    throw new Error("You are not authorized to update orders.");
  }

  const { data, error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", orderId)
    .select("id");

  if (error) {
    console.error("Error updating order status:", error.message);
    throw new Error("Could not update order status.");
  }

  if (!data || data.length === 0) {
    throw new Error("Order not found or you don't have permission to update it.");
  }

  revalidatePath(`/admin/orders/${orderId}`);
  revalidatePath("/admin/orders");
}