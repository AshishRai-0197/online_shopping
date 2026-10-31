"use client";

import { useState } from "react";
import { useCart } from "../context/CartContext";

interface Product {
  id: number;
  name: string;
  img: string;
  brand: string;
  price: number;
}

export default function FlipCard({ product }: { product: Product }) {
  const [flipped, setFlipped] = useState(false);
  const [payment, setPayment] = useState("");
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const addToCart = (event: React.MouseEvent) => {
    event.stopPropagation(); // keep the card flipped
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const paymentNow = async () => {
    setPayment("Processing Payment...");

    const res = await fetch("/api/fake_payment", {
      method: "POST",
    });
    const data = await res.json();

    if (data.status === "success") {
      setPayment(`Payment Successful (ID:${data.transactionId})`);
    } else {
      setPayment("Payment Failed. Please try again");
    }
  };
  return (
    <div
      onClick={() => setFlipped(!flipped)}
      className="cursor-pointer w-full h-[256px] perspective"
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 ${
          flipped ? "rotate-y-180" : ""
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute inset-0 bg-white rounded-xl shadow-md backface-hidden flex flex-col items-center justify-center p-4">
          <img
            src={product.img}
            className="w-[130px] h-[115px] rounded-lg object-cover"
          />
          <h3 className="mt-4 font-semibold text-lg">{product.name}</h3>
        </div>
        <div className="absolute inset-0 bg-blue-600 text-white rounded-xl shadow-md backface-hidden rotate-y-180 flex flex-col items-center justify-center p-4">
          <h3 className="text-xl font-bold">{product.name}</h3>
          <p className="text-lg font-bold mt-1">${product.price}</p>
          <p className="text-sm opacity-80">{product.brand}</p>
          <div className="mt-6 flex flex-col gap-2">
            <button
              onClick={addToCart}
              className="py-2 px-12 bg-white text-blue-700 font-medium rounded-lg shadow hover:bg-blue-50 cursor-pointer"
            >
              {added ? "Added ✓" : "Add to Cart"}
            </button>
            <button
              onClick={(event) => {
                event.stopPropagation();
                paymentNow();
              }}
              className="py-2 px-12 bg-green-500 border flex items-center gap-2 rounded-lg shadow-lg hover:shadow-lg cursor-pointer"
            >
              Buy Now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </button>

            {payment && <p className="mt-2 text-gray-800 font">{payment}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
