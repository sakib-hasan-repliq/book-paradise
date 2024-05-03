import Link from "next/link";
import React, { useEffect, Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import AOS from "aos";
import "aos/dist/aos.css";
import AddToCartForm from "@/components/AddToCartForm";
export default function Book({ book, handleAddToCart }) {
  const { title, author, price, genre, pages, image_url, isbn } = book;
  if (!title || !author || !price || !genre || !pages || !image_url || !isbn) {
    return <Skeleton count={10} height={300} />;
  }
  useEffect(() => {
    AOS.init({});
  }, []);
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };
  return (
    <div
      data-aos="fade-up"
      className=" relative flex flex-col bg-slate-100 p-2 mx-auto w-3/4 sm:w-full shadow-2xl  shadow-slate-300 rounded-lg "
    >
      <div className="sm:w-full flex-grow p-2">
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
          Pages <span className="text-slate-700 font-bold">{pages}</span>
        </p>
        <p className="ml-12 my-2 text-teal-800 font-bold text-xl">${price}</p>
        <div className="sm:ml-12 flex items-center justify-between">
          <button
            onClick={() => {
              handleAddToCart(book);
              openModal();
            }}
            className="bg-blue-500 text-white px-2 py-1 rounded-md   hover:bg-blue-600 font-bold"
          >
            Add to Cart
          </button>
          <Link
            className="rounded-md bg-green-800 px-2 py-1  mr-2 hover:border-green-500 font-semibold text-slate-50"
            href={`/books/${isbn}`}
          >
            Details
          </Link>
        </div>
      </div>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" onClose={setIsOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-0 flex items-center justify-center">
              <div className="bg-white p-4 rounded-md">
                <AddToCartForm closeModal={closeModal} book={book} />
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
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
