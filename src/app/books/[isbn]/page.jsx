"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { Oval } from "react-loader-spinner";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";

export default function BookDetails({ params }) {
  //   console.log(params.isbn);

  const [book, setBooks] = useState({});

  const {
    isPending,
    error,
    data: books,
  } = useQuery({
    queryKey: ["book"],
    queryFn: () =>
      fetch(`https://fb62798f911e4676bb8bc2742a7f2b5a.api.mockbin.io/`).then(
        (res) => res.json()
      ),
  });

  if (error) {
    return <div>Error</div>;
  }
  if (isPending) {
    <div className="min-h-screen flex items-center justify-center">
      <Oval color="blue" />
    </div>;
  }

  const existingBook =
    books && books?.find((book) => book.isbn === params?.isbn);

  //   const {
  //     price,
  //     genre,
  //     pubisher,
  //     publication_date,
  //     pages,
  //     language,
  //     summary,
  //     title,
  //     funny_fact,
  //     image_url,
  //   } = existingBook;
  if (!existingBook) {
    return (
      <div className="flex items-center justify-center gap-6">
        <Skeleton height={100} width={200} count={3} />
      </div>
    );
  }

  return (
    <div className="w-full sm:max-w-6xl  mx-auto my-6    sm:p-4 space-y-4 ">
      <h1 className="text-center font-bold space-y-6 text-slate-600 my-2 text-3xl">
        <span className="text-blue-500 text-4xl my-2">
          {existingBook?.title}
        </span>
      </h1>
      <div className="w-2/3 sm:w-full mx-auto  flex flex-col  sm:flex-row gap-2">
        <div className="w-full sm:max-w-2xl">
          <img
            src={existingBook?.image_url}
            alt="images"
            className="object-cover w-full min-h-screen rounded-lg shadow-lg"
          />
        </div>
        <div className="w-full sm:max-w-4xl mt-28 mx-auto space-y-12 p-4">
          <div className="flex justify-between w-full text-xs sm:text-xl   font-semibold ">
            <p className=" text-slate-500">Author</p>
            <p className="">{existingBook?.author}</p>
          </div>
          <div className="flex justify-between w-full text-xs sm:text-xl  font-semibold ">
            <p className=" text-slate-500">Genre</p>
            <p className="">{existingBook?.genre}</p>
          </div>
          <div className="flex  ml-4 sm:ml-0 justify-between w-full text-xs sm:text-xl  font-semibold ">
            <p className=" text-slate-500">Publisher</p>
            <p className="text-end w-1/3">{existingBook?.publisher}</p>
          </div>
          <div className="flex justify-between w-full text-xs sm:text-xl  font-semibold ">
            <p className=" text-slate-500">Publication Date</p>
            <p className="">{existingBook?.publication_date}</p>
          </div>
          <div className="flex justify-between w-full text-xs sm:text-xl  font-semibold ">
            <p className=" text-slate-500">Language</p>
            <p className="">{existingBook?.language}</p>
          </div>
          <div className="flex justify-between w-full text-xs sm:text-xl  font-semibold ">
            <p className=" text-slate-500">Pages</p>
            <p className="">{existingBook?.pages}</p>
          </div>
          <div className="flex justify-between w-full text-xs sm:text-xl  font-semibold ">
            <p className=" text-slate-500">Price</p>
            <p className="text-teal-400">${existingBook?.price}</p>
          </div>
        </div>
      </div>
      <div className="w-full sm:max-w-3xl mx-auto  p-2 sm:p-4">
        <h1 className="text-3xl text-center font-semibold mb-4">More</h1>

        <Tabs>
          <TabList>
            <Tab>
              <p className="text-teal-700 font-bold">summary</p>
            </Tab>
            <Tab>
              <p className="text-teal-700 font-bold">funny fact</p>
            </Tab>
          </TabList>

          <TabPanel>
            <p className="text-md font-medium text-slate-500">
              {existingBook?.summary}
            </p>
          </TabPanel>
          <TabPanel>
            <p className="text-md font-medium text-slate-500">
              {existingBook?.funny_fact}
            </p>
          </TabPanel>
        </Tabs>
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
