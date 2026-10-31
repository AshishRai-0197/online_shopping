"use client";

import { useState } from "react";
import FlipCard from "../_components/FlipCard";

const products = [
  {
    id: 1,
    name: "T-Shirt",
    img: "/t_shirt.jpg",
    brand: "Nike",
    price: 20,
    category: "clothing",
  },
  {
    id: 2,
    name: "Laptop",
    img: "/computer.jpg",
    brand: "Apple",
    price: 1200,
    category: "electronics",
  },
  {
    id: 3,
    name: "Sunglasses",
    img: "/sunglass.jpg",
    brand: "Ray-Ban",
    price: 50,
    category: "accessories",
  },
  {
    id: 4,
    name: "Cushion",
    img: "/cushion.jpg",
    brand: "Ikea",
    price: 15,
    category: "home-living",
  },
];

const categories = [
  { id: "clothing", label: "Clothing" },
  { id: "electronics", label: "Electronics" },
  { id: "accessories", label: "Accessories" },
  { id: "home-living", label: "Home & Living" },
];

export default function DealsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex gap-4 mb-6">
        {categories.map((cate) => (
          <button
            key={cate.id}
            onClick={() => setSelectedCategory(cate.id)}
            className={`px-4 py-2 rounded-md border cursor-pointer ${
              selectedCategory === cate.id ? "bg-blue-600 text-white " : ""
            }`}
          >
            {cate.label}
          </button>
        ))}
        <button
          onClick={() => setSelectedCategory(null)}
          className="px-4 py-2 rounded-md border"
        >
          All
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 cursor-pointer">
        {filteredProducts.map((product) => (
          <FlipCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
