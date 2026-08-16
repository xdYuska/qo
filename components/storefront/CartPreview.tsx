import Image from "next/image";
import Link from "next/link";
import { getProductImageUrl } from "@/lib/supabase/images";

type CartPreviewItem = {
  id: string;
  name: string;
  price: number;
  image_path: string | null;
  quantity: number;
};

export default function CartPreview({
  items,
  cartCount,
  linkClass,
  onNavigate,
}: {
  items: CartPreviewItem[];
  cartCount: number;
  linkClass: string;
  onNavigate: () => void;
}) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="relative group">
      <Link href="/cart" className={linkClass} onClick={onNavigate}>
        Cart
        {cartCount > 0 && (
          <span className="ml-1 inline-flex items-center justify-center bg-citrus text-white text-xs rounded-full w-5 h-5">
            {cartCount}
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
                    </div>
                  );
                })}
              </div>

              <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Total</span>
                <span className="text-sm font-display font-bold text-brand">
                  {total.toFixed(2)} ₼
                </span>
              </div>
            </>
          )}

          <Link
            href="/cart"
            className="mt-3 block text-center text-sm font-medium bg-brand text-white rounded-md py-2 hover:opacity-90 transition"
          >
            View Cart
          </Link>
        </div>
      </div>
    </div>
  );
}