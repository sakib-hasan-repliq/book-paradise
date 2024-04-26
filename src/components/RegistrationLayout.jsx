"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RegistrationLayout({ children }) {
  const pathName = usePathname();
  //   console.log(pathName);
  return (
    <div className="max-w-xl mx-auto my-4 text-xl shadow-lg shadow-slate-500 rounded-lg  font-bold  p-8 text-slate-600 flex gap-2 text-center items-center justify-center">
      <Link
        className={`${
          pathName === "/login"
            ? "text-2xl bg-blue-500 text-white px-2 py-1 rounded-lg"
            : ""
        }`}
        href="/login"
      >
        Login
      </Link>
      <div className="h-6 w-1 bg-slate-900"></div>

      <Link
        className={`${
          pathName === "/sign-up"
            ? "text-2xl bg-blue-500 text-white px-2 py-1 rounded-lg"
            : ""
        }`}
        href="/sign-up"
      >
        signup
      </Link>
      {children}
    </div>
  );
}
