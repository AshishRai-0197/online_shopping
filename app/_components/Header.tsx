"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { itemCount } = useCart();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(!!stored);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Signup", path: "/signup" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    router.push("/signup");
  };

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex gap-6">
          <img src={"/logo.jpg"} className="h-[80px] rounded-lg" />
          <h1 className="text-xl font-bold pt-6">Nivro</h1>
        </div>

        <nav>
          <ul className="flex space-x-4">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`hover:text-blue-200 cursor-pointer ${
                    pathname === item.path ? "font-bold underline" : ""
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/cart"
            className="relative flex items-center gap-1 hover:text-blue-200"
            aria-label={`Cart with ${itemCount} items`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
            Cart
            {itemCount > 0 && (
              <span className="absolute -top-2 -left-2 min-w-5 h-5 px-1 rounded-full bg-red-500 text-xs font-bold flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/signup"
              className="bg-white text-blue-600 hover:bg-blue-100 px-4 py-2 rounded font-medium"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
