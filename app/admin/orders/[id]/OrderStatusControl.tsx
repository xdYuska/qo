"use client";

import { useState } from "react";
import { updateOrderStatus } from "./actions";

const STATUSES = ["pending", "confirmed", "completed", "cancelled"];

export default function OrderStatusControl({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: string;
}) {
  const [status, setStatus] = useState(currentStatus);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");

  async function handleChange(newStatus: string) {
    const previousStatus = status;
    setStatus(newStatus);
    setIsUpdating(true);
    setError("");

    try {
      await updateOrderStatus(orderId, newStatus);
    } catch (err) {
      setStatus(previousStatus);
      setError(
        err instanceof Error ? err.message : "Failed to update status."
      );
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium mb-1">Status</label>
      <select
        value={status}
        onChange={(event) => handleChange(event.target.value)}
        disabled={isUpdating}
        className="border rounded-md px-3 py-2 text-sm capitalize disabled:opacity-60"
      >
        {STATUSES.map((s) => (
          <option key={s} value={s} className="capitalize">
            {s}
          </option>
        ))}
      </select>
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
    </div>
  );
}