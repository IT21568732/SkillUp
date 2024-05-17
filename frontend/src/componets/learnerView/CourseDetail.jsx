// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
// import axios from "axios";

// const CourseDetail = () => {
//   const token = localStorage.getItem("authToken");
//   const { id: courseId } = useParams();

//   const [course, setCourse] = useState(null);
//   const [userID, setUserID] = useState("");
//   const [lessons, setLessons] = useState([]);

//   useEffect(() => {
//     // Fetch course details
//     fetch(`http://localhost:8001/course/course_by_id/${courseId}`)
//       .then((response) => response.json())
//       .then((data) => setCourse(data))
//       .catch((error) => console.error("Error fetching course details:", error));

//     // Decode userID from token
//     if (token) {
//       const decodedToken = jwtDecode(token);
//       setUserID(decodedToken.userId);
//     }
//   }, [courseId, token]);

//   ////////////////////////////////////////////////////////////
//   useEffect(() => {
//     // Fetch lessons
//     if (course && course.lessons.length > 0) {
//       const fetchLessons = async () => {
//         try {
//           const lessonPromises = course.lessons.map(async (lessonId) => {
//             const response = await axios.get(
//               `http://localhost:8001/lesson/${lessonId}`
//             );
//             return response.data.data; // Assuming lesson data is returned under 'data' key
//           });
//           const lessonData = await Promise.all(lessonPromises);
//           setLessons(lessonData);
//         } catch (error) {
//           console.error("Error fetching lessons:", error);
//         }
//       };

//       fetchLessons();
//     }
//   }, [course]);

//   /////////////////////////////////////////////////////////////

//   const calculateProgress = () => {
//     if (lessons.length === 0) return 0;
//     const completedLessons = lessons.filter(
//       (lesson) => lesson.completed
//     ).length;
//     return (completedLessons / lessons.length) * 100;
//   };

//   // Function to handle increasing progress when a lesson is checked
//   const handleProgress = (lessonIndex) => {
//     const updatedLessons = [...lessons];
//     updatedLessons[lessonIndex].completed = true;
//     setLessons(updatedLessons);
//   };

//   //////////////////////////////////////////////////////////////
//   const handleSubmitProgress = async () => {
//     try {
//       // Example of submitting progress to the backend
//       const response = await axios.put(
//         `http://localhost:8003/learner/update-course-progress`,
//         {
//           Learner_ID: userID,
//           courseId: course._id,
//           progress: calculateProgress(), // Dynamic progress value based on completed lessons
//         }
//       );
//       console.log("Progress updated successfully:", response.data);
//       alert("Progress updated successfully!");
//     } catch (error) {
//       console.error("Error updating progress:", error);
//       // You can handle error response here, e.g., show an error message
//     }
//   };
//   ////////////////////////////////////////////////////////////////////////////////////////////////

//   if (!course) {
//     return <div className="text-center mt-8">Loading...</div>;
//   }

//   return (
//     <div className="container my-10 mx-10 px-4 py-8 bg-white border-2 border-black rounded-lg shadow-lg">
//       <h2 className="text-2xl font-bold mb-4 text-blue-600">
//         {course.courseName}
//       </h2>
//       {course.status ? (
//         <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
//           Active
//         </button>
//       ) : (
//         <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
//           Inactive
//         </button>
//       )}

//       <p className="text-base text-gray-700 mb-4">{course.description}</p>
//       <div className="flex justify-center">
//         <img
//           src={course.imageUrl}
//           alt={course.courseName}
//           className="w-full max-w-lg h-auto rounded-lg shadow-lg border border-gray-300"
//           style={{ maxHeight: "400px" }} // Limiting the maximum height of the image
//         />
//       </div>
//       <p className="text-lg text-blue-600 font-bold mb-2">
//         Price: ${course.price}
//       </p>
//       <p className="text-lg mb-2 text-blue-600">Duration: {course.duration}</p>
//       <p className="text-lg text-gray-600 mb-2">
//         Instructor: {course.instructor}
//       </p>
//       <p className="text-lg text-gray-600 mb-2">Category: {course.category}</p>

//       <p className="text-lg text-gray-600 mb-2">
//         Number of Lessons: {course.lessons.length}
//       </p>
//       {/* Render Lessons */}
//       {/* Lessons section with buttons */}
//       <div className="mt-4">
//         <h3 className="text-lg font-bold mb-2">
//           Progress: {calculateProgress()}%
//         </h3>
//         {lessons.map((lesson, index) => (
//           <div key={index} className="border border-gray-300 rounded p-4 mb-2">
//             <h4 className="text-blue-600 font-bold">{lesson.title}</h4>
//             <p>{lesson.lessonDes}</p>
//             <p>
//               <strong>Video:</strong>{" "}
//               <a
//                 href={lesson.video}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="underline text-red-500"
//               >
//                 Click here to view video
//               </a>
//             </p>
//             <p>
//               <strong>Note:</strong>{" "}
//               <a
//                 href={lesson.note}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="underline text-red-500"
//               >
//                 Click here to get lesson note
//               </a>
//             </p>
//             {/* Button to mark lesson completion */}
//             <button
//               onClick={() => handleProgress(index)}
//               className={`bg-${
//                 lesson.completed ? "green" : "red"
//               }-500 hover:bg-${
//                 lesson.completed ? "green" : "red"
//               }-600 text-white font-bold py-2 px-4 rounded`}
//             >
//               {lesson.completed ? "Completed" : "Mark as Completed"}
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Submit Progress button */}
//       <button
//         onClick={handleSubmitProgress}
//         className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-4"
//       >
//         Submit Progress
//       </button>

