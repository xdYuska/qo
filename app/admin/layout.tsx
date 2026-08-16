import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.is_anonymous) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-6">
          <Link href="/admin" className="font-semibold text-brand">
            Admin
          </Link>
          <Link href="/admin/orders" className="text-sm hover:underline">
            Orders
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">{children}</div>
    </div>
  );
}