"use client";

import { useState } from "react";
import Link from "next/link";
import { MAX_QUANTITY, useCart } from "../context/CartContext";

const SHIPPING_FREE_OVER = 100;
const SHIPPING_FEE = 5;

export default function CartPage() {
  const { items, itemCount, subtotal, updateQuantity, removeItem, clearCart } = useCart();
  const [status, setStatus] = useState<"idle" | "paying" | "failed">("idle");
  const [orderId, setOrderId] = useState("");

  const shipping = subtotal === 0 || subtotal >= SHIPPING_FREE_OVER ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  const checkout = async () => {
    setStatus("paying");
    try {
      const res = await fetch("/api/fake_payment", { method: "POST" });
      const data = await res.json();
      if (data.status === "success") {
        setOrderId(data.transactionId);
        clearCart();
        setStatus("idle");
      } else {
        setStatus("failed");
      }
    } catch {
      setStatus("failed");
    }
  };

  if (orderId) {
    return (
      <main className="max-w-xl mx-auto px-6 py-16 text-center">
        <div className="text-6xl">🎉</div>
        <h1 className="mt-4 text-3xl font-bold">Thank you for your order!</h1>
        <p className="mt-2 text-gray-600">Payment successful.</p>
        <p className="mt-1 text-sm text-gray-500 break-all">Order ID: {orderId}</p>
        <Link
          href="/products"
          className="inline-block mt-8 px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Continue shopping
        </Link>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="max-w-xl mx-auto px-6 py-16 text-center">
        <div className="text-6xl">🛒</div>
        <h1 className="mt-4 text-2xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-gray-600">Find something you like and add it to your cart.</p>
        <Link
          href="/products"
          className="inline-block mt-8 px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Browse products
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">
        Your cart <span className="text-gray-500 text-xl">({itemCount} items)</span>
      </h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <ul className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-500">{item.brand}</p>
                <p className="text-sm font-medium mt-1">${item.price.toFixed(2)}</p>
              </div>

              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="px-3 py-1 text-lg hover:bg-gray-100 cursor-pointer"
                  aria-label={`Remove one ${item.name}`}
                >
                  −
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  disabled={item.quantity >= MAX_QUANTITY}
                  className="px-3 py-1 text-lg hover:bg-gray-100 cursor-pointer disabled:opacity-40"
                  aria-label={`Add one ${item.name}`}
                >
                  +
                </button>
              </div>

              <p className="w-24 text-right font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-500 hover:text-red-700 text-sm cursor-pointer"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        <aside className="h-fit p-6 bg-white rounded-xl shadow-sm border space-y-3">
          <h2 className="text-lg font-bold">Order summary</h2>
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>
          {shipping > 0 && (
            <p className="text-xs text-gray-500">
              Add ${(SHIPPING_FREE_OVER - subtotal).toFixed(2)} more for free shipping.
            </p>
          )}
          <div className="flex justify-between border-t pt-3 text-lg font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          {status === "failed" && (
            <p className="text-sm text-red-600">Payment failed. Please try again.</p>
          )}

          <button
            onClick={checkout}
            disabled={status === "paying"}
            className="w-full py-3 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 disabled:opacity-60 cursor-pointer"
          >
            {status === "paying" ? "Processing payment..." : "Checkout"}
          </button>
          <button
            onClick={clearCart}
            className="w-full py-2 text-sm text-gray-500 hover:text-gray-800 cursor-pointer"
          >
            Clear cart
          </button>
        </aside>
      </div>
    </main>
  );
}
