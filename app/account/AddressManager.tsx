"use client";

import { useState } from "react";
import { addAddress, updateAddress, deleteAddress } from "./actions";
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

export default function AddressManager({
  initialAddresses,
}: {
  initialAddresses: Address[];
}) {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const [label, setLabel] = useState("");
  const [addressText, setAddressText] = useState("");
  const [isDefault, setIsDefault] = useState(false);

  function resetForm() {
    setLabel("");
    setAddressText("");
    setIsDefault(false);
    setIsAdding(false);
    setEditingId(null);
    setError("");
  }

  function startEdit(address: Address) {
    setEditingId(address.id);
    setLabel(address.label);
    setAddressText(address.address_text);
    setIsDefault(address.is_default);
    setIsAdding(false);
  }

  async function handleSave() {
    setError("");
    setIsSaving(true);

    try {
      if (editingId) {
        await updateAddress(editingId, label, addressText, isDefault);
      } else {
        await addAddress(label, addressText, isDefault);
      }
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save address.");
      setIsSaving(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteAddress(id);
      setAddresses((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete address.");
    }
  }

  return (
    <div className="space-y-3">
      {addresses.map((address) => (
        <div key={address.id} className="border rounded-md p-3 flex justify-between items-start">
          <div>
            <p className="font-medium">
              {address.label}
              {address.is_default && (
                <span className="ml-2 text-xs text-[#08a2c1]">(Default)</span>
              )}
            </p>
            <p className="text-sm text-gray-600">{address.address_text}</p>
          </div>
          <div className="flex gap-3 text-sm">
            <button onClick={() => startEdit(address)} className="text-[#08a2c1] hover:underline">
              Edit
            </button>
            <button onClick={() => handleDelete(address.id)} className="text-red-600 hover:underline">
              Delete
            </button>
          </div>
        </div>
      ))}

      {(isAdding || editingId) ? (
        <div className="border rounded-md p-3 space-y-3">
          <input
            type="text"
            placeholder="Label (e.g. Home, Work)"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            disabled={isSaving}
            className="w-full border rounded-md px-3 py-2 text-sm disabled:opacity-60"
          />

          <div>
            <AddressPicker onAddressChange={setAddressText} disabled={isSaving} />

            <details className="mt-2">
              <summary className="text-xs text-gray-500 cursor-pointer">
                Can&apos;t find your address? Enter it manually
              </summary>
              <textarea
                rows={2}
                value={addressText}
                onChange={(e) => setAddressText(e.target.value)}
                disabled={isSaving}
                className="w-full border rounded-md px-3 py-2 text-sm mt-2 disabled:opacity-60"
                placeholder="Type your address"
              />
            </details>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={isDefault}
              onChange={(e) => setIsDefault(e.target.checked)}
              disabled={isSaving}
            />
            Set as default
          </label>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-3 py-1.5 rounded-md bg-[#08a2c1] text-white text-sm disabled:opacity-60"
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
            <button
              onClick={resetForm}
              disabled={isSaving}
              className="px-3 py-1.5 rounded-md border text-sm disabled:opacity-60"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="text-sm text-[#08a2c1] hover:underline"
        >
          + Add Address
        </button>
      )}
    </div>
  );
}