"use client";

import { FormEvent, useState } from "react";
import { placeOrder } from "./actions";

export default function CheckoutForm() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [orderId, setOrderId] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting || orderId) {
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const result = await placeOrder(
        fullName,
        phone,
        address
      );

      setOrderId(result.orderId);
    } catch (error) {
      console.error("CHECKOUT FAILED:", error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to place your order."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (orderId) {
    return (
      <div className="space-y-4">
        <div className="border rounded-lg p-5">
          <h2 className="text-xl font-semibold text-[#08a2c1]">
            Order Placed Successfully
          </h2>

          <p className="mt-2 text-gray-600">
            Your order has been created.
          </p>

          <p className="mt-2 font-medium">
            Order ID: {orderId}
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          disabled={isSubmitting}
          className="w-full border rounded-md px-3 py-2 disabled:opacity-60"
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
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          disabled={isSubmitting}
          className="w-full border rounded-md px-3 py-2 disabled:opacity-60"
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
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          disabled={isSubmitting}
          className="w-full border rounded-md px-3 py-2 disabled:opacity-60"
          placeholder="Your delivery address"
        />
      </div>

      {errorMessage && (
        <div className="border border-red-300 bg-red-50 text-red-700 rounded-md px-4 py-3">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-5 py-3 rounded-md bg-[#08a2c1] text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Placing Order..." : "Place Order"}
      </button>
    </form>
  );
}