import { getCart } from "@/lib/cart";

export default async function CheckoutPage() {
  const cart = await getCart();

  if (!cart || cart.items.length === 0) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold text-[#08a2c1] mb-6">
          Checkout
        </h1>

        <p className="text-gray-500">
          Your cart is empty.
        </p>
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
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold text-[#08a2c1] mb-8">
        Checkout
      </h1>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Delivery Information */}
        <section>
          <h2 className="text-xl font-semibold text-[#08a2c1] mb-4">
            Delivery Information
          </h2>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium mb-1"
              >
                Full Name
              </label>

              <input
                id="fullName"
                name="fullName"
                type="text"
                className="w-full border rounded-md px-3 py-2"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium mb-1"
              >
                Phone
              </label>

              <input
                id="phone"
                name="phone"
                type="tel"
                className="w-full border rounded-md px-3 py-2"
                placeholder="Your phone number"
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium mb-1"
              >
                Delivery Address
              </label>

              <textarea
                id="address"
                name="address"
                rows={4}
                className="w-full border rounded-md px-3 py-2"
                placeholder="Your delivery address"
              />
            </div>
          </div>
        </section>

        {/* Order Summary */}
        <section>
          <h2 className="text-xl font-semibold text-[#08a2c1] mb-4">
            Order Summary
          </h2>

          <div className="border rounded-lg p-4 space-y-4">
            {cart.items.map((item) => {
              if (!item.products) {
                return null;
              }

              const product = item.products;
              const lineTotal =
                Number(product.price) * item.quantity;

              return (
                <div
                  key={item.id}
                  className="flex justify-between gap-4"
                >
                  <div>
                    <p className="font-medium">
                      {product.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {item.quantity} ×{" "}
                      {Number(product.price).toFixed(2)} ₼
                    </p>
                  </div>

                  <p className="font-medium">
                    {lineTotal.toFixed(2)} ₼
                  </p>
                </div>
              );
            })}

            <div className="border-t pt-4 flex justify-between">
              <p className="font-semibold">
                Subtotal
              </p>

              <p className="font-semibold text-[#08a2c1]">
                {subtotal.toFixed(2)} ₼
              </p>
            </div>
          </div>

          <button
            type="button"
            className="w-full mt-6 px-5 py-3 rounded-md bg-[#08a2c1] text-white hover:opacity-90"
          >
            Place Order
          </button>
        </section>
      </div>
    </main>
  );
}