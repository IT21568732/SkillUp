import React, { useState, useRef ,useEffect  } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const loginFormRef = useRef(null);

 
   const handleLogin = (e) => {
    e.preventDefault();
  
    const user = {
      email,
      password
    };
  
    axios.post("http://localhost:8002/auth/login", user)
      .then((response) => {
        console.log(response);
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("userData", JSON.stringify(response.data.User));
        if (response.data.role === 'ADMIN') {
          navigate('/admindashboard');
        } else {
          navigate('/home');
        }
      })
      .catch((error) => {
        toast.error('Inputs are Incorrect', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  }

  const scrollToLoginForm = () => {
    // Scroll to the login form container
    loginFormRef.current.scrollIntoView({ behavior: "smooth" });
  };
  
  return (
    <div className="font-poppins bg-white text-blue-500">
      <div className="flex justify-center items-center h-screen ">
        <div className="flex flex-col items-start">
          <h1 className="text-blue-500 text-7xl font-semibold">Unveil Your Educational Destiny</h1>
        </div>        
      </div>
    <div ref={loginFormRef} className="flex flex-col items-center justify-center min-h-screen bg-cover " >
      <div className="absolute top-0 left-0 right-0 flex justify-between px-4 py-2">
      <a href="/" className="mt-3 ml-12 md:mt-5 md:ml-4 flex text-4xl font-bold text-blue-500 underline ">SkillUP</a>
        <div className="absolute right-0 flex justify-between px-4 py-2 space-x-4 top-4 ">
          <button className="hidden sm:block px-5 py-2 font-semibold bg-blue-500 hover:bg-blue-600 text-white rounded-lg" onClick={scrollToLoginForm}>Login</button>
          <button className="hidden sm:block px-4 py-2 font-semibold bg-blue-500 hover:bg-blue-600 text-white rounded-lg" onClick={() => window.location.href = '/register'}>Signup</button>
        </div>
      </div>
      <div className="w-full max-w-sm p-8 rounded-lg shadow-2xl md:max-w-md mt-20 mb-10 lg:mt-12 lg:mb-5 ">
        <h1 className="mb-4 text-3xl font-bold text-center md:text-4xl">Login</h1>
        <form className="space-y-4" onSubmit={handleLogin}> 
          <div>
            <label className="block mb-1 text-lg font-semibold md:text-xl" htmlFor="email">Email</label>
            <input className="w-full px-3 py-2 text-base border border-blue-300 rounded-md md:text-lg focus:outline-none focus:border-blue-500" type="email" id="email" name="email" placeholder="Enter your email" 
            onChange={(e)=>{
              setEmail(e.target.value);
            }}/>
          </div>
          <div>
            <label className="block mb-1 text-lg font-semibold md:text-xl" htmlFor="password">Password</label>
            <input className="w-full px-3 py-2 text-base border border-blue-300 rounded-md md:text-lg focus:outline-none focus:border-blue-500" type="password" id="password" name="password" placeholder="Enter your password" 
            onChange={(e)=>{
              setPassword(e.target.value);
            }}/>
          </div>
          <button type="submit" className="w-full px-2 py-2 text-lg text-white font-bold transition duration-300 bg-blue-500 hover:bg-blue-600 rounded-md md:text-xl ">Login</button>
  
          <div className="mt-4 text-center ">
            <span className="block mb-2">Don’t have an account?</span>
            <a href="/register" className="thover:underline">Signup here</a>
          </div>
        </form>
      </div>
      <ToastContainer/>
    </div>
    </div>
  );
  
}