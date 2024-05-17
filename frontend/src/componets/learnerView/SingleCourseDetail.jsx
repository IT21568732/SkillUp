import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Link } from "react-router-dom";

const SingleCourseDetail = () => {
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

  ////////////////////////////////////////////////////////////////////////////
  const [enrollStatus, setEnrollStatus] = useState('');
  const handleEnrollClick = async () => {
    try {
        const learnerId = userID; // Replace with actual learner ID
        const courseId = course._id; // Replace with actual course ID

        const payload = {
            Learner_ID: learnerId,
            enrolledCourses: [{ courseId }],
        };

        const response = await axios.post('http://localhost:8003/learner/enroll', payload);
        setEnrollStatus(response.data.message);
    } catch (error) {
        console.error('Error enrolling in course:', error.message);
        setEnrollStatus('Error enrolling in course. Please try again later.');
    }
};
  ///////////////////////////////////////////////////////////////////////////

  

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
      <p className="text-lg text-gray-600 mb-2">
        Category: {course.category}
      </p>

      <p className="text-lg text-gray-600 mb-2">
        Number of Lessons: {course.lessons.length}
      </p>
      {/* <p className="text-lg text-gray-600 mb-2">Lessons:</p>
      <ul className="list-disc pl-6">
        {lessons.map((lesson, index) => (
          <li key={index} className="text-base text-gray-700">
            {lesson.lessonName}
          </li>
        ))}
      </ul> */}

      <h1 className="text-sm font-bold mb-4 text-blue-600">
        User ID: {userID}
      </h1>
      <h1 className="text-sm font-bold mb-4 text-blue-600">
        Course ID: {course._id}
      </h1>
      <Link to={`/learner/payment/${course._id}`} >
      <button className="bg-blue-600 rounded-xl py-2 px-2 text-white" onClick={handleEnrollClick}>Pay & Enroll</button>
      </Link>
      {/* <button className="bg-blue-600 rounded-xl py-2 px-2 text-white" onClick={handleEnrollClick}>Enroll</button> */}
    </div>
  );
};

export default SingleCourseDetail;
