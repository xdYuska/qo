import { getCart } from "@/lib/cart";
import CartItem from "./CartItem";

export default async function CartPage() {
  const cart = await getCart();

  if (!cart || cart.items.length === 0) {
    return (
      <main className="shop-wallpaper min-h-screen">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-foreground mb-6">
            Your Cart
          </h1>

          <p className="text-muted">Your cart is empty.</p>
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

  return (
    <main className="shop-wallpaper min-h-screen">
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground mb-6">
        Your Cart
      </h1>

      <div className="space-y-4">
        {cart.items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div className="mt-8 border-t pt-6 flex justify-end">
  <div className="w-full">
    <div className="flex justify-between items-center text-lg font-bold">
      <span className="text-foreground">Subtotal</span>
      <span className="text-citrus">{subtotal.toFixed(2)} ₼</span>
    </div>

    <div className="mt-4 flex justify-end">
      <a
        href="/checkout"
        className="px-5 py-2 rounded-md bg-foreground text-background hover:opacity-90">
        Checkout
      </a>
    </div>
  </div>
</div>
    </div>
    </main>
  );
}