"use server";

import { createClient } from "@/lib/supabase/server";
import { validateCartStock } from "@/app/cart/actions";
import { revalidatePath } from "next/cache";

type PlaceOrderResult = {
  success: true;
  orderId: string;
};

export async function placeOrder(
  fullName: string,
  phone: string,
  deliveryAddress: string
): Promise<PlaceOrderResult> {
  const trimmedFullName = fullName.trim();
  const trimmedPhone = phone.trim();
  const trimmedAddress = deliveryAddress.trim();

  if (!trimmedFullName) {
    throw new Error("Please enter your full name.");
  }

  if (!trimmedPhone) {
    throw new Error("Please enter your phone number.");
  }

  if (!trimmedAddress) {
    throw new Error("Please enter your delivery address.");
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.is_anonymous) {
    throw new Error("You must be logged in to place an order.");
  }

  // This is a user-friendly pre-check.
  // create_order() performs its own authoritative stock check
  // inside the database transaction.
  await validateCartStock();

  const { data: orderId, error } = await supabase.rpc("create_order", {
  delivery_address: trimmedAddress,
  full_name: trimmedFullName,
  payment_method: "cash_on_delivery",
  phone: trimmedPhone,
});

  if (error) {
    console.error("CREATE ORDER FAILED:", error);

    throw new Error(
      error.message || "Failed to place your order."
    );
  }

  if (!orderId) {
    throw new Error("Order was created but no order ID was returned.");
  }

  revalidatePath("/cart");
  revalidatePath("/checkout");

  return {
    success: true,
    orderId: String(orderId),
  };
}