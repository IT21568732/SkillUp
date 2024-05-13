// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";

// const MyCourses = () => {
//   const [enrolledCourses, setEnrolledCourses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const token = localStorage.getItem("authToken");

//   let userID = "";
//   if (token) {
//     const decodedToken = jwtDecode(token);
//     console.log(decodedToken);

//     userID = decodedToken.userId; // Assuming the user ID is stored in the JWT token
//     console.log(userID);
//   }

//   useEffect(() => {
//     if (userID) {
//       fetch(`http://localhost:8003/learner/enrolled-courses`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ Learner_ID: userID }),
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           setEnrolledCourses(data.data.courseDetails);
//           setLoading(false);
//           console.log(data.data)
//         })
//         .catch((error) =>
//           console.error("Error fetching enrolled courses:", error)
//         );
//     }
//   }, [userID]);

//   return (
//     <div>
//       <h1 className="mt-8 mb-4 flex text-4xl text-blue-500 justify-center font-bold  items-center">
//         My Courses
//       </h1>
//       <section className="py-10 px-12">
//         <div className="grid grid-flow-row gap-8 text-blue-500 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//           {loading ? (
//             <p>Loading...</p>
//           ) : (
//             enrolledCourses.map((course) => (
//               <div
//                 key={course.courseId}
//                 className="my-3 bg-gray-100  shadow-lg shadow-gray-200  duration-300 hover:-translate-y-1 rounded border-2 border-black"
//               >
//                 <a
//                   href={`mycourse/${course._id}`}
//                   className="cursor-pointer"
//                 >
//                   <figure>
//                     <img
//                       src={course.imageUrl}
//                       alt={course.courseName}
//                       className="w-full h-48 object-cover overflow-hidden"
//                     />
//                     <figcaption className="p-4">
//                       <p className="text-lg mb-2 font-bold leading-relaxed text-blue-500">
//                         {course.courseName}
//                       </p>
//                       <p className="text-sm mb-4">{course.courseDescription}</p>
//                       <div className="flex justify-between">
//                         <p>Instructor: {course.instructor}</p>
//                         <p>Progress: {course.progress}</p>
//                       </div>
//                     </figcaption>
//                   </figure>
//                 </a>
//               </div>
//             ))
//           )}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default MyCourses;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const MyCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("authToken");

  let userID = "";
  if (token) {
    const decodedToken = jwtDecode(token);
    userID = decodedToken.userId; // Assuming the user ID is stored in the JWT token
  }

  useEffect(() => {
    if (userID) {
      fetch(`http://localhost:8003/learner/enrolled-courses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Learner_ID: userID }),
      })
        .then((response) => response.json())
        .then((data) => {
          setEnrolledCourses(data.data.courseDetails);
          setLoading(false);
        })
        .catch((error) =>
          console.error("Error fetching enrolled courses:", error)
        );
    }
  }, [userID]);

  useEffect(() => {
    const fetchCourseProgress = async () => {
      const coursesWithProgress = await Promise.all(
        enrolledCourses.map(async (course) => {
          const progressResponse = await fetch(`http://localhost:8003/learner/course-progress`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ Learner_ID: userID, courseId: course._id }),
          });
          const progressData = await progressResponse.json();
          return {
            ...course,
            progress: progressData.data.progress,
          };
        })
      );
      setEnrolledCourses(coursesWithProgress);
    };

    if (enrolledCourses.length > 0) {
      fetchCourseProgress();
    }
  }, [enrolledCourses, userID]);

  return (
    <div>
      <h1 className="mt-8 mb-4 flex text-4xl text-blue-500 justify-center font-bold items-center">
        My Courses
      </h1>
      <section className="py-10 px-12">
        <div className="grid grid-flow-row gap-8 text-blue-500 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {loading ? (
            <p>Loading...</p>
          ) : (
            enrolledCourses.map((course) => (
              <div
                key={course.courseId}
                className="my-3 bg-gray-100  shadow-lg shadow-gray-200  duration-300 hover:-translate-y-1 rounded border-2 border-black"
              >
                <a href={`mycourse/${course._id}`} className="cursor-pointer">
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
                      <p className="text-sm mb-4">{course.courseDescription}</p>
                      <div className="flex flex-col">
                        <p className="font-bold">Instructor: {course.instructor}</p>
                        <p className="font-bold text-black bg-green-500 justify-center text-center rounded-xl mt-3 bottom-0">Progress: {course.progress}%</p>
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

export default MyCourses;
