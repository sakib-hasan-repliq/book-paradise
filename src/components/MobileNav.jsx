import useGetUser from "@/app/helper/useGetUser";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CiShoppingCart } from "react-icons/ci";

export default function MobileNav() {
  // console.log(sideBarOpen);
  const [cartCount, setCartCount] = useState(0);
  const userAtStorage = useGetUser();
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("book-cart")) || [];
    setCartCount(cartItems.length);
  }, [cartCount]);
  return (
    <div className=" transition-all  duration-1000 absolute w-1/3 sm:hidden left-2   flex justify-end items-center p-2 rounded-lg ">
      <div className="flex flex-col  justify-center gap-4">
        <Link className="relative" href="/checklist">
          <CiShoppingCart className="text-4xl  font-extrabold text-blue-600 " />
          <p className="absolute -top-2 bg-blue-600 text-white p-1 rounded-full text-xs font-bold left-6">
            {cartCount}
          </p>
        </Link>
        <Link href="/books">
          <p className=" text-lg font-bold text-blue-600 hover:text-blue-800 transition-colors">
            Books
          </p>
        </Link>
        <Link href="/user">
          <p className=" text-lg font-bold text-blue-600 hover:text-blue-800 transition-colors">
            Users
          </p>
        </Link>
        {userAtStorage ? (
          <Link href="/login">
            <p className=" text-lg font-bold text-blue-600 hover:text-blue-800 transition-colors">
              Logout
            </p>
          </Link>
        ) : (
          <Link href="/login">
            <p className=" text-lg font-bold text-blue-600 hover:text-blue-800 transition-colors">
              Login
            </p>
          </Link>
        )}
      </div>
    </div>
  );
}
