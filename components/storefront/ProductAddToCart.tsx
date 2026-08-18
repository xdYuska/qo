"use client";

import { useState, useEffect } from "react";
import { quickAddToCart } from "./cartActions";

export default function ProductAddToCart({
  productId,
  maxQuantity,
}: {
  productId: string;
  maxQuantity: number;
}) {
  const [quantity, setQuantity] = useState(1);
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

  function changeQuantity(delta: number) {
    setQuantity((prev) => Math.max(1, Math.min(maxQuantity, prev + delta)));
  }

  async function handleClick() {
    if (isAdding) return;

    // Instant feedback: show "Added!" right away instead of waiting on
    // the server round trip, then roll back if it actually fails.
    setJustAdded(true);
    setIsAdding(true);
    setError("");

    const result = await quickAddToCart(productId, quantity);

    setIsAdding(false);

    if (!result.success) {
      setJustAdded(false);
      setError(result.message ?? "Could not add to cart.");
    }
  }

  return (
    <div className="flex items-center gap-3 mt-4">
      <div className="flex items-center border border-border rounded-md">
        <button
          type="button"
          disabled={isAdding || quantity <= 1}
          onClick={() => changeQuantity(-1)}
          className="w-8 h-9 flex items-center justify-center disabled:opacity-40"
        >
          −
        </button>
        <span className="w-8 text-center text-sm">{quantity}</span>
        <button
          type="button"
          disabled={isAdding || quantity >= maxQuantity}
          onClick={() => changeQuantity(1)}
          className="w-8 h-9 flex items-center justify-center disabled:opacity-40"
        >
          +
        </button>
      </div>

      <button
        type="button"
        onClick={handleClick}
        disabled={isAdding}
        className={`rounded-md px-4 py-2 text-sm text-white transition disabled:opacity-60 ${
          justAdded ? "bg-leaf" : "bg-foreground hover:opacity-90"
        }`}
      >
        {justAdded ? "Added!" : "Add to Cart"}
      </button>

      {error && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-foreground text-background text-sm px-4 py-2 rounded-md shadow-lg z-50">
          {error}
        </div>
      )}
    </div>
  );
}