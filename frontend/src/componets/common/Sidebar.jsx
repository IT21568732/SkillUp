import React from "react";
import logo from "../../../public/SkillUP.png";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { Link } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  // Decode the JWT token
  const token = localStorage.getItem("authToken");
  let userEmail = "";
  if (token) {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    userEmail = decodedToken.userEmail; // Assuming the email is stored in the JWT token
  }

  return (
    <div className=" w-1/5 bg-gray-200 p-4 h-screen">
      <div className="font-bold text-5xl mb-12 w-full flex items-center justify-center">
        Skill<span className=" text-cyan-400">UP</span>
      </div>
      <div className="text-center font-bold ">
        <span className=" text-red-500">Logged in as:</span> {userEmail}
      </div>
      <ul className=" flex flex-col justify-between h-4/6  mt-10">
        <div>
          <li className=" mb-12">
            <Link
              to="/instructor/courses"
              className="font-bold text-m text-blue-500 bg-white px-16 py-4 rounded-2xl hover:bg-blue-500 hover:text-white"
            >
              My Courses
            </Link>
          </li>
          <li className="">
            <Link
              to="/instructor/create_course"
              className="font-bold text-m text-blue-500 bg-white px-16 py-4 rounded-2xl hover:bg-blue-500 hover:text-white"
            >
              Create Course
            </Link>
          </li>
        </div>
        <div>
          <li>
            <button
              onClick={handleLogout}
              className="font-bold text-m text-red-500 bg-white px-16 py-4 rounded-2xl hover:bg-red-500 hover:text-white "
            >
              Logout
            </button>
          </li>
        </div>
      </ul>
    </div>
  );
}

export default Sidebar;
