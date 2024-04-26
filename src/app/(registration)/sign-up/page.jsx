"use client";

import RegistrationLayout from "@/components/RegistrationLayout";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
export default function SignUp() {
  const [loading, setLoading] = useState(false);

  const initialValues = {
    userName: "",
    userAge: 1,
    userEmail: "",
    userPassword: "",
  };

  const validationSchema = Yup.object().shape({
    userName: Yup.string().required("Name is required"),
    userAge: Yup.number().required("Age is required"),
    userEmail: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    userPassword: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });
  const handleSubmit = (values, { setSubmitting }) => {
    // console.log(setSubmitting)
    setLoading(true);
    // console.log(loading);
    setTimeout(() => {
      try {
        setSubmitting(true);
        const existingData = localStorage.getItem("users");
        const data = existingData ? JSON.parse(existingData) : [];
        if (data.length !== 0) {
          const userEmailCheck = data[data.length - 1].userEmail;
          if (userEmailCheck === values.userEmail) {
            toast.error("Email already exists");
            setSubmitting(false);
            return;
          }
        }
        data.push(values);
        localStorage.setItem("users", JSON.stringify(data));
        toast.success("Registration successful");

        setSubmitting(false);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setSubmitting(false);
        setLoading(false);
      }
    }, 2000);
    // clearTimeout(timeOut);
  };
  return (
    <div className="w-full sm:max-w-6xl md:max-w-8xl mx-auto sm:p-4">
      <RegistrationLayout />
      <div className="max-w-xl mx-auto">
        <h2 className="text-slate-600 text-xl font-semibold text-center">
          Please Sign Up
        </h2>
        <div className="max-w-xl mx-auto p-4 bg-white rounded-md shadow-lg">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label htmlFor="userName" className="block mb-1">
                    Username
                  </label>
                  <Field
                    type="text"
                    name="userName"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="userName"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="userAge" className="block mb-1">
                    Age
                  </label>
                  <Field
                    type="number"
                    name="userAge"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="userAge"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
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
                  {loading ? "loading..." : "Signup"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
