"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface CartProduct {
  id: number;
  name: string;
  img: string;
  brand: string;
  price: number;
}

export interface CartItem extends CartProduct {
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (product: CartProduct) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

const STORAGE_KEY = "nivro-cart";
export const MAX_QUANTITY = 10;

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load the saved cart once, in the browser.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch {
      // Ignore a broken or blocked storage and start with an empty cart.
    }
    setLoaded(true);
  }, []);

  // Save the cart whenever it changes.
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage may be full or blocked; the cart still works for this visit.
    }
  }, [items, loaded]);

  const value = useMemo<CartContextValue>(() => {
    const addItem = (product: CartProduct) =>
      setItems((current) => {
        const existing = current.find((item) => item.id === product.id);
        if (existing) {
          return current.map((item) =>
            item.id === product.id
              ? { ...item, quantity: Math.min(item.quantity + 1, MAX_QUANTITY) }
              : item,
          );
        }
        return [...current, { ...product, quantity: 1 }];
      });

    const removeItem = (id: number) =>
      setItems((current) => current.filter((item) => item.id !== id));

    const updateQuantity = (id: number, quantity: number) =>
      setItems((current) =>
        quantity < 1
          ? current.filter((item) => item.id !== id)
          : current.map((item) =>
              item.id === id
                ? { ...item, quantity: Math.min(quantity, MAX_QUANTITY) }
                : item,
            ),
      );

    const clearCart = () => setItems([]);

    return {
      items,
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside <CartProvider>");
  return context;
}
