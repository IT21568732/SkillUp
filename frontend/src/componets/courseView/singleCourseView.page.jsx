import React, { useEffect, useState } from "react";
import Sidebar from "../common/Sidebar";
import { useNavigate, useParams } from "react-router-dom";

function SingleCourse() {
  const { id: courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState();
  const [lessons, setLessons] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    lessonDes: "",
    video: null,
    note: null,
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          `http://localhost:8001/course/course_by_id/${courseId}`
        );
        const data = await response.json();
        console.log(data);
        setCourse(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [courseId]);

  useEffect(() => {
    if (course && course.lessons) {
      const fetchLessonData = async () => {
        const promises = course.lessons.map(async (lessonId) => {
          const response = await fetch(
            `http://localhost:8001/lesson/${lessonId}`
          );
          return response.json();
        });
        const lessonData = await Promise.all(promises);
        setLessons(lessonData);
      };
      fetchLessonData();
    }
  }, [course]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (
      !formData.title ||
      !formData.lessonDes ||
      !formData.video ||
      !formData.note
    ) {
      alert("Please fill in all required fields");
      return;
    }
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("courseId", courseId);
      formDataToSend.append("title", formData.title);
      formDataToSend.append("lessonDes", formData.lessonDes);
      formDataToSend.append("video", formData.video);
      formDataToSend.append("note", formData.note);

      const response = await fetch(
        `http://localhost:8001/lesson/create_lesson`,
        {
          method: "POST",
          body: formDataToSend,
        }
      );
      if (response.ok) {
        // Lesson created successfully, you can update UI as needed
        console.log("Lesson created successfully");
        // Show alert
        window.alert("Lesson created successfully");

        // Refresh the lessons list
        const updatedLesson = await response.json();
        setLessons([...lessons, updatedLesson]);
        // Close the modal
        setIsModalOpen(false);
      } else {
        console.error("Failed to create lesson");
      }
    } catch (error) {
      console.error("Error creating lesson:", error);
    }
  };

  // const handleDeleteLesson = async (lessonId) => {
  //   try {
  //     const response = await fetch(`http://localhost:8001/lesson/delete/${lessonId}`, {
  //       method: "DELETE",
  //     });
  //     if (response.ok) {
  //       // Remove the deleted lesson from the state
  //       setLessons(lessons.filter((lesson) => lesson._id !== lessonId));
  //       console.log("Lesson deleted successfully");
  //     } else {
  //       console.error("Failed to delete lesson");
  //     }
  //   } catch (error) {
  //     console.error("Error deleting lesson:", error);
  //   }
  // };

  const handleCreateQuiz = () => {
    navigate(`/instructor/create_quiz/${courseId}`);
  };

  const handleAllQuizzes = () => {
    navigate(`/instructor/allQuizzes/${courseId}`);
  };
  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="">
        <div className="max-w-6xl mx-auto px-4  w-screen">
          <div className="grid grid-cols-2 gap-12">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden h-5/6 mt-10">
              <img
                className="w-full h-64 object-cover object-center"
                src={course.imageUrl}
                alt={course.courseName}
              />
              <div className="p-4">
                <h1 className="text-3xl font-bold mb-2">{course.courseName}</h1>
                <h1>$ {course.price}</h1>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <button
                  onClick={toggleModal}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-8 rounded"
                >
                  Create New Lesson
                </button>
                <div className=" flex gap-10 mt-5">
                  <button
                    onClick={handleCreateQuiz}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Create Course Quiz
                  </button>
                  <button
                    onClick={handleAllQuizzes}
                    className=" bg-zinc-500 hover:bg-zinc-700 text-white font-bold py-2 px-4 rounded"
                  >
                    All Course Quizzes
                  </button>
                </div>
              </div>
            </div>
            <div className="h-screen pt-10">
              <h2 className="text-2xl font-bold mb-2">All Lessons:</h2>
              <div className="bg-white rounded-lg shadow-lg overflow-y-auto h-4/5">
                <div className="p-4">
                  <ul>
                    {lessons.map((lesson) => (
                      <li key={lesson._id} className="mb-4">
                        <h3 className="text-xl font-bold">
                          {lesson.data.title}
                        </h3>
                        <p className="text-gray-600 mb-2">
                          {lesson.data.lessonDes}
                        </p>

                        <div className="my-7 ">
                          <a
                            href={lesson.data.note} // Assuming note contains the file URL
                            download
                            className="text-blue-500 hover:border-blue-500 border-2 border-solid rounded-xl px-4 py-2 "
                          >
                            Download Notes
                          </a>
                        </div>
                        <video className="w-full rounded-lg" controls>
                          <source src={lesson.data.video} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                        {/* Delete button */}
                        {/* <button
                          onClick={() => handleDeleteLesson(lesson.data._id)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
                        >
                          Delete
                        </button> */}
                        <br/>
                        <br/>
                        <h1>------------------------------------------------</h1>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <form className="p-4 flex flex-col gap-4" onSubmit={handleSubmit}>
              <label className="block">
                <span className="text-gray-700">Title:</span>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-solid border-2 border-gray-300 rounded-md px-3 py-2 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50"
                  placeholder="Enter title"
                  required
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Lesson Description:</span>
                <input
                  type="text"
                  name="lessonDes"
                  value={formData.lessonDes}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-solid border-2 border-gray-300 rounded-md px-3 py-2 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50"
                  placeholder="Lesson Description"
                  required
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Video:</span>
                <input
                  type="file"
                  name="video"
                  onChange={handleInputChange}
                  accept="video/*"
                  className="mt-1 block w-full border-solid border-2 border-gray-300 rounded-md px-3 py-2 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50"
                  required
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Note PDF:</span>
                <input
                  type="file"
                  name="note"
                  onChange={handleInputChange}
                  accept=".pdf"
                  className="mt-1 block w-full border-solid border-2 border-gray-300 rounded-md px-3 py-2 placeholder-gray-500 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50"
                  required
                />
              </label>
              <button
                type="button"
                onClick={toggleModal}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleCourse;
