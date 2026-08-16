import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/logout/actions";
import { getCartItemCount } from "@/lib/cart";

export default async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isRealUser = user && !user.is_anonymous;
  const cartCount = await getCartItemCount();

  return (
    <header className="border-b">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold text-[#08a2c1]">
          Qediroglu Supermarket
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link href="/" className="hover:underline">
            Products
          </Link>

          <Link href="/cart" className="hover:underline relative">
            Cart
            {cartCount > 0 && (
              <span className="ml-1 inline-flex items-center justify-center bg-[#08a2c1] text-white text-xs rounded-full w-5 h-5">
                {cartCount}
              </span>
            )}
          </Link>

          {isRealUser ? (
            <>     
              <Link href="/favorites" className="hover:underline">
                Favorites
              </Link>

              <Link href="/account" className="hover:underline">
                My Account
              </Link>

              <form action={logout}>
                <button type="submit" className="hover:underline">
                  Log out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:underline">
                Log in
              </Link>
              <Link href="/signup" className="hover:underline">
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}   