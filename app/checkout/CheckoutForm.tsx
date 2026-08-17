"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { placeOrder } from "./actions";
import dynamic from "next/dynamic";

const AddressPicker = dynamic(
  () => import("@/components/storefront/AddressPicker"),
  { ssr: false }
);

type Address = {
  id: string;
  label: string;
  address_text: string;
  is_default: boolean;
};

type CheckoutFormProps = {
  initialFullName?: string;
  initialEmail?: string;
  initialPhone?: string;
  addresses?: Address[];
};

export default function CheckoutForm({
  initialFullName = "",
  initialEmail = "",
  initialPhone = "",
  addresses = [],
}: CheckoutFormProps) {
  const router = useRouter();
  const defaultAddress = addresses.find((a) => a.is_default) ?? addresses[0];

  const [fullName, setFullName] = useState(initialFullName);
  const [phone, setPhone] = useState(initialPhone);
  const [email, setEmail] = useState(initialEmail);
  const [address, setAddress] = useState(defaultAddress?.address_text ?? "");
  const [selectedAddressId, setSelectedAddressId] = useState(
    defaultAddress ? defaultAddress.id : "new"
  );
  const [paymentMethod, setPaymentMethod] = useState<"cash_on_delivery" | "online">("cash_on_delivery");

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
      const result = await placeOrder(
        fullName,
        phone,
        email,
        address,
        paymentMethod
      );
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
        <label htmlFor="fullName" className="block text-sm font-medium mb-1">
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
        <label htmlFor="phone" className="block text-sm font-medium mb-1">
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
        <label htmlFor="email" className="block text-sm font-medium mb-1">
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
        <label className="block text-sm font-medium mb-1">
          Payment Method
        </label>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="paymentMethod"
              checked={paymentMethod === "cash_on_delivery"}
              onChange={() => setPaymentMethod("cash_on_delivery")}
              disabled={isSubmitting}
            />
            Cash on Delivery
          </label>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="paymentMethod"
              checked={paymentMethod === "online"}
              onChange={() => setPaymentMethod("online")}
              disabled={isSubmitting}
            />
            Online Payment (Card)
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Delivery Address
        </label>

        {addresses.length > 0 && (
          <>
            <select
              value={selectedAddressId}
              onChange={(event) => {
                const value = event.target.value;
                setSelectedAddressId(value);

                if (value === "new") {
                  setAddress("");
                } else {
                  const selected = addresses.find((a) => a.id === value);
                  setAddress(selected?.address_text ?? "");
                }
              }}
              disabled={isSubmitting}
              className="w-full border rounded-md px-3 py-2 disabled:opacity-60"
            >
              {addresses.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.label} {a.is_default ? "(Default)" : ""}
                </option>
              ))}
              <option value="new">Enter a new address</option>
            </select>

            {selectedAddressId !== "new" && (
              <p className="text-sm text-gray-500 mt-1">{address}</p>
            )}
          </>
        )}

        {selectedAddressId === "new" && (
          <>
            <AddressPicker onAddressChange={setAddress} disabled={isSubmitting} />

            <details className="mt-2">
              <summary className="text-xs text-gray-500 cursor-pointer">
                Can&apos;t find your address? Enter it manually
              </summary>
              <textarea
                rows={3}
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                disabled={isSubmitting}
                className="w-full border rounded-md px-3 py-2 mt-2 disabled:opacity-60"
                placeholder="Type your delivery address"
              />
            </details>
          </>
        )}
      </div>

      {errorMessage && (
        <div className="border border-red-300 bg-red-50 text-red-700 rounded-md px-4 py-3">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-5 py-3 rounded-md bg-foreground text-background hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Placing Order..." : "Place Order"}
      </button>
    </form>
  );
}