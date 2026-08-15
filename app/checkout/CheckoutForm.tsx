"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { placeOrder } from "./actions";

export default function CheckoutForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const result = await placeOrder(fullName, phone, email, address);
      router.push(`/orders/${result.orderId}`);
    } catch (error) {
      console.error("CHECKOUT FAILED:", error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Failed to place your order."
      );
      setIsSubmitting(false);
    }
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
          htmlFor="email"
          className="block text-sm font-medium mb-1"
        >
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={isSubmitting}
          className="w-full border rounded-md px-3 py-2 disabled:opacity-60"
          placeholder="you@example.com"
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