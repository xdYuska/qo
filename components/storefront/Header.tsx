import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getCartItemCount } from "@/lib/cart";
import HeaderNav from "./HeaderNav";

export default async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isRealUser = Boolean(user && !user.is_anonymous);
  const cartCount = await getCartItemCount();

  return (
    <header className="border-b">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold text-[#08a2c1]">
          Qediroglu Supermarket
        </Link>

        <HeaderNav isRealUser={isRealUser} cartCount={cartCount} />
      </div>
    </header>
  );
}