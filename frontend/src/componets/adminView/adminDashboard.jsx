import React, { useRef, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminDashboard() {
  const incomeRef = useRef(null);
  const approveCoursesRef = useRef(null);
  const navigate = useNavigate();

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const token = localStorage.getItem("authToken");
  let userEmail = "";
  if (token) {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    userEmail = decodedToken.userEmail; // Assuming the email is stored in the JWT token
  }

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8001/course/all_learner_courses")
      .then((response) => response.json())
      .then((data) => {
        // Filter out courses with status false
        const filteredCourses = data.data.filter((course) => course.status === false);
        setCourses(filteredCourses);
      })
      .catch((error) => console.error("Error fetching courses:", error));
  }, []);

  const handleStatusChange = (courseId) => {
    axios.put(`http://localhost:8001/course/update_status/${courseId}`, { status: true })
      .then((response) => {
        if (response.status === 200) {
            // Display success toast message
            toast.success('Course status updated successfully!', {
              position: 'top-right',
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setTimeout(() => {
                window.location.reload();
              }, 2000);
          } else {
            // Display error toast message
            toast.error('Failed to update course status', {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            console.error('Failed to update status');
          }
        })
        .catch((error) => {
          // Display error toast message
          toast.error('Error updating status', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          console.error('Error updating status:', error);
        });
    };
  
  // Helper function to display success toast message
  const showSuccessToast = (message) => {
    toast.success(message, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  
  // Helper function to display error toast message
  const showErrorToast = (message) => {
    toast.error(message, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  
  
  return (
    <div className="flex font-poppins">
      {/* Sidebar */}
      <div className="w-1/6 bg-gray-200 h-screen text-white fixed ">
        <div className="py-4 ">
          <h1 className="text-3xl font-bold text-center text-blue-500">Admin Dashboard</h1>
          <h3 className="ml-3 mt-10 text-lg font-bold text-blue-600 "> Logged in as : <span className="text-black">{userEmail}</span></h3>
          <ul className="mt-6 flex-col justify-center items-center text-center">
            <li className="cursor-pointer text-blue-500 font-bold text-xl  py-6 hover:bg-white" onClick={() => scrollToSection(incomeRef)}>
              Home
            </li>
            <li className="cursor-pointer text-blue-500 font-bold text-xl py-6 hover:bg-white" onClick={() => scrollToSection(approveCoursesRef)}>
              Approve Courses
            </li>
            <li className="cursor-pointer text-blue-500 font-bold text-xl py-6 hover:bg-white" onClick={() => (window.location.href = "./instSignup")}>
             New Admin/Instructor
            </li>
          </ul>
        </div>
        <div>          
            <button
              onClick={handleLogout}
              className="ml-12 absolute bottom-20 font-bold text-m text-blue-500 bg-white px-16 py-4 rounded-2xl hover:bg-red-500 hover:text-white "
            > 
            Logout
            </button>         
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-72 w-3/4 p-8">
        {/* Income Section */}
        <div ref={incomeRef} className="h-screen flex flex-col justify-center items-center">
          <p className="text-7xl font-bold mb-4 text-blue-500"><span className=" text-sky-700 ">Welcome</span> Admin..!</p>
        </div>

        {/* Approve Courses Section */}
        <div ref={approveCoursesRef} className="mt-8 h-screen">
          <div className="grid grid-flow-row gap-8 text-blue-500 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {courses.map((course) => (
              <div
                key={course._id}
                className="my-3 bg-gray-100 shadow-lg shadow-gray-200 duration-300 hover:-translate-y-1 rounded border-2 border-black"
              >
                <div className="cursor-pointer">
                  <figure>
                    <img
                      src={course.imageUrl}
                      alt={course.courseName}
                      className="w-full h-48 object-cover overflow-hidden"
                    />
                    <figcaption className="p-4">
                      <p className="text-lg mb-2 font-bold leading-relaxed text-blue-500">
                        {course.courseName}
                      </p>
                      <p className="text-sm mb-4">{course.description}</p>
                      <div className="flex justify-between">
                        <p>Instructor: {course.instructor}</p>
                        <p>Price: ${course.price}</p>
                      </div>
                      <button
                        onClick={() => handleStatusChange(course._id)}
                        className="mt-5 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-red-600"
                    >
                        Approve Course
                    </button>
                    </figcaption>
                  </figure>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
