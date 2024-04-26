"use client";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Oval } from "react-loader-spinner";
import Book from "./Book";
import Select from "react-select";
import Link from "next/link";
export default function Books() {
  const [books, setBooks] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [searchText, setSearchText] = useState("");
  const options = [
    { value: "Fiction", label: "Ficton" },
    { value: "Dystopian Fiction", label: "Dystopian Fiction" },
    { value: "Fantasy Fiction", label: "Fantasy Fiction" },
    { value: "Romance Fiction", label: "Romance Fiction" },
    { value: "Adventure Fiction", label: "Adventure Fiction" },
    { value: "Modernist Fiction", label: "Modernist Fiction" },
    { value: "Thriller", label: "Thriller" },
  ];
  const [selectedOption, setSelectedOption] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
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

  //   console.log(booksData);
  //   #TODO letter

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Oval color="blue" />
      </div>
    );
  }
  // react selector

  let filteredBooks = selectedOption
    ? booksData?.filter((book) => book.genre === selectedOption.value)
    : booksData;

  if (searchText) {
    filteredBooks = filteredBooks.filter((book) =>
      Object.values(book).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }
  let booksDataForShowing = showAll
    ? filteredBooks
    : filteredBooks?.slice(0, 3);

  const handleShowAll = () => {
    setShowAll(!showAll);
  };
  if (booksDataForShowing.length === 0) {
    return (
      <div className="text-center text-3xl font-bold">
        <h1>No Books Found</h1>
        <Link
          className="text-white font-bold text-xl bg-green-800 px-2 py-1 rounded-md my-6"
          href="/"
        >
          Search More
        </Link>
      </div>
    );
  }
  return (
    <div className="w-full sm:max-w-6xl md:max-w-8xl mx-auto sm:p-4 my-8 ">
      <div className="w-full   ">
        <form className="w-full flex flex-col sm:flex-row  gap-6 items-center">
          <input
            type="text"
            className="w-1/2 border-2 border-slate-100 py-2 px-4  rounded-md focus:outline-none"
            placeholder="Search by title..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <div>
            <Select
              className="w-[400px]"
              value={selectedOption}
              onChange={handleChange}
              options={options}
              isSearchable // Enable search functionality
              filterOption={(option, inputValue) =>
                option.label.toLowerCase().includes(inputValue.toLowerCase())
              }
            />
          </div>
        </form>
      </div>
      <h1 className="text-center font-semibold text-4xl text-slate-600 underline ">
        Books
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {booksDataForShowing?.length > 0 &&
          booksDataForShowing?.map((book) => (
            <Book key={book.isbn} book={book} />
          ))}
      </div>
      <div className="flex items-center justify-center my-4">
        <button
          onClick={handleShowAll}
          className="bg-blue-600 text-white font-medium px-2 py-1 rounded-md border-none"
        >
          {showAll ? "Show Less" : booksData?.length > 3 ? "Show All" : ""}
        </button>
      </div>
    </div>
  );
}
