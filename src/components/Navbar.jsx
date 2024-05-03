"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { RiMenu3Line } from "react-icons/ri";
import { ImCross } from "react-icons/im";
import MobileNav from "./MobileNav";
import useGetUser from "@/app/helper/useGetUser";
import handleLogOut from "@/app/helper/userLogOut";
import { CiShoppingCart } from "react-icons/ci";
import { usePathname } from "next/navigation";
export default function Navbar() {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const userAtStorage = useGetUser();

  const pathName = usePathname();

  // console.log(user);
  const handleSideBar = () => {
    setSideBarOpen(!sideBarOpen);
  };
  const cartItems = JSON.parse(localStorage.getItem("book-cart")) || [];
  const [cartCount, setCartCount] = useState(cartItems.length);

  useEffect(() => {
    setCartCount(cartItems.length);
  }, [cartItems, cartCount]);
  return (
    <div className="w-full">
      <nav
        className={`relative bg-gray-100 py-4 rounded-md px-6 flex items-center justify-between  transition-all duration-1000 `}
      >
        <div className="w-full sm:max-w-4xl md:max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/">
            <p className="flex items-center gap-1 text-lg font-bold text-blue-600 hover:text-blue-800 transition-colors">
              <span className="text-2xl">📚</span>
              Book Store
            </p>
          </Link>
        </div>
        {!sideBarOpen ? (
          <RiMenu3Line
            onClick={handleSideBar}
            className="text-4xl sm:hidden block cursor-pointer hover:bg-slate-200 hover:p-1 rounded-full transition-all duration-500"
          />
        ) : (
          <div>
            <ImCross
              onClick={handleSideBar}
              className="text-4xl  sm:hidden block cursor-pointer hover:bg-slate-200 hover:p-1 rounded-full transition-all duration-500"
            />
          </div>
        )}

        <div className="hidden sm:flex items-center gap-4 ">
          <Link
            className={`relative ${
              pathName === "/checklist" ? "border-b-2 border-blue-400" : ""
            }`}
            href="/checklist"
          >
            <CiShoppingCart className="text-4xl  font-extrabold text-blue-600 " />
            <p className="absolute -top-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-bold left-6">
              {cartCount}
            </p>
          </Link>
          <Link
            className={` ${
              pathName === "/books" ? "border-b-2 border-blue-400" : ""
            }`}
            href="/books"
          >
            <p className=" text-lg font-bold text-blue-600 hover:text-blue-800 transition-colors">
              Books
            </p>
          </Link>
          <Link
            href="/users"
            className={` ${
              pathName === "/users" ? "border-b-2 border-blue-400" : ""
            }`}
          >
            <p className=" text-lg font-bold text-blue-600 hover:text-blue-800 transition-colors">
              Users
            </p>
          </Link>
          {userAtStorage ? (
            <button onClick={handleLogOut}>
              <Link href="/">
                <p className=" text-lg font-bold text-blue-600 hover:text-blue-800 transition-colors">
                  Logout
                </p>
              </Link>
            </button>
          ) : (
            <Link
              className={` ${
                pathName === "/login" ? "border-b-2 border-blue-400" : ""
              }`}
              href="/login"
            >
              <p className=" text-lg font-bold text-blue-600 hover:text-blue-800 transition-colors">
                Login
              </p>
            </Link>
          )}
        </div>
        <div
          className={`sm:hidden fixed top-16 shadow-lg shadow-slate-300 right-0 h-full bg-gray-100 w-40 z-50 transition-transform duration-1000 transform ${
            sideBarOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <MobileNav />
        </div>
      </nav>
    </div>
  );
}
