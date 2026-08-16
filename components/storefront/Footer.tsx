import Link from "next/link";
import Image from "next/image";
import { getLogoUrl } from "@/lib/supabase/images";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-black/10 dark:border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col gap-8 sm:grid sm:grid-cols-5 sm:py-10">
        <div>
          <Link href="/" className="flex flex-col items-start gap-1">
            <Image
              src={getLogoUrl()}
              alt="Qediroglu"
              width={160}
              height={40}
              className="h-8 w-auto"
            />
            <span className="font-display font-semibold text-lg text-brand">
              Qediroglu
            </span>
          </Link>
          <p className="mt-2 text-sm text-black/60 dark:text-white/60">
            Fresh groceries, delivered.
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold">Shop</h3>
          <nav className="mt-3 flex flex-col text-sm text-black/70 dark:text-white/70">
            <Link href="/shop" className="py-2 hover:text-brand transition-colors">
              Shop
            </Link>
            <Link href="/categories" className="py-2 hover:text-brand transition-colors">
              Categories
            </Link>
            <Link href="/cart" className="py-2 hover:text-brand transition-colors">
              Cart
            </Link>
            <Link href="/favorites" className="py-2 hover:text-brand transition-colors">
              Favorites
            </Link>
          </nav>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold">Account</h3>
          <nav className="mt-3 flex flex-col text-sm text-black/70 dark:text-white/70">
            <Link href="/account" className="py-2 hover:text-brand transition-colors">
              My Account
            </Link>
            <Link href="/orders" className="py-2 hover:text-brand transition-colors">
              Orders
            </Link>
            <Link href="/login" className="py-2 hover:text-brand transition-colors">
              Log in
            </Link>
            <Link href="/signup" className="py-2 hover:text-brand transition-colors">
              Sign up
            </Link>
          </nav>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold">About</h3>
          <nav className="mt-3 flex flex-col text-sm text-black/70 dark:text-white/70">
            <Link href="/#company" className="py-2 hover:text-brand transition-colors">
              Company
            </Link>
            <Link href="/#distribution" className="py-2 hover:text-brand transition-colors">
              Distribution
            </Link>
            <Link href="/#imports" className="py-2 hover:text-brand transition-colors">
              Imports
            </Link>
          </nav>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold">Contact</h3>
          <nav className="mt-3 flex flex-col text-sm text-black/70 dark:text-white/70">
            <a href="mailto:hello@qediroglu.com" className="py-2 hover:text-brand transition-colors">
              hello@qediroglu.com
            </a>
          </nav>
        </div>
      </div>

      <div className="border-t border-black/10 dark:border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4 text-xs font-mono text-black/50 dark:text-white/50 text-center">
          © {year} Qediroglu Supermarket. All rights reserved.
        </div>
      </div>
    </footer>
  );
}