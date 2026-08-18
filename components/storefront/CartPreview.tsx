"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProductImageUrl } from "@/lib/supabase/images";
import { removeCartItem } from "@/app/cart/actions";

type CartPreviewItem = {
  id: string;
  name: string;
  price: number;
  image_path: string | null;
  quantity: number;
};

export default function CartPreview({
  items: initialItems,
  linkClass,
  onNavigate,
}: {
  items: CartPreviewItem[];
  cartCount: number;
  linkClass: string;
  onNavigate: () => void;
}) {
  const [items, setItems] = useState(initialItems);
  const [removingIds, setRemovingIds] = useState<Set<string>>(new Set());

  // Keep in sync whenever the server gives us a fresh list (e.g. after a
  // real navigation), without clobbering an in-flight local removal.
  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  async function handleRemove(itemId: string) {
    const previousItems = items;

    setItems((current) => current.filter((item) => item.id !== itemId));
    setRemovingIds((current) => new Set(current).add(itemId));

    try {
      await removeCartItem(itemId);
    } catch (error) {
      console.error("CART PREVIEW REMOVE FAILED:", error);
      setItems(previousItems);
    } finally {
      setRemovingIds((current) => {
        const next = new Set(current);
        next.delete(itemId);
        return next;
      });
    }
  }

  return (
    <div className="relative group">
      <Link href="/cart" className={linkClass} onClick={onNavigate}>
        Cart
        {count > 0 && (
          <span className="ml-1 inline-flex items-center justify-center bg-citrus text-white text-xs rounded-full w-5 h-5">
            {count}
          </span>
        )}
      </Link>

      {/* pt-2 (padding, not margin) keeps this flush against the trigger
          so there's no dead zone when moving the mouse down into it */}
      <div className="absolute right-0 top-full pt-2 hidden group-hover:block z-50">
        <div className="w-72 bg-white dark:bg-[#12211D] border border-border rounded-lg shadow-lg p-3">
          {items.length === 0 ? (
            <p className="text-sm text-muted py-2 text-center">
              Your cart is empty.
            </p>
          ) : (
            <>
              <div className="flex flex-col gap-3 max-h-72 overflow-y-auto">
                {items.map((item) => {
                  const imageUrl = getProductImageUrl(item.image_path);
                  const isRemoving = removingIds.has(item.id);

                  return (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-md overflow-hidden bg-gray-100 shrink-0">
                        {imageUrl && (
                          <Image
                            src={imageUrl}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted">
                          Qty {item.quantity} · {item.price} ₼
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemove(item.id)}
                        disabled={isRemoving}
                        aria-label={`Remove ${item.name} from cart`}
                        className="flex items-center justify-center w-6 h-6 rounded-full bg-foreground text-white shadow hover:opacity-90 transition disabled:opacity-60 shrink-0"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-3.5 h-3.5"
                        >
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Total</span>
                <span className="text-sm font-display font-bold text-citrus">
                  {total.toFixed(2)} ₼
                </span>
              </div>
            </>
          )}

          <Link
            href="/cart"
            className="mt-3 block text-center text-sm font-medium bg-foreground text-background rounded-md py-2 hover:opacity-90 transition"
          >
            View Cart
          </Link>
        </div>
      </div>
    </div>
  );
}