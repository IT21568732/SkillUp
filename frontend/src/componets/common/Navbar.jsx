import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar(){
  const navigate = useNavigate();

  const handleSignOut = () => {
   // Clear any stored authentication tokens or user data from local storage
   localStorage.clear();
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  // Redirect the user to the login page or any other desired page
  navigate('/');
  };

  return(

    <div className="font-poppins">
      <div className="w-10/12 mx-auto flex flex-row  justify-between items-center">

          
      <a href="/learner/learnerHome" className="mt-3  md:mt-5  flex text-4xl font-bold text-blue-500 underline ">SkillUP</a>
          

        <div className="text-blue-500 text-lg relative flex font-semibold">

          <div className="hidden sm:flex  flex-row items-center space-x-4">
            <Link to="/learner/learnerHome">
              <p className="hover:text-blue-600 hover:font-bold hover:text-2xl transiton-all duration-200 ease-in">Home</p>
            </Link>

            <Link to="./earth">
              <p className="hover:text-blue-600 hover:font-bold hover:text-2xl transiton-all duration-200 ease-in">####</p>
            </Link>

            <Link to="./neo">
              <p className="hover:text-blue-600 hover:font-bold hover:text-2xl transiton-all duration-200 ease-in">####</p>
            </Link>

            <Link to="./potd">
              <p className="hover:text-blue-600 hover:font-bold hover:text-2xl transiton-all duration-200 ease-in">####</p>
            </Link>

            <Link to="./patents">
              <p className="hover:text-blue-600 hover:font-bold hover:text-2xl transiton-all duration-200 ease-in">My Profile</p>
            </Link>
            <div className=" pl-10">            
              <button className="-mr-10 hidden sm:block px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-base" onClick={handleSignOut}>Sign out</button>
            </div>
          </div>          
          </div>
      </div>      
    </div>   


  );
}