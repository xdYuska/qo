"use client";

import { useState } from "react";
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

  async function handleClick(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    if (isUpdating) return;

    const previous = isFavorite;
    setIsFavorite(!previous);
    setIsUpdating(true);

    try {
      await toggleFavorite(productId);
    } catch (error) {
      setIsFavorite(previous);
      console.error("Failed to toggle favorite:", error);
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isUpdating}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      className="text-xl leading-none disabled:opacity-60"
    >
      {isFavorite ? "❤️" : "🤍"}
    </button>
  );
}