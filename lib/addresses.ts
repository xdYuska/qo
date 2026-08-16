import { createClient } from "@/lib/supabase/server";

export async function getAddressesForCurrentUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.is_anonymous) {
    return [];
  }

  const { data, error } = await supabase
    .from("addresses")
    .select("id, label, address_text, is_default")
    .eq("user_id", user.id)
    .order("is_default", { ascending: false })
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching addresses:", error.message);
    return [];
  }

  return data;
}