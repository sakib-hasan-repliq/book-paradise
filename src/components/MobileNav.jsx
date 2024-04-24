import Link from "next/link";
import React from "react";

export default function MobileNav() {
  // console.log(sideBarOpen);

  return (
    <div className="bg-slate-100  transition-all duration-1000 absolute w-1/3 sm:hidden right-0   flex justify-end items-center p-4 rounded-lg ">
      <div className="flex flex-col justify-end gap-4  ">
        <Link href="/book">
          <p className=" text-lg font-bold text-blue-600 hover:text-blue-800 transition-colors">
            Books
          </p>
        </Link>
        <Link href="/user">
          <p className=" text-lg font-bold text-blue-600 hover:text-blue-800 transition-colors">
            user
          </p>
        </Link>
        <Link href="/login">
          <p className=" text-lg font-bold text-blue-600 hover:text-blue-800 transition-colors">
            Login
          </p>
        </Link>
      </div>
    </div>
  );
}
