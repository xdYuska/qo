import Link from "next/link";
import { getCart } from "@/lib/cart";
import CartItem from "./CartItem";

export default async function CartPage() {
  const cart = await getCart();

  if (!cart || cart.items.length === 0) {
    return (
      <main className="shop-wallpaper min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="font-display font-bold text-2xl mb-2 text-foreground">
            Your Cart
          </h1>
          <p className="text-sm text-muted mb-6">
            Items you add will show up here.
          </p>

          <div className="border border-dashed border-black/15 dark:border-white/15 rounded-2xl py-16 px-4 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-brand/10 text-brand flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.5 3h2l2.6 12.4a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 2-1.6L21 8H6" />
              </svg>
            </div>
            <p className="text-muted max-w-xs">Your cart is empty.</p>
            <Link
              href="/shop"
              className="mt-6 inline-block bg-foreground text-white text-sm font-medium px-6 py-3 rounded-lg hover:opacity-90 hover:shadow-lg hover:-translate-y-1 active:scale-[0.98] active:translate-y-0 transition duration-200 ease-out"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const subtotal = cart.items.reduce((total, item) => {
    if (!item.products) {
      return total;
    }

    return total + Number(item.products.price) * item.quantity;
  }, 0);

  const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main className="shop-wallpaper min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="font-display font-bold text-2xl mb-2 text-foreground">
          Your Cart
        </h1>
        <p className="text-sm text-muted mb-6">
          {itemCount} item{itemCount === 1 ? "" : "s"} in your cart.
        </p>

        <div className="grid lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 flex flex-col gap-4">
            {cart.items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="lg:sticky lg:top-24 border border-border rounded-2xl p-6 bg-white dark:bg-white/[0.03]">
            <h2 className="font-display font-semibold text-foreground mb-4">
              Order Summary
            </h2>

            <div className="flex justify-between items-center text-sm text-muted">
              <span>Subtotal</span>
              <span>{subtotal.toFixed(2)} ₼</span>
            </div>

            <div className="mt-4 pt-4 border-t border-border flex justify-between items-center text-lg font-bold">
              <span className="text-foreground">Total</span>
              <span className="font-display text-citrus">
                {subtotal.toFixed(2)} ₼
              </span>
            </div>

            <Link
              href="/checkout"
              className="mt-6 block text-center bg-foreground text-white text-sm font-medium px-5 py-3 rounded-lg hover:opacity-90 hover:shadow-lg hover:-translate-y-1 active:scale-[0.98] active:translate-y-0 transition duration-200 ease-out"
            >
              Checkout
            </Link>

            <Link
              href="/shop"
              className="mt-3 block text-center text-sm font-medium text-muted hover:text-foreground transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}