"use client";

import { useState, useEffect } from "react";
import { quickAddToCart } from "./cartActions";

export default function AddToCartButton({ productId }: { productId: string }) {
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!error) return;
    const timeout = setTimeout(() => setError(""), 2000);
    return () => clearTimeout(timeout);
  }, [error]);

  useEffect(() => {
    if (!justAdded) return;
    const timeout = setTimeout(() => setJustAdded(false), 1200);
    return () => clearTimeout(timeout);
  }, [justAdded]);

  async function handleClick(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (isAdding) return;

    setIsAdding(true);
    setError("");

    const result = await quickAddToCart(productId);

    setIsAdding(false);

    if (result.success) {
      setJustAdded(true);
    } else {
      setError(result.message ?? "Could not add to cart.");
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={isAdding}
        aria-label="Add 1 to cart"
        className={`flex items-center justify-center w-8 h-8 rounded-full shadow text-white transition disabled:opacity-60 ${
          justAdded ? "bg-leaf" : "bg-gray-600 hover:opacity-90"
        }`}
      >
        {justAdded ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        )}
      </button>

      {error && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm px-4 py-2 rounded-md shadow-lg z-50">
          {error}
        </div>
      )}
    </>
  );
}