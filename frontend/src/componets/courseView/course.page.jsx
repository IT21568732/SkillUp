import React, { useState, useEffect } from "react";
import Sidebar from "../common/Sidebar";
import { Link } from "react-router-dom";
import SingleCourse from "./singleCourseView.page";
import { jwtDecode } from "jwt-decode";

function CoursePage() {
  const [courses, setCourses] = useState([]);

  // Decode the JWT token
  const token = localStorage.getItem("authToken");
  let userEmail = "";
  if (token) {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    userEmail = decodedToken.userEmail; // Assuming the email is stored in the JWT token
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch("http://localhost:8001/course/all_courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ instructor: userEmail }),
      });
      const data = await response.json();
      setCourses(data.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  return (
    <div className="flex overflow-hidden">
      <Sidebar />
      <div className="w-3/4 p-4 h-screen overflow-y-auto">
        {/* Main content */}
        <h1 className=" text-2xl font-bold mt-5 mb-8">{"-> "}All Courses</h1>
        <div className="grid grid-cols-3 gap-4 ">
          {courses.map((course) => (
            <Link
              to={`/instructor/single_course/${course._id}`}
              key={course._id}
              className="bg-white shadow-md p-4 rounded-lg"
            >
              <img
                src={course.imageUrl}
                alt={course.courseName}
                className="w-full h-40 object-cover mb-4 rounded-lg"
              />
              <div className=" flex justify-between">
                <h2 className="text-xl font-bold mb-2">{course.courseName}</h2>
                <h2 className="text-gray-500 text-m">{course.category}</h2>
              </div>
              <p className="text-gray-600 mb-2">{course.description}</p>
              <div className="flex justify-between">
                <span className="text-gray-500">{course.instructor}</span>
                <span className="text-gray-500">$ {course.price}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CoursePage;
