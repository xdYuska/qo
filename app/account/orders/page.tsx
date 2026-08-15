import { getOrdersForCurrentUser } from "@/lib/orders";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function OrderHistoryPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.is_anonymous) {
    redirect("/login");
  }

  const orders = await getOrdersForCurrentUser();

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-semibold text-[#08a2c1] mb-6">
        Order History
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">You haven&apos;t placed any orders yet.</p>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/orders/${order.id}`}
              className="block border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">
                    Order #{order.id.slice(0, 8)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.created_at).toLocaleDateString()} ·{" "}
                    {order.payment_method.replace("_", " ")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-[#08a2c1]">
                    {Number(order.total).toFixed(2)} ₼
                  </p>
                  <p className="text-sm text-gray-500 capitalize">
                    {order.status}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}