//       {/* //////////////////////////////////////// */}
//     </div>
//   );
// };

// export default CourseDetail;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const CourseDetail = () => {
  const token = localStorage.getItem("authToken");
  const { id: courseId } = useParams();

  const [course, setCourse] = useState(null);
  const [userID, setUserID] = useState("");
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    // Fetch course details
    fetch(`http://localhost:8001/course/course_by_id/${courseId}`)
      .then((response) => response.json())
      .then((data) => setCourse(data))
      .catch((error) => console.error("Error fetching course details:", error));

    // Decode userID from token
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserID(decodedToken.userId);
    }
  }, [courseId, token]);

  ////////////////////////////////////////////////////////////
  useEffect(() => {
    // Fetch lessons
    if (course && course.lessons.length > 0) {
      const fetchLessons = async () => {
        try {
          const lessonPromises = course.lessons.map(async (lessonId) => {
            const response = await axios.get(
              `http://localhost:8001/lesson/${lessonId}`
            );
            return response.data.data; // Assuming lesson data is returned under 'data' key
          });
          const lessonData = await Promise.all(lessonPromises);
          setLessons(lessonData);
        } catch (error) {
          console.error("Error fetching lessons:", error);
        }
      };

      fetchLessons();
    }
  }, [course]);

  /////////////////////////////////////////////////////////////

  const calculateProgress = () => {
    if (lessons.length === 0) return 0;
    const completedLessons = lessons.filter(
      (lesson) => lesson.completed
    ).length;
    return (completedLessons / lessons.length) * 100;
  };

  // Function to handle increasing progress when a lesson is checked
  const handleProgress = (lessonIndex) => {
    const updatedLessons = [...lessons];
    updatedLessons[lessonIndex].completed = true;
    setLessons(updatedLessons);
  };

  //////////////////////////////////////////////////////////////
  const handleSubmitProgress = async () => {
    try {
      // Example of submitting progress to the backend
      const response = await axios.put(
        `http://localhost:8003/learner/update-course-progress`,
        {
          Learner_ID: userID,
          courseId: course._id,
          progress: calculateProgress(), // Dynamic progress value based on completed lessons
        }
      );
      console.log("Progress updated successfully:", response.data);
      alert("Progress updated successfully!");
    } catch (error) {
      console.error("Error updating progress:", error);
      // You can handle error response here, e.g., show an error message
    }
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////
  const handleUnenroll = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8003/learner/delete-enrolled-course`,
        {
          data: {
            Learner_ID: userID,
            courseId: course._id,
          },
        }
      );
      console.log("Course unenrolled successfully:", response.data);
      alert("Course unenrolled successfully!");
      window.location.href = "/learner/mycourse";
    } catch (error) {
      console.error("Error unenrolling course:", error);
    }
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////

  if (!course) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="container my-10 mx-10 px-4 py-8 bg-white border-2 border-black rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">
        {course.courseName}
      </h2>
      {course.status ? (
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          Active
        </button>
      ) : (
        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
          Inactive
        </button>
      )}

      <p className="text-base text-gray-700 mb-4">{course.description}</p>
      <div className="flex justify-center">
        <img
          src={course.imageUrl}
          alt={course.courseName}
          className="w-full max-w-lg h-auto rounded-lg shadow-lg border border-gray-300"
          style={{ maxHeight: "400px" }} // Limiting the maximum height of the image
        />
      </div>
      <p className="text-lg text-blue-600 font-bold mb-2">
        Price: ${course.price}
      </p>
      <p className="text-lg mb-2 text-blue-600">Duration: {course.duration}</p>
      <p className="text-lg text-gray-600 mb-2">
        Instructor: {course.instructor}
      </p>
      <p className="text-lg text-gray-600 mb-2">Category: {course.category}</p>

      <p className="text-lg text-gray-600 mb-2">
        Number of Lessons: {course.lessons.length}
      </p>
      {/* Render Lessons */}
      {/* Lessons section with buttons */}
      <div className="mt-4">
        <h3 className="text-lg font-bold mb-2">
          Progress: {calculateProgress()}%
        </h3>
        {lessons.map((lesson, index) => (
          <div key={index} className="border border-gray-300 rounded p-4 mb-2">
            <h4 className="text-blue-600 font-bold">{lesson.title}</h4>
            <p>{lesson.lessonDes}</p>
            <p>
              <strong>Video:</strong>{" "}
              <a
                href={lesson.video}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-red-500"
              >
                Click here to view video
              </a>
            </p>
            <p>
              <strong>Note:</strong>{" "}
              <a
                href={lesson.note}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-red-500"
              >
                Click here to get lesson note
              </a>
            </p>
            {/* Button to mark lesson completion */}
            <button
              onClick={() => handleProgress(index)}
              className={`bg-${
                lesson.completed ? "green" : "red"
              }-500 hover:bg-${
                lesson.completed ? "green" : "red"
              }-600 text-white font-bold py-2 px-4 rounded`}
            >
              {lesson.completed ? "Completed" : "Mark as Completed"}
            </button>
          </div>
        ))}
      </div>

      <p className="mb-1">*Please Submit your Course progress</p>

      <div className="flex">
        {/* Submit Progress button */}
        <button
          onClick={handleSubmitProgress}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-4"
        >
          Submit Progress
        </button>
        {/* un-Enroll button */}
        <button
          onClick={handleUnenroll}
          className="bg-black text-white font-bold py-2 px-4 rounded"
        >
          Un-enroll
        </button>
      </div>
      {/* //////////////////////////////////////// */}
    </div>
  );
};

export default CourseDetail;