import { getOrderByIdAdmin } from "@/lib/admin/orders";
import { notFound } from "next/navigation";
import OrderStatusControl from "./OrderStatusControl";

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getOrderByIdAdmin(id);

  if (!order) {
    notFound();
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-semibold text-brand mb-6">
        Order #{order.id.slice(0, 8)}
      </h1>

      <div className="bg-white border rounded-lg p-6 space-y-4">
        <OrderStatusControl orderId={order.id} currentStatus={order.status} />

        <div className="text-sm text-gray-600 border-t pt-4">
          <p>Payment: {order.payment_method.replace("_", " ")} — {order.payment_status}</p>
          <p>Placed: {new Date(order.created_at).toLocaleString()}</p>
        </div>

        <div className="text-sm border-t pt-4">
          <p className="font-medium">{order.full_name}</p>
          <p className="text-gray-600">{order.phone} · {order.email}</p>
          <p className="text-gray-600 mt-1">{order.delivery_address}</p>
        </div>

        <div className="border-t pt-4 space-y-2">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>{item.product_name} × {item.quantity}</span>
              <span>{(Number(item.unit_price) * item.quantity).toFixed(2)} ₼</span>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 flex justify-between font-semibold">
          <span>Total</span>
          <span className="text-brand">{Number(order.total).toFixed(2)} ₼</span>
        </div>
      </div>
    </div>
  );
}