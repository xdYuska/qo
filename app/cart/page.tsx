import { getCart } from "@/lib/cart";
import CartItem from "./CartItem";

export default async function CartPage() {
  const cart = await getCart();

  if (!cart || cart.items.length === 0) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold text-[#08a2c1] mb-6">
          Your Cart
        </h1>

        <p className="text-gray-500">Your cart is empty.</p>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold text-[#08a2c1] mb-6">
        Your Cart
      </h1>

      <div className="space-y-4">
        {cart.items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}