import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-2 gap-8 sm:grid-cols-4">
        <div className="col-span-2 sm:col-span-1">
          <Link href="/" className="text-lg font-semibold text-[#08a2c1]">
            Qediroglu
          </Link>
          <p className="mt-2 text-sm text-black/60 dark:text-white/60">
            Fresh groceries, delivered.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Shop</h3>
          <nav className="mt-3 flex flex-col gap-2 text-sm text-black/70 dark:text-white/70">
            <Link href="/" className="hover:underline">
              Products
            </Link>
            <Link href="/categories" className="hover:underline">
              Categories
            </Link>
            <Link href="/cart" className="hover:underline">
              Cart
            </Link>
            <Link href="/favorites" className="hover:underline">
              Favorites
            </Link>
          </nav>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Account</h3>
          <nav className="mt-3 flex flex-col gap-2 text-sm text-black/70 dark:text-white/70">
            <Link href="/account" className="hover:underline">
              My Account
            </Link>
            <Link href="/orders" className="hover:underline">
              Orders
            </Link>
            <Link href="/login" className="hover:underline">
              Log in
            </Link>
            <Link href="/signup" className="hover:underline">
              Sign up
            </Link>
          </nav>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Contact</h3>
          <nav className="mt-3 flex flex-col gap-2 text-sm text-black/70 dark:text-white/70">
            <a href="mailto:hello@qediroglu.com" className="hover:underline">
              ofis@qediroglu.az
            </a>
          </nav>
        </div>
      </div>

      <div className="border-t">
        <div className="max-w-6xl mx-auto px-4 py-4 text-xs text-black/50 dark:text-white/50">
          © {year} Qediroglu. All rights reserved.
        </div>
      </div>
    </footer>
  );
}