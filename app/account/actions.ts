"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateProfile(fullName: string, phone: string) {
  const trimmedName = fullName.trim();
  const trimmedPhone = phone.trim();

  if (!trimmedName) {
    throw new Error("Full name cannot be empty.");
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.is_anonymous) {
    throw new Error("You must be logged in.");
  }

  const { error } = await supabase
    .from("profiles")
    .update({ full_name: trimmedName, phone: trimmedPhone })
    .eq("id", user.id);

  if (error) {
    console.error("Error updating profile:", error.message);
    throw new Error("Could not update profile.");
  }

  revalidatePath("/account");
}

export async function changePassword(
  currentPassword: string,
  newPassword: string
) {
  if (newPassword.length < 6) {
    throw new Error("New password must be at least 6 characters.");
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    throw new Error("You must be logged in.");
  }

  // Re-verify the current password before allowing the change.
  const { error: verifyError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: currentPassword,
  });

  if (verifyError) {
    throw new Error("Current password is incorrect.");
  }

  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (updateError) {
    console.error("Error updating password:", updateError.message);
    throw new Error("Could not update password.");
  }
}

export async function addAddress(
  label: string,
  addressText: string,
  isDefault: boolean
) {
  const trimmedLabel = label.trim();
  const trimmedAddress = addressText.trim();

  if (!trimmedLabel) {
    throw new Error("Please enter a label for this address.");
  }

  if (!trimmedAddress) {
    throw new Error("Please enter an address.");
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.is_anonymous) {
    throw new Error("You must be logged in.");
  }

  const { error } = await supabase.from("addresses").insert({
    user_id: user.id,
    label: trimmedLabel,
    address_text: trimmedAddress,
    is_default: isDefault,
  });

  if (error) {
    console.error("Error adding address:", error.message);
    throw new Error("Could not save address.");
  }

  revalidatePath("/account");
}

export async function updateAddress(
  addressId: string,
  label: string,
  addressText: string,
  isDefault: boolean
) {
  const trimmedLabel = label.trim();
  const trimmedAddress = addressText.trim();

  if (!trimmedLabel || !trimmedAddress) {
    throw new Error("Label and address are required.");
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from("addresses")
    .update({
      label: trimmedLabel,
      address_text: trimmedAddress,
      is_default: isDefault,
    })
    .eq("id", addressId);

  if (error) {
    console.error("Error updating address:", error.message);
    throw new Error("Could not update address.");
  }

  revalidatePath("/account");
}

export async function deleteAddress(addressId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("addresses")
    .delete()
    .eq("id", addressId);

  if (error) {
    console.error("Error deleting address:", error.message);
    throw new Error("Could not delete address.");
  }

  revalidatePath("/account");
}