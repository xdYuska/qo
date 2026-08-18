"use client";

import Image from "next/image";
import { useState } from "react";
import { getProductImageUrl } from "@/lib/supabase/images";
import {
  updateCartItemQuantity,
  removeCartItem,
} from "./actions";

type CartItemProps = {
  item: {
    id: string;
    quantity: number;
    products: {
      id: string;
      name: string;
      price: number;
      image_path: string | null;
      stock_quantity: number;
    } | null;
  };
};

export default function CartItem({ item }: CartItemProps) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  const product = item.products;

  if (!product || isRemoved) {
    return null;
  }

  const imageUrl = getProductImageUrl(product.image_path);
  const stockQuantity = product.stock_quantity;

  async function changeQuantity(newQuantity: number) {
    if (isUpdating || newQuantity < 1) {
      return;
    }

    // If the cart quantity is above current stock,
    // clicking minus brings it directly down to available stock.
    if (quantity > stockQuantity && newQuantity < quantity) {
      newQuantity = stockQuantity;
    }

    // Never allow the quantity to exceed current stock.
    if (newQuantity > stockQuantity) {
      return;
    }

    const previousQuantity = quantity;

    setQuantity(newQuantity);
    setIsUpdating(true);

    try {
      await updateCartItemQuantity(item.id, newQuantity);
    } catch (error) {
      console.error("CART QUANTITY UPDATE FAILED:", error);

      setQuantity(previousQuantity);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to update cart quantity."
      );
    } finally {
      setIsUpdating(false);
    }
  }

  async function handleRemove() {
    // Remove from the UI immediately.
    setIsRemoved(true);
    setIsRemoving(true);

    try {
      await removeCartItem(item.id);
    } catch (error) {
      console.error("CART ITEM REMOVE FAILED:", error);

      // Restore the item if the server-side deletion failed.
      setIsRemoved(false);

      alert(
        error instanceof Error
          ? error.message
          : "Unable to remove item."
      );
    } finally {
      setIsRemoving(false);
    }
  }

  return (
    <div className="relative flex gap-4 border border-border rounded-2xl p-4 bg-white dark:bg-white/[0.03]">
      <button
        type="button"
        onClick={handleRemove}
        disabled={isRemoving}
        aria-label={`Remove ${product.name} from cart`}
        className="absolute top-3 right-3 flex items-center justify-center w-6 h-6 rounded-full bg-foreground text-white shadow hover:opacity-90 transition disabled:opacity-60"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-3.5 h-3.5"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 bg-border/40 rounded-xl overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted text-sm">
            No image
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0 pr-8">
        <h2 className="font-medium text-foreground line-clamp-2 pr-2">
          {product.name}
        </h2>

        <p className="text-sm font-display font-bold text-foreground mt-1">
          {Number(product.price).toFixed(2)} ₼
        </p>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center border border-border rounded-full overflow-hidden">
            <button
              type="button"
              disabled={isUpdating || quantity <= 1}
              onClick={() => changeQuantity(quantity - 1)}
              className="w-8 h-8 flex items-center justify-center text-foreground disabled:opacity-40"
            >
              −
            </button>

            <span className="min-w-8 text-center text-sm font-medium">
              {quantity}
            </span>

            <button
              type="button"
              disabled={isUpdating || quantity >= stockQuantity}
              onClick={() => changeQuantity(quantity + 1)}
              className="w-8 h-8 flex items-center justify-center text-foreground disabled:opacity-40"
            >
              +
            </button>
          </div>

          <p className="text-sm font-display font-bold text-citrus">
            {(Number(product.price) * quantity).toFixed(2)} ₼
          </p>
        </div>
      </div>
    </div>
  );
}