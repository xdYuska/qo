"use server";

import { createClient } from "@/lib/supabase/server";
import { validateCartStock } from "@/app/cart/actions";
import { revalidatePath } from "next/cache";

type PlaceOrderResult = {
  success: true;
  orderId: string;
};

function isValidAzerbaijaniPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-()]/g, "");
  const pattern = /^(\+?994|0)(10|50|51|55|60|70|77|99)\d{7}$/;
  return pattern.test(cleaned);
}

function isValidEmail(email: string): boolean {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

export async function placeOrder(
  fullName: string,
  phone: string,
  email: string,
  deliveryAddress: string
): Promise<PlaceOrderResult> {
  const trimmedFullName = fullName.trim();
  const trimmedPhone = phone.trim();
  const trimmedEmail = email.trim();
  const trimmedAddress = deliveryAddress.trim();

  if (!trimmedFullName) {
    throw new Error("Please enter your full name.");
  }

  if (trimmedFullName.length < 2 || trimmedFullName.length > 100) {
    throw new Error("Please enter a valid name.");
  }

  if (!trimmedPhone) {
    throw new Error("Please enter your phone number.");
  }

  if (!isValidAzerbaijaniPhone(trimmedPhone)) {
    throw new Error(
      "Please enter a valid Azerbaijani phone number (e.g. 050 123 45 67)."
    );
  }

  if (!trimmedEmail) {
    throw new Error("Please enter your email.");
  }

  if (!isValidEmail(trimmedEmail)) {
    throw new Error("Please enter a valid email address.");
  }

  if (!trimmedAddress) {
    throw new Error("Please enter your delivery address.");
  }

  if (trimmedAddress.length < 5 || trimmedAddress.length > 300) {
    throw new Error("Please enter a valid delivery address.");
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Something went wrong. Please refresh and try again.");
  }

  await validateCartStock();

  const { data: orderId, error } = await supabase.rpc("create_order", {
    p_full_name: trimmedFullName,
    p_phone: trimmedPhone,
    p_email: trimmedEmail,
    p_delivery_address: trimmedAddress,
    p_payment_method: "cash_on_delivery",
  });

  if (error) {
    console.error("CREATE ORDER FAILED:", error);
    throw new Error(error.message || "Failed to place your order.");
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