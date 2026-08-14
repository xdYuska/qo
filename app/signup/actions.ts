"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullName = formData.get("fullName") as string;

  const {
    data: { user },
    error,
  } = await supabase.auth.updateUser({
    email,
    password,
    data: { full_name: fullName },
  });

  if (error) {
    redirect(`/signup?error=${encodeURIComponent(error.message)}`);
  }

  if (user) {
    await supabase
      .from("profiles")
      .update({ full_name: fullName })
      .eq("id", user.id);
  }

  redirect("/account");
}