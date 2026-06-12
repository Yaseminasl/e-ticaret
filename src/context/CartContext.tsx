"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from "react";

type CartItem = {
  productId: number;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  addToCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
};

type CartAction =
  | { type: "ADD_ITEM"; productId: number }
  | { type: "UPDATE_QUANTITY"; productId: number; quantity: number }
  | { type: "REMOVE_ITEM"; productId: number }
  | { type: "CLEAR_CART" }
  | { type: "SET_ITEMS"; items: CartItem[] };

export const CartContext = createContext<CartContextValue | null>(null);

function cartReducer(items: CartItem[], action: CartAction): CartItem[] {
  if (action.type === "ADD_ITEM") {
    const existingItem = items.find(
      (item) => item.productId === action.productId,
    );

    if (existingItem) {
      return items.map((item) =>
        item.productId === action.productId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
    }

    return [...items, { productId: action.productId, quantity: 1 }];
  }

  if (action.type === "UPDATE_QUANTITY") {
    if (action.quantity <= 0) {
      return items.filter((item) => item.productId !== action.productId);
    }

    return items.map((item) =>
      item.productId === action.productId
        ? { ...item, quantity: action.quantity }
        : item,
    );
  }

  if (action.type === "REMOVE_ITEM") {
    return items.filter((item) => item.productId !== action.productId);
  }

  if (action.type === "CLEAR_CART") {
    return [];
  }

  if (action.type === "SET_ITEMS") {
    return action.items;
  }

  return items;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, []);
  const hasLoadedCart = useRef(false);

  useEffect(() => {
    const storedCart = window.localStorage.getItem("cart");

    if (storedCart) {
      dispatch({
        type: "SET_ITEMS",
        items: JSON.parse(storedCart) as CartItem[],
      });
    }

    hasLoadedCart.current = true;
  }, []);

  useEffect(() => {
    if (hasLoadedCart.current) {
      window.localStorage.setItem("cart", JSON.stringify(items));
    }
  }, [items]);

  const addToCart = useCallback((productId: number) => {
    dispatch({ type: "ADD_ITEM", productId });
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", productId, quantity });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    dispatch({ type: "REMOVE_ITEM", productId });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  const totalItems = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      totalItems,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
    }),
    [items, totalItems, addToCart, updateQuantity, removeFromCart, clearCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
