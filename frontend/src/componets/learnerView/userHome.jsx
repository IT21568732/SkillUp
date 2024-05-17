import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";


const Home = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("authToken");

  let userID = "";
  if (token) {
    const decodedToken = jwtDecode(token);
    console.log(decodedToken);

    userID = decodedToken.userId; // Assuming the user ID is stored in the JWT token
    console.log(userID);
  }

  useEffect(() => {
    const fetchCourses = fetch(
      "http://localhost:8001/course/all_learner_courses"
    )
      .then((response) => response.json())
      .then((data) => {
        // Filter out courses with status false
        const filteredCourses = data.data.filter(
          (course) => course.status === true
        );
        setCourses(filteredCourses);
      })
      .catch((error) => console.error("Error fetching courses:", error));

    const fetchEnrolledCourses = userID
      ? fetch(`http://localhost:8003/learner/enrolled-courses`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Learner_ID: userID }),
        })
          .then((response) => response.json())
          .then((data) => {
            setEnrolledCourses(data.data.courseDetails);
          })
          .catch((error) =>
            console.error("Error fetching enrolled courses:", error)
          )
      : Promise.resolve();

    Promise.all([fetchCourses, fetchEnrolledCourses]).then(() => {
      setLoading(false);
    });
  }, [userID]);

  return (
    <div>
      <h1 className="mt-8 mb-4 flex text-3xl text-blue-500 justify-center font-bold  items-center">
        Enrolled Courses
      </h1>
      <section className="py-10 px-12">
        <div className="grid grid-flow-row gap-8 text-blue-500 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading ? (
            <p>Loading...</p>
          ) : (
            enrolledCourses.map((course) => (
              <div
                key={course.courseId} // Assuming courseId is unique
                className="my-3 bg-gray-100  shadow-lg shadow-gray-200  duration-300 hover:-translate-y-1 rounded border-2 border-black"
              >
                <a
                  href={`mycourse/${course._id}`}
                  className="cursor-pointer"
                >
                  <figure>
                    <img
                      src={course.imageUrl} // Assuming imageUrl is available in course details
                      alt={course.courseName} // Assuming courseName is available in course details
                      className="w-full h-48 object-cover overflow-hidden"
                    />
                    <figcaption className="p-4">
                      <p className="text-lg mb-2 font-bold leading-relaxed text-blue-500">
                        {course.courseName}{" "}
                        {/* Assuming courseName is available in course details */}
                      </p>
                      <p className="text-sm mb-4">{course.courseDescription}</p>{" "}
                      {/* Assuming courseDescription is available in course details */}
                      <div className="text-black font-bold">
                        <p>Instructor: {course.instructor}</p>{" "}
                        {/* Assuming instructor is available in course details */} 
                      </div>
                    </figcaption>
                  </figure>
                </a>
              </div>
            ))
          )}
        </div>
      </section>

      <h1 className="mt-8 mb-4 flex text-3xl text-blue-500 justify-center font-bold  items-center">
        Courses we offter
      </h1>
      <section className="py-10 px-12">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">
          All Active Courses
        </h2>
        <div className="grid grid-flow-row gap-8 text-blue-500 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading ? (
            <p>Loading...</p>
          ) : (
            courses.map((course) => (
              <div
                key={course._id}
                className="my-3 bg-gray-100  shadow-lg shadow-gray-200  duration-300 hover:-translate-y-1 rounded border-2 border-black"
              >
                <a href={`course/${course._id}`} className="cursor-pointer">
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
                      <div className="text-black font-bold">
                        <p>Instructor: {course.instructor}</p>
                        <p>Price: ${course.price}</p>
                      </div>
                    </figcaption>
                  </figure>
                </a>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
