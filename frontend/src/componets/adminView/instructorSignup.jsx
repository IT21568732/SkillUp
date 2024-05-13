import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function InstructorSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const [role, setRole] = useState("");
  const [mobile, setMobile] = useState("");
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
        toast.success("Member created successfully!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            navigate("/admin/adminDashboard");
          }, 3300);
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
          href="/admin/adminDashboard"
          className="mt-3 ml-12 md:mt-5 md:ml-4 flex text-4xl font-bold "
        >
         Back
        </a>        
      </div>
       <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-2xl md:max-w-md mt-20 mb-10 lg:mt-24 lg:mb-12 ml-2 mr-2 ">
        <h1 className="mb-4 text-4xl font-bold text-center ">Add new Member</h1>
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
              <option value="INSTRUCTOR" >Course Instructor</option>
              <option value="ADMIN">Admin</option>
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
           Add Member
          </button>        
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
