import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import AIChat from "../components/AIChat";

const products = [
  {
    id: 1,
    name: "Airpods Pro",
    image:
      "https://images.unsplash.com/photo-1588423019284-47bb3ef04a18?q=80&w=600&auto=format&fit=crop",
    price: "$249.00",
  },
  {
    id: 2,
    name: "Kawaii Plushie",
    image:
      "https://images.unsplash.com/photo-1559449182-26361a3529a6?q=80&w=600&auto=format&fit=crop",
    price: "$24.99",
  },
  {
    id: 3,
    name: "Portable Mini Fan",
    image:
      "https://images.unsplash.com/photo-1619362224246-7d683958f623?q=80&w=600&auto=format&fit=crop",
    price: "$15.50",
  },
  {
    id: 4,
    name: "Speed Runners",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop",
    price: "$120.00",
  },
  {
    id: 5,
    name: "Cotton Q-Tips",
    image:
      "https://images.unsplash.com/photo-1563453392212-326f5e854473?q=80&w=600&auto=format&fit=crop",
    price: "$4.99",
  },
  {
    id: 6,
    name: "Cozy Wool Socks",
    image:
      "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?q=80&w=600&auto=format&fit=crop",
    price: "$9.99",
  },
  {
    id: 7,
    name: "Educational Baby Toy",
    image:
      "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?q=80&w=600&auto=format&fit=crop",
    price: "$35.00",
  },
  {
    id: 8,
    name: "Acai Berry Bowl",
    image:
      "https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=600&auto=format&fit=crop",
    price: "$12.99",
  },
  {
    id: 9,
    name: "Smart Watch Series 9",
    image:
      "https://images.unsplash.com/photo-1544117518-30df57809ca7?q=80&w=600&auto=format&fit=crop",
    price: "$399.00",
  },
  {
    id: 10,
    name: "Mechanical Keyboard",
    image:
      "https://images.unsplash.com/photo-1618384881928-bbcd7411bc36?q=80&w=600&auto=format&fit=crop",
    price: "$189.00",
  },
  {
    id: 11,
    name: "Steel Water Bottle",
    image:
      "https://images.unsplash.com/photo-1602143303410-7199d123ad16?q=80&w=600&auto=format&fit=crop",
    price: "$29.00",
  },
  {
    id: 12,
    name: "Classic Sunglasses",
    image:
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=600&auto=format&fit=crop",
    price: "$145.00",
  },
];

function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Top Header */}
      <header className="bg-[#248b7c] text-white px-6 py-4 flex items-center justify-between">
        <div className="text-xl font-bold">MyShop</div>

        <div className="flex w-1/2">
          <select className="bg-gray-200 text-black px-2 rounded-l-md outline-none">
            <option>All</option>
          </select>
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 outline-none text-black bg-[#BFE7ED]"
          />
          <button className="bg-white  text-black px-4 rounded-r-md">
            <FaSearch />
          </button>
        </div>

        <div className="hidden md:flex gap-6 text-sm">
          <Link to="/login">Account</Link>
          <span>Orders</span>
          <span>Cart</span>
        </div>
      </header>

      {/* Category Bar */}
      <div className="bg-black text-white px-6 py-2 flex gap-6 text-sm overflow-x-auto">
        <span>Today's Deals</span>
        <span>Prime Video</span>
        <span>Registry</span>
        <span>Gift Cards</span>
        <span>Customer Service</span>
        <span>Sell</span>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition duration-300"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-40 w-full object-contain mb-4"
            />
            <h3 className="text-center font-medium mt-2">{product.name}</h3>
            <p className="text-center text-[#248b7c] font-bold">
              {product.price}
            </p>
          </div>
        ))}
      </div>
      <AIChat />
    </div>
  );
}

export default Home;
