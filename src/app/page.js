"use client";

import Banner from "@/components/Banner";
import React, { useEffect, useState } from "react";
import Books from "./books/page";

export default function Home() {
  const cartItems = JSON.parse(localStorage.getItem("book-cart")) || [];
  const [cartCount, setCartCount] = useState(cartItems.length);

  useEffect(() => {
    setCartCount(cartItems.length);
  }, [cartItems, cartCount]);
  return (
    <div className="w-full  sm:max-w-6xl md:max-w-8xl sm:mx-auto sm:p-4 ">
      <Banner />
      {/* Books card */}

      <Books />
    </div>
  );
}
