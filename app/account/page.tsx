import { createClient } from "@/lib/supabase/server";
import { getAddressesForCurrentUser } from "@/lib/addresses";
import { redirect } from "next/navigation";
import Link from "next/link";
import { logout } from "@/app/logout/actions";
import ProfileForm from "./ProfileForm";
import PasswordForm from "./PasswordForm";
import AddressManager from "./AddressManager";

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

  const addresses = await getAddressesForCurrentUser();

  return (
    <main className="max-w-2xl mx-auto px-4 py-12 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-brand mb-1">
          My Account
        </h1>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>

      <section>
        <h2 className="text-lg font-semibold mb-3">Profile</h2>
        <ProfileForm
          initialFullName={profile?.full_name ?? ""}
          initialPhone={profile?.phone ?? ""}
        />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Change Password</h2>
        <PasswordForm />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Saved Addresses</h2>
        <AddressManager initialAddresses={addresses} />
      </section>

      <div className="border-t pt-6 space-y-2">
        <Link
          href="/account/orders"
          className="block text-sm text-brand hover:underline"
        >
          View Order History
        </Link>

        <form action={logout}>
          <button
            type="submit"
            className="text-sm text-gray-600 hover:text-gray-900 underline"
          >
            Log out
          </button>
        </form>
      </div>
    </main>
  );
}