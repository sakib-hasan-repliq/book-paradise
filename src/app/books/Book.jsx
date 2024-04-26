import Link from "next/link";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Book({ book }) {
  const { title, author, price, genre, pages, image_url, isbn } = book;
  if (!title || !author || !price || !genre || !pages || !image_url || !isbn) {
    return <Skeleton count={10} height={300} />;
  }
  return (
    <div className="relative bg-slate-100  w-2/3 mx-auto sm:w-full shadow-2xl p-2 shadow-slate-300 rounded-lg ">
      <div className="sm:w-full p-2">
        <img
          src={image_url}
          alt="image"
          className="w-[300px] sm:[w-200px] cursor-pointer hover:scale-110 transition-all duration-500 rounded-lg mx-auto h-[200px] sm:h-[250px] py-2 px-6 sm:px-8 "
        />
        <h1 className="text-center font-bold text-xl mt-4 text-slate-700 ">
          {title}
        </h1>
      </div>
      <div>
        <p className="bg-blue-400 w-[100px]  text-slate-100 text-center  absolute top-2 left-1   py-2 rounded-md text-xs font-semibold mt-2">
          {genre}
        </p>
        <p className="ml-12">
          {" "}
          pages <span className="text-slate-700 font-bold">{pages}</span>
        </p>
        <p className="ml-12 my-2 text-teal-800 font-bold text-xl">${price}</p>
        <div className="sm:ml-12 flex items-center justify-between">
          <button className="bg-white px-2 py-1 rounded-md border-2 border-teal-600  hover:bg-slate-50 font-bold">
            Add to Cart
          </button>
          <Link
            className=" border-2 rounded-md px-2 py-1 border-blue-600 mr-2 hover:border-blue-500 font-semibold text-slate-600"
            href={`/books/${isbn}`}
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}

/* 

"title": "To Kill a Mockingbird",
    "author": "Harper Lee",
    "isbn": "9780061120084",
    "price": 10.99,
    "genre": "Fiction",
    "publisher": "Harper Perennial Modern Classics",
    "publication_date": "July 5, 2005",
    "pages": 336,
    "language": "English",
    "summary": "To Kill a Mockingbird is a novel by Harper Lee published in 1960. It is set in the Deep South and is a coming-of-age story featuring a young girl named Scout Finch and her father, lawyer Atticus Finch, who defends a black man accused of raping a white woman.",
    "funny_fact": "Harper Lee's father, Amasa Coleman Lee, was also a lawyer, and he served as a model for the character of Atticus Finch.",
    "image_url": 

*/
