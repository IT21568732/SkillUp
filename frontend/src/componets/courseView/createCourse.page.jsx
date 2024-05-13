import React, { useState } from "react";
import Sidebar from "../common/Sidebar";
import { jwtDecode } from "jwt-decode";

function CreateCoursePage() {
  const [courseData, setCourseData] = useState({
    courseName: "",
    price: "",
    duration: "",
    description: "",
    instructor: "",
    category: "",
    image: null,
  });

  // Decode the JWT token
  const token = localStorage.getItem("authToken");
  let userEmail = "";
  if (token) {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);
    userEmail = decodedToken.userEmail; // Assuming the email is stored in the JWT token
  }

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setCourseData({
      ...courseData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (
      !courseData.courseName ||
      !courseData.price ||
      !courseData.duration ||
      !courseData.description ||
      !courseData.category
    ) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("courseName", courseData.courseName);
      formDataToSend.append("price", courseData.price);
      formDataToSend.append("duration", courseData.duration);
      formDataToSend.append("description", courseData.description);
      formDataToSend.append("instructor", userEmail);
      formDataToSend.append("category", courseData.category);
      formDataToSend.append("image", courseData.image);

      const response = await fetch(
        "http://localhost:8001/course/create_course",
        {
          method: "POST",
          body: formDataToSend,
        }
      );
      if (response.ok) {
        // Course created successfully, update UI as needed
        console.log("Course created successfully");
        // Show alert
        window.alert("Course created successfully");

        // Reset form data
        setCourseData({
          courseName: "",
          price: "",
          duration: "",
          description: "",
          instructor: "",
          category: "",
          image: "",
        });
      } else {
        console.error("Failed to create course");
      }
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-3/4 p-4 h-screen overflow-scroll">
        <h1 className="text-2xl font-bold mb-4">Create Course</h1>
        <div className="flex items-center justify-center mx-24">
          <div>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <label className="block mb-4">
                Course Name:
                <input
                  type="text"
                  name="courseName"
                  value={courseData.courseName}
                  onChange={handleInputChange}
                  className="block w-full border border-gray-300 rounded-md p-2 mt-1"
                />
              </label>
              <div className=" flex gap-5">
                <label className="block mb-4">
                  Price:
                  <input
                    type="text"
                    name="price"
                    value={courseData.price}
                    onChange={handleInputChange}
                    className="block w-full border border-gray-300 rounded-md p-2 mt-1"
                  />
                </label>
                <label className="block mb-4">
                  Duration:
                  <input
                    type="text"
                    name="duration"
                    value={courseData.duration}
                    onChange={handleInputChange}
                    className="block w-full border border-gray-300 rounded-md p-2 mt-1"
                  />
                </label>
              </div>
              <label className="block mb-4">
                Description:
                <textarea
                  name="description"
                  value={courseData.description}
                  onChange={handleInputChange}
                  className="block w-full border border-gray-300 rounded-md p-2 mt-1"
                />
              </label>
              <label className="block mb-4">
                Instructor:
                <input
                  type="text"
                  name="instructor"
                  value={userEmail}
                  className="block w-full border border-gray-300 rounded-md p-2 mt-1 bg-slate-300"
                  readOnly
                />
              </label>
              <label className="block mb-4">
                Category:
                <input
                  type="text"
                  name="category"
                  value={courseData.category}
                  onChange={handleInputChange}
                  className="block w-full border border-gray-300 rounded-md p-2 mt-1"
                />
              </label>
              <label className="block mb-4">
                Image:
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="block w-full border border-gray-300 rounded-md p-2 mt-1"
                />
              </label>
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-md p-2 mt-4"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCoursePage;
