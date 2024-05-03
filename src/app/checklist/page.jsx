"use client";

import React, { useState } from "react";

export default function CheckOut() {
  const [addedBooks, setAddedBooks] = useState(
    JSON.parse(localStorage.getItem("book-cart"))
  );
  console.log(addedBooks);

  const price = addedBooks.reduce((acc, book) => acc + book.bookPrice, 0);
  const [totalPrice, setTotalPrice] = useState(Number(price).toFixed(2));
  console.log(totalPrice);
  if (!addedBooks) {
    return (
      <div className="max-w-6xl mx-auto p-4 text-center text-4xl">
        No books added
      </div>
    );
  }
  return (
    <div className=" w-full sm:max-w-6xl  mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Checkout</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 text-center">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b">
                No
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider border-b">
                Price
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {addedBooks.map((book, index) => (
              <tr key={index} className="hover:bg-gray-100 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap border-b">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b">
                  {book.bookName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b">
                  <img
                    src={book.image}
                    alt={book.bookName}
                    className="w-16 h-16 rounded-full"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b">
                  {book.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b">
                  ${book.bookPrice}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">Total: ${totalPrice}</h2>
      </div>
    </div>
  );
}
