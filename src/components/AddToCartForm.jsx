import React, { useState } from "react";
import { toast } from "react-toastify";

export default function AddToCartForm({ closeModal, book }) {
  const [loading, setLoading] = useState(false);

  const userLoggedEmail = JSON.parse(sessionStorage.getItem("user"));
  const [formData, setFormData] = useState({
    quantity: Number(1),
    bookPrice: book?.price,
    email: userLoggedEmail?.userEmail || "",
    password: "",
    bookName: book?.title,
    _id: book?.isbn,
    image: book?.image_url,
  });

  //   console.log(book);
  let bookPrice = book?.price * formData.quantity;
  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === "quantity" ? Number(value) : value;
    setFormData({ ...formData, [name]: parsedValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const alreadyExist = localStorage.getItem("book-cart");
    const data = alreadyExist ? JSON.parse(alreadyExist) : [];
    if (userLoggedEmail) {
      data.push(formData);
      localStorage.setItem("book-cart", JSON.stringify(data));
      setLoading(false);
      toast.success("Book added to cart");
      closeModal();
      return;
    }
    const { email, password } = formData;
    const existingData = JSON.parse(localStorage.getItem("users") || "[]");
    const existingUser =
      existingData && existingData.find((user) => user.userEmail === email);
    if (!existingUser) {
      toast.error("No Such User Found!");
      return;
    }
    if (existingUser.userPassword !== password) {
      toast.error("Wrong Crediantials");
      return;
    }
    sessionStorage.setItem("user", JSON.stringify(existingUser));
    data.push(formData);
    localStorage.setItem("book-cart", JSON.stringify(data));
    toast.success("Book added to cart");
    closeModal();
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center max-w-xl mx-auto p-4">
      <h2 className="text-lg font-semibold mb-4">Add to Cart</h2>
      <p className="text-lg font-semibold mb-4">{formData?.bookName}</p>

      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-4">
          <label htmlFor="quantity" className="block mb-2 font-medium">
            Quantity:
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            max="10"
            defaultValue="1"
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="size" className="block mb-2 font-medium">
            Price:
          </label>
          <p>{bookPrice}</p>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 font-medium">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData?.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        {!userLoggedEmail?.userEmail && (
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block mb-2 font-medium">
              password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
        )}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={closeModal}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            {loading ? "Loading..." : "Confirm"}
          </button>
        </div>
      </form>
    </div>
  );
}
