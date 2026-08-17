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
    setIsUpdating(true);

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
      setIsUpdating(false);
    }
  }

  return (
    <div className="flex gap-4 border rounded-xl p-4">
      <div className="relative w-24 h-24 shrink-0 bg-gray-100 rounded-md overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            No image
          </div>
        )}
      </div>

      <div className="flex-1">
        <h2 className="text-2xl font-medium text-foreground">
          {product.name}
        </h2>

        <p className="text-foreground font-display font-bold mt-1">
          {Number(product.price).toFixed(2)} ₼
        </p>

        <div className="flex items-center gap-3 mt-3">
          <button
            type="button"
            disabled={isUpdating || quantity <= 1}
            onClick={() => changeQuantity(quantity - 1)}
            className="w-8 h-8 border rounded-md disabled:opacity-40"
          >
            −
          </button>

          <span className="min-w-6 text-center">
            {quantity}
          </span>

          <button
            type="button"
            disabled={isUpdating || quantity >= stockQuantity}
            onClick={() => changeQuantity(quantity + 1)}
            className="w-8 h-8 border rounded-md disabled:opacity-40"
          >
            +
          </button>
        </div>

        <p className="text-foreground font-bold font-display mt-2">
          Total: {(Number(product.price) * quantity).toFixed(2)} ₼
        </p>

        <button
          type="button"
          disabled={isUpdating}
          onClick={handleRemove}
          className="mt-3 text-sm text-red-600 hover:text-red-700 disabled:opacity-40"
        >
          Remove
        </button>
      </div>
    </div>
  );
}