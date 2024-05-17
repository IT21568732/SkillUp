import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8002/auth/register", {
        name,
        email,
        password,
        mobile,
        role,
      })
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data && err.response.data.error) {
          // Set error message if response contains error message
          toast.error(err.response.data.error, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.error(err.response.data.error);
        }
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover text-blue-500">
      <div className="absolute top-0 left-0 right-0 flex justify-between px-4 py-2">
        <a
          href="/"
          className="mt-3 ml-12 md:mt-5 md:ml-4 flex text-4xl font-bold underline"
        >
          SkillUP
        </a>
        <div className="absolute right-0 flex justify-between px-4 py-2 space-x-4 top-4">
          <button
            className=" sm:block px-5 py-2 font-semibold bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
            onClick={() => (window.location.href = "/")}
          >
            Login
          </button>
          <button
            className=" sm:block px-4 py-2 font-semibold bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
            onClick={() => (window.location.href = "/register")}
          >
            Signup
          </button>
        </div>
      </div>
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-2xl md:max-w-md mt-20 mb-10 lg:mt-24 lg:mb-12 ml-2 mr-2 ">
        <h1 className="mb-4 text-4xl font-bold text-center ">Sign up</h1>
        <form className="space-y-4 " onSubmit={handleSubmit}>
          <div>
            <label
              className="block mb-1 text-xl font-semibold"
              htmlFor="fullname"
            >
              Fullname
            </label>
            <input
              className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:border-blue-500"
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Enter your fullname"
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-xl font-semibold" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:border-blue-500"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
          </div>
          <div>
            <label
              className="block mb-1 text-xl font-semibold"
              htmlFor="mobile"
            >
              Mobile No.
            </label>
            <input
              className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:border-blue-500"
              type="text"
              id="mobile"
              name="mobile"
              placeholder="Enter your mobile"
              onChange={(e) => {
                setMobile(e.target.value);
              }}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-xl font-semibold" htmlFor="role">
              Role
            </label>
            <select
              className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:border-blue-500"
              id="role"
              name="role"
              onChange={(e) => {
                setRole(e.target.value);
              }}
              required
            >
              <option value="">Select a role</option>
              <option value="LEARNER">Learner</option>
              <option value="INSTRUCTOR">Course Instructor</option>
            </select>
          </div>

          <div>
            <label
              className="block mb-1 text-xl font-semibold"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:border-blue-500"
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full px-2 py-2 text-lg text-white font-bold transition duration-300 bg-blue-500 hover:bg-blue-600 rounded-md md:text-xl "
          >
            Sign up
          </button>

          <div className="mt-4 text-center">
            <span className="block mb-2">If you already have an account?</span>
            <a href="/" className=" hover:underline">
              Login here
            </a>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
