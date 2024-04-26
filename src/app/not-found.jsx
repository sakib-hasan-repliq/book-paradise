"use client";

import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="flex items-center flex-col justify-center min-h-screen text-4xl font-bold text-red-600 text-center">
      <h1>Something went Wrong ! Please Try Again</h1>
      <Link
        className="bg-green-700 text-xl rounded-md px-4 py-1 border-none mt-5 text-white hover:bg-green-500 transition-colors duration-300"
        href={"/"}
      >
        go Home
      </Link>
    </div>
  );
}
