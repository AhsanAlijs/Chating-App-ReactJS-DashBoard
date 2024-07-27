import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import API from "../../config/api/Api";
import BG_Image from "../../assets/bg.png";

const LoginForm = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(3, "Must be at least 3 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors, resetForm }) => {
      try {
        const response = await axios.post(API.USER.LOGIN, values);
        const loginData = response.data;
        localStorage.setItem("token", loginData.token);
        localStorage.setItem("user", JSON.stringify(loginData.user));
        navigate("/adminPanel");
        resetForm();
      } catch (error) {
        if (error.response) {
          // Server responded with a status other than 200 range
          setErrors({ api: error.response.data.message || "Login failed" });
          toast.error(error.response.data.message || "Login failed");
        } else if (error.request) {
          // Request was made but no response received
          setErrors({ api: "No response from server" });
        } else {
          // Something else caused the error
          setErrors({ api: "An unknown error occurred" });
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div
      className="flex w-screen items-center justify-center h-[100vh]"
      style={{
        backgroundImage: `url(${BG_Image})`, // Use template literal to insert the imported image
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-md mx-auto p-4 shadow-lg w-full"
      >
        <div className="text-center mb-8 font-bold text-4xl">
          <span>Login</span>
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-white font-bold text-xl">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...formik.getFieldProps("email")}
            className={`mt-1 block w-full px-3 py-2 border ${
              formik.touched.email && formik.errors.email
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md shadow-sm`}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-sm">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-white font-bold text-xl"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            {...formik.getFieldProps("password")}
            className={`mt-1 block w-full px-3 py-2 border ${
              formik.touched.password && formik.errors.password
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md shadow-sm`}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          ) : null}
        </div>
        <button
          type="submit"
          className="w-full text-xl font-bold bg-[#3EC8BF] text-white py-2 px-4 rounded-md shadow-sm hover:bg-[#3EC8BF]"
        >
          Login
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;
