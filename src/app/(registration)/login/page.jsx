"use client";

import RegistrationLayout from "@/components/RegistrationLayout";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
export default function Login() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const initialValues = {
    userName: "",
    userAge: 0,
    userEmail: "",
    userPassword: "",
  };

  const handleSubmit = (values, { setSubmitting }) => {
    // console.log(values);
    setSubmitting(true);
    setLoading(true);
    setTimeout(() => {
      try {
        const existingData = JSON.parse(localStorage.getItem("users") || "[]");
        // console.log(existingData);
        const existingUser =
          existingData &&
          existingData.find((user) => user.userEmail === values.userEmail);
        // console.log(existingUser);
        if (!existingUser) {
          toast.error("No Such User Found!");
          return;
        }
        if (existingUser.userPassword !== values.userPassword) {
          toast.error("Wrong Crediantials");
          return;
        }
        sessionStorage.setItem("user", JSON.stringify(existingUser));
        toast.success("Login Successfull");
        // navigate("/");
        router.push("/");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        setSubmitting(false);
      }
    }, 2000);
  };
  return (
    <div className="w-full sm:max-w-6xl md:max-w-8xl mx-auto sm:p-4">
      <RegistrationLayout />
      <div className="max-w-xl mx-auto">
        <h2 className="text-slate-600 text-xl font-semibold text-center">
          Welcome Back
        </h2>
        <div className="max-w-xl mx-auto p-4 bg-white rounded-md shadow-lg">
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label htmlFor="userEmail" className="block mb-1">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="userEmail"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="userEmail"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="userPassword" className="block mb-1">
                    Password
                  </label>
                  <Field
                    type="password"
                    name="userPassword"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="userPassword"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                >
                  {loading ? "Loading..." : "log in"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
