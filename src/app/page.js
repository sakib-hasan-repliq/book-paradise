import Banner from "@/components/Banner";
import React from "react";
import Books from "./books/page";

export default function Home() {
  return (
    <div className="w-full sm:max-w-6xl md:max-w-8xl mx-auto sm:p-4 ">
      <Banner />
      {/* Books card */}

      <Books />
    </div>
  );
}
