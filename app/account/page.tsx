import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { logout } from "@/app/logout/actions";

export default async function AccountPage() {
  const supabase = await createClient();

const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.is_anonymous) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, phone, role")
    .eq("id", user.id)
    .single();

  return (
    <main className="max-w-md mx-auto px-4 py-12">
      <h1 className="text-2xl font-semibold mb-6">My Account</h1>

      <div className="space-y-2 text-sm text-gray-700">
        <p>
          <span className="font-medium">Email:</span> {user.email}
        </p>
        <p>
          <span className="font-medium">Name:</span>{" "}
          {profile?.full_name ?? "Not set"}
        </p>
        <p>
          <span className="font-medium">Role:</span> {profile?.role}
        </p>
      </div>

      <form action={logout} className="mt-6">
        <button
          type="submit"
          className="text-sm text-gray-600 hover:text-gray-900 underline"
        >
          Log out
        </button>
      </form>
    </main>
  );
}