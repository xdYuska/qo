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

const inputClass =
  "w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-white dark:bg-transparent text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition disabled:opacity-60";

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
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-1.5">
          Full Name
        </label>

        <input
          id="fullName"
          name="fullName"
          type="text"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          disabled={isSubmitting}
          className={inputClass}
          placeholder="Your full name"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1.5">
            Phone
          </label>

          <input
            id="phone"
            name="phone"
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            disabled={isSubmitting}
            className={inputClass}
            placeholder="Your phone number"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={isSubmitting}
            className={inputClass}
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Payment Method
        </label>

        <div className="grid sm:grid-cols-2 gap-3">
          <label
            className={`flex items-center gap-3 border rounded-lg px-4 py-3 text-sm cursor-pointer transition ${
              paymentMethod === "cash_on_delivery"
                ? "border-brand bg-brand/5"
                : "border-border hover:border-black/20 dark:hover:border-white/20"
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              checked={paymentMethod === "cash_on_delivery"}
              onChange={() => setPaymentMethod("cash_on_delivery")}
              disabled={isSubmitting}
              className="accent-brand"
            />
            Cash on Delivery
          </label>

          <label
            className={`flex items-center gap-3 border rounded-lg px-4 py-3 text-sm cursor-pointer transition ${
              paymentMethod === "online"
                ? "border-brand bg-brand/5"
                : "border-border hover:border-black/20 dark:hover:border-white/20"
            }`}
          >
            <input
              type="radio"
              name="paymentMethod"
              checked={paymentMethod === "online"}
              onChange={() => setPaymentMethod("online")}
              disabled={isSubmitting}
              className="accent-brand"
            />
            Online Payment (Card)
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">
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
              className={inputClass}
            >
              {addresses.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.label} {a.is_default ? "(Default)" : ""}
                </option>
              ))}
              <option value="new">Enter a new address</option>
            </select>

            {selectedAddressId !== "new" && (
              <p className="text-sm text-muted mt-1.5">{address}</p>
            )}
          </>
        )}

        {selectedAddressId === "new" && (
          <div className={addresses.length > 0 ? "mt-3" : ""}>
            <AddressPicker onAddressChange={setAddress} disabled={isSubmitting} />

            <details className="mt-2">
              <summary className="text-xs text-muted cursor-pointer">
                Can&apos;t find your address? Enter it manually
              </summary>
              <textarea
                rows={3}
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                disabled={isSubmitting}
                className={`${inputClass} mt-2`}
                placeholder="Type your delivery address"
              />
            </details>
          </div>
        )}
      </div>

      {errorMessage && (
        <div className="border border-red-300 bg-red-50 text-red-700 text-sm rounded-lg px-4 py-3">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-5 py-3 rounded-lg bg-foreground text-white text-sm font-medium hover:opacity-90 hover:shadow-lg hover:-translate-y-1 active:scale-[0.98] active:translate-y-0 transition duration-200 ease-out disabled:opacity-50 disabled:pointer-events-none"
      >
        {isSubmitting ? "Placing Order..." : "Place Order"}
      </button>
    </form>
  );
}