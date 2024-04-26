"use client";
import Image from "next/image";
import React from "react";

export default function Banner() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center  bg-gray-100 mb-6 p-4">
      {/* Image Section */}
      <div className="w-full  relative  p-2">
        <div className="rounded-md flex flex-col items-center ">
          <img
            src="https://assets.architecturaldigest.in/photos/624c2654cf7483eb90e638d6/4:3/w_1440,h_1080,c_limit/Books-1.jpg"
            alt="Banner Image"
            className="w-1/3 cursor-pointer h-[200px] z-40 absolute  hover:scale-110 transition-all duration-1000 top-24 right-4 object-cover rounded-md"
          />
          <img
            src="https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D"
            alt="Banner Image"
            className="w-1/2 cursor-pointer hover:border-2 hover:border-slate-100 hover:z-50  z-0 h-[300px] object-cover rounded-md transition-all duration-1000"
          />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtReU98b-aS4kOvEeEG6Hi48wybHwhXgWNMw&usqp=CAU"
            alt="Banner Image"
            className="w-1/3 h-[200px] cursor-pointer hover:scale-110 transition-all duration-1000  z-30 absolute top-22 left-12 object-cover rounded-md"
          />
        </div>
      </div>

      {/* Text Section */}
      <div className="md:w-1/2 mt-6 md:mt-0 px-4 md:px-8 text-center ">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Welcome to Our Bookstore
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Explore our vast collection of books covering various genres and
          topics. Find your next favorite read here!
        </p>
        <button className="bg-blue-500 mb-6 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors">
          Explore Books
        </button>
      </div>
    </div>
  );
}
