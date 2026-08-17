"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { logout } from "@/app/logout/actions";
import LanguageSelector from "./LanguageSelector";
import CartPreview from "./CartPreview";

export default function HeaderNav({
  isRealUser,
  cartCount,
  cartItems,
}: {
  isRealUser: boolean;
  cartCount: number;
  cartItems: {
    id: string;
    name: string;
    price: number;
    image_path: string | null;
    quantity: number;
  }[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Needed so createPortal only runs client-side (document isn't
  // available during SSR).
  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock background scroll while the panel is open.
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // If the viewport grows into the desktop layout while the panel is open,
  // close it so it doesn't linger behind the (now visible) desktop nav.
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) setIsOpen(false);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <>
      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-4 text-sm">
  <NavLinks
    isRealUser={isRealUser}
    cartCount={cartCount}
    cartItems={cartItems}
    linkClass="hover:underline"
    onNavigate={() => {}}
    showCartPreview
  />
  <LanguageSelector />
</nav>

      {/* Mobile hamburger button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
        aria-expanded={isOpen}
        aria-controls="mobile-nav-panel"
        className="relative md:hidden p-2 -mr-2 text-brand"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
        {cartCount > 0 && (
          <span className="absolute top-1 right-1 inline-flex items-center justify-center bg-citrus text-white text-[10px] leading-none rounded-full w-4 h-4">
            {cartCount}
          </span>
        )}
      </button>

      {/* Backdrop + side panel are portaled to document.body so they
         stay truly fixed to the viewport, regardless of the header's
         own transform/sticky positioning (see HeaderVisibility). */}
      {mounted &&
        createPortal(
          <>
            {/* Backdrop */}
            {isOpen && (
              <div
                className="fixed inset-0 bg-black/40 dark:bg-black/60 z-40 md:hidden"
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
              />
            )}

            {/* Side panel */}
            <div
              className="fixed inset-0 overflow-hidden pointer-events-none z-50 md:hidden"
              aria-hidden={!isOpen}
            >
              <div
                id="mobile-nav-panel"
                role="dialog"
                aria-modal="true"
                aria-label="Menu"
                className={`absolute inset-y-0 right-0 w-72 max-w-[80%] bg-[var(--background)] text-[var(--foreground)] border-l border-black/10 dark:border-white/10 shadow-lg transform transition-transform duration-300 ease-in-out pointer-events-auto ${
                  isOpen ? "translate-x-0" : "translate-x-full"
                }`}
              >
                <div className="flex items-center justify-between px-4 py-4 border-b border-black/10 dark:border-white/10">
                  <span className="font-display font-semibold text-brand">
                    Menu
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    aria-label="Close menu"
                    className="p-2 -mr-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-6 h-6"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>

                <div className="px-4 py-3 border-b border-black/10 dark:border-white/10">
                  <LanguageSelector className="w-full" />
                </div>

                <nav className="flex flex-col p-4 text-base">
                  <NavLinks
                    isRealUser={isRealUser}
                    cartCount={cartCount}
                    linkClass="py-3 border-b border-black/10 dark:border-white/10"
                    onNavigate={() => setIsOpen(false)}
                  />
                </nav>
              </div>
            </div>
          </>,
          document.body
        )}
    </>
  );
}

function NavLinks({
  isRealUser,
  cartCount,
  cartItems = [],
  linkClass,
  onNavigate,
  showCartPreview = false,
}: {
  isRealUser: boolean;
  cartCount: number;
  cartItems?: {
    id: string;
    name: string;
    price: number;
    image_path: string | null;
    quantity: number;
  }[];
  linkClass: string;
  onNavigate: () => void;
  showCartPreview?: boolean;
}) {
  return (
    <>
      <Link href="/shop" className={linkClass} onClick={onNavigate}>
        Shop
      </Link>

      {showCartPreview ? (
        <CartPreview
          items={cartItems}
          cartCount={cartCount}
          linkClass={`${linkClass} relative`}
          onNavigate={onNavigate}
        />
      ) : (
        <Link href="/cart" className={`${linkClass} relative`} onClick={onNavigate}>
          Cart
          {cartCount > 0 && (
            <span className="ml-1 inline-flex items-center justify-center bg-citrus text-white text-xs rounded-full w-5 h-5">
              {cartCount}
            </span>
          )}
        </Link>
      )}

      {/* rest of the function (Favorites, Account, Log out / Log in, Sign up) stays exactly the same */}

      {isRealUser ? (
        <>
          <Link href="/favorites" className={linkClass} onClick={onNavigate}>
            Favorites
          </Link>

          <Link href="/account" className={linkClass} onClick={onNavigate}>
            My Account
          </Link>

          <form action={logout}>
            <button type="submit" className={`${linkClass} w-full text-left`}>
              Log out
            </button>
          </form>
        </>
      ) : (
        <>
          <Link href="/login" className={linkClass} onClick={onNavigate}>
            Log in
          </Link>
          <Link href="/signup" className={linkClass} onClick={onNavigate}>
            Sign up
          </Link>
        </>
      )}
    </>
  );
}