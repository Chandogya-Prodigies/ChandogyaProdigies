"use client";

import { useState } from "react";

export default function CourseSection() {
  const [activeTab, setActiveTab] = useState("baby");

  const products = [
    {
      image: "/star.png",
      title: "Baby Girls Sleepsuit Set",
      price: 399,
      oldPrice: 999,
      type: "baby",
    },
    {
      image: "/courseimg1.webp",
      title: "Infant Boys Tie & Dye Set",
      price: 1079,
      oldPrice: 1799,
      type: "baby",
    },
    {
      image: "/courseimg2.webp",
      title: "Boys Play Printed Tee",
      price: 279,
      oldPrice: 699,
      type: "kids",
    },
    {
      image: "/courseimg1.webp",
      title: "Boys Color Block Jacket",
      price: 389,
      oldPrice: 1299,
      type: "kids",
    },
  ];

  const filteredProducts = products.filter((item) => item.type === activeTab);

  return (
    <section className="bg-[#f5f2ee] py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl text-gray-700">Loved by mammas and papas</h2>

          {/* Filter Tabs */}
          <div className="flex gap-6 text-lg">
            <button
              onClick={() => setActiveTab("baby")}
              className={`relative pb-2 ${
                activeTab === "baby"
                  ? "text-black font-semibold"
                  : "text-gray-400"
              }`}
            >
              Baby
              {activeTab === "baby" && (
                <span className="absolute bottom-0 left-0 w-full h-0.75 bg-pink-300 rounded"></span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("kids")}
              className={`relative pb-2 ${
                activeTab === "kids"
                  ? "text-black font-semibold"
                  : "text-gray-400"
              }`}
            >
              Kids
              {activeTab === "kids" && (
                <span className="absolute bottom-0 left-0 w-full h-0.75 bg-pink-300 rounded"></span>
              )}
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-10">
          {filteredProducts.map((item, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="bg-gray-100 rounded-md overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full object-cover group-hover:scale-105 transition"
                />
              </div>

              <div className="mt-3 space-y-1">
                <h3 className="text-sm font-medium text-gray-800">
                  {item.title}
                </h3>

                <div className="flex items-center gap-2 text-sm">
                  <span className="font-semibold">₹{item.price}</span>

                  <span className="line-through text-gray-400">
                    ₹{item.oldPrice}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-12">
          <button className="bg-pink-200 px-10 py-3 rounded-full text-sm font-medium hover:bg-pink-300 transition">
            Shop All
          </button>
        </div>
      </div>
    </section>
  );
}
