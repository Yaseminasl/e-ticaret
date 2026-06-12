"use client";

import { useState } from "react";
import { useCart } from "@/hooks/useCart";

type AddToCartButtonProps = {
  productId: number;
};

export function AddToCartButton({ productId }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  function handleAddToCart() {
    addToCart(productId);
    setIsAdded(true);

    window.setTimeout(() => {
      setIsAdded(false);
    }, 1200);
  }

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      className="mt-8 w-full rounded-md bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700 sm:w-auto"
    >
      {isAdded ? "Sepete Eklendi" : "Sepete Ekle"}
    </button>
  );
}
