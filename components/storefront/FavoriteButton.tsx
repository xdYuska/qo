"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { toggleFavorite } from "@/app/products/[slug]/actions";

export default function FavoriteButton({
  productId,
  initialIsFavorite,
}: {
  productId: string;
  initialIsFavorite: boolean;
}) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!error) return;
    const timeout = setTimeout(() => setError(""), 2000);
    return () => clearTimeout(timeout);
  }, [error]);

  async function handleClick(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (isUpdating) return;

    const previous = isFavorite;
    setIsFavorite(!previous);
    setIsUpdating(true);
    setError("");

    try {
      await toggleFavorite(productId);
    } catch (err) {
      setIsFavorite(previous);
      setError(
        err instanceof Error ? err.message : "Could not update favorites."
      );
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={isUpdating}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        className="disabled:opacity-60"
      >
        <Image
          src={isFavorite ? "/icons/heart-full.png" : "/icons/heart-outline.png"}
          alt=""
          width={20}
          height={20}
        />
      </button>

      {error && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-foreground text-background text-sm px-4 py-2 rounded-md shadow-lg z-50">
          {error}
        </div>
      )}
    </>
  );
}