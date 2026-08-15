import { getAllOrders } from "@/lib/admin/orders";
import Link from "next/link";

export default async function AdminOrdersPage() {
  const orders = await getAllOrders();

  return (
    <div>
      <h1 className="text-2xl font-semibold text-[#08a2c1] mb-6">
        Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet.</p>
      ) : (
        <div className="bg-white border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2">Order</th>
                <th className="px-4 py-2">Customer</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Payment</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t">
                  <td className="px-4 py-2">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="text-[#08a2c1] hover:underline"
                    >
                      #{order.id.slice(0, 8)}
                    </Link>
                  </td>
                  <td className="px-4 py-2">
                    <div>{order.full_name}</div>
                    <div className="text-gray-500">{order.phone}</div>
                  </td>
                  <td className="px-4 py-2">
                    {Number(order.total).toFixed(2)} ₼
                  </td>
                  <td className="px-4 py-2 capitalize">
                    {order.payment_method.replace("_", " ")}
                  </td>
                  <td className="px-4 py-2 capitalize">{order.status}</td>
                  <td className="px-4 py-2 text-gray-500">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}