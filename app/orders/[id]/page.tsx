import { getOrderById } from "@/lib/orders";
import { notFound } from "next/navigation";

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) {
    notFound();
  }

  return (
    <main className="shop-wallpaper min-h-screen">
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="border rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-brand">
          {order.status === "completed" && "Order Completed"}
          {order.status === "cancelled" && "Order Cancelled"}
          {order.status === "confirmed" && "Order Confirmed"}
          {order.status === "pending" && "Order Placed Successfully"}
        </h1>

        <p className="mt-2 text-gray-600">
          {order.status === "cancelled"
            ? `We're sorry, ${order.full_name} — this order has been cancelled.`
            : `Thank you, ${order.full_name}. Your order has been received.`}
        </p>

        <div className="mt-4 text-sm text-gray-500">
          <p>Order ID: {order.id}</p>
          <p>Status: {order.status}</p>
          <p>Payment: {order.payment_method.replace("_", " ")}</p>
        </div>

        <div className="mt-6 border-t pt-4 space-y-3">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>
                {item.product_name} × {item.quantity}
              </span>
              <span>
                {(Number(item.unit_price) * item.quantity).toFixed(2)} ₼
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 border-t pt-4 flex justify-between font-semibold">
          <span>Total</span>
          <span className="text-brand">
            {Number(order.total).toFixed(2)} ₼
          </span>
        </div>

        <div className="mt-6 border-t pt-4 text-sm text-gray-500">
          <p>Delivering to: {order.delivery_address}</p>
          <p>Contact: {order.phone} · {order.email}</p>
        </div>
      </div>
    </div>
    </main>
  );
}