"use client";

import React, { useState, useEffect } from "react";
import { Oval } from "react-loader-spinner";
import Book from "./Book";
import Select from "react-select";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [searchText, setSearchText] = useState(
    localStorage.getItem("searchText") || ""
  );
  const [searchCategory, setSearchCategory] = useState(
    localStorage.getItem("searchCategory") || "All"
  );
  const [selectedOption, setSelectedOption] = useState(
    localStorage.getItem("selectedOption")
      ? JSON.parse(localStorage.getItem("selectedOption"))
      : null
  );

  // console.log(searchParams);
  const options = [
    { value: "All", label: "All" },
    { value: "Fiction", label: "Fiction" },
    { value: "Dystopian Fiction", label: "Dystopian Fiction" },
    { value: "Fantasy Fiction", label: "Fantasy Fiction" },
    { value: "Romance Fiction", label: "Romance Fiction" },
    { value: "Adventure Fiction", label: "Adventure Fiction" },
    { value: "Modernist Fiction", label: "Modernist Fiction" },
    { value: "Thriller", label: "Thriller" },
  ];

  useEffect(() => {
    localStorage.setItem("searchText", searchText);
    localStorage.setItem("searchCategory", searchCategory);
    localStorage.setItem("selectedOption", JSON.stringify(selectedOption));
  }, [searchText, searchCategory, selectedOption]);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setSearchCategory(selectedOption?.value || "");
  };

  const {
    data: booksData,
    error,
    isPending,
  } = useQuery({
    queryKey: ["books"],
    queryFn: () =>
      fetch("https://fb62798f911e4676bb8bc2742a7f2b5a.api.mockbin.io/").then(
        (res) => res.json()
      ),
    // enabled: !searchText,
  });

  let filteredBooks = [];
  // comment a books
  // if (booksData) {

  // }
  if (booksData) {
    filteredBooks = booksData.filter((book) => {
      const isCategoryMatch =
        searchCategory === "All" || book.genre === searchCategory;
      const isSearchTextMatch = Object.values(book).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchText.toLowerCase())
      );

      return isCategoryMatch && (!searchText || isSearchTextMatch);
    });
  }
  // cehcls
  // sjdsnkjd

  let booksDataForShowing = showAll
    ? filteredBooks
    : filteredBooks?.slice(0, 3);

  // Handle adding book to cart
  const handleAddToCart = (book) => {
    console.log(book);
  };

  const handleSearchMore = () => {
    setSearchText("");
    if (filteredBooks.length === 0) {
      setSearchCategory("All");
      setSelectedOption(null);
    }
  };

  // Render loading spinner while data is being fetched
  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Oval color="blue" />
      </div>
    );
  }

  if (booksDataForShowing?.length === 0) {
    return (
      <div className="text-center text-3xl font-bold">
        <h1>No Books Found</h1>
        <button onClick={handleSearchMore}>
          <Link
            className="text-white font-bold text-xl bg-green-800 px-2 py-1 rounded-md my-6"
            href="/"
          >
            Search More
          </Link>
        </button>
      </div>
    );
  }

  return (
    <div className="w-full  sm:max-w-6xl md:max-w-8xl mx-auto sm:p-4 my-8 ">
      <div className="w-full   ">
        <form className="w-full p-4 flex flex-col sm:flex-row  gap-6 items-center">
          <input
            type="text"
            className="w-full  sm:w-1/2 border-2 border-slate-100 py-2 sm:px-4  rounded-md focus:outline-none"
            placeholder="Search by title..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <div>
            <Select
              className="w-[290px] sm:w-[400px]"
              value={selectedOption}
              onChange={handleChange}
              options={options}
              isSearchable
              filterOption={(option, inputValue) =>
                option.label.toLowerCase().includes(inputValue.toLowerCase())
              }
            />
          </div>
        </form>
      </div>
      <h1 className="text-center my-12 font-semibold text-4xl text-slate-600 underline ">
        Books
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {booksDataForShowing?.map((book) => (
          <Book key={book.isbn} book={book} handleAddToCart={handleAddToCart} />
        ))}
      </div>
      <div className="flex items-center justify-center my-4">
        <button
          onClick={() => setShowAll(!showAll)}
          className={`bg-blue-600 text-white font-medium px-2 py-1 rounded-md border-none ${
            booksDataForShowing.length < 3 && "hidden"
          } `}
        >
          {showAll ? "Show Less" : booksData?.length > 3 ? "Show All" : ""}
        </button>
      </div>
    </div>
  );
}
