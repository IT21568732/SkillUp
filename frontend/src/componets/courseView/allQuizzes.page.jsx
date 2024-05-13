import React, { useEffect, useState } from "react";
import Sidebar from "../common/Sidebar";
import { Link, useParams } from "react-router-dom";

function AllQuizzesPage() {
  const { id: courseId } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await fetch(
          "http://localhost:8001/quizzes/courseQuizzes",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ courseId }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          setQuizzes(data);
        } else {
          console.error("Failed to fetch quizzes");
        }
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, [courseId]);

  const handleDeleteQuiz = async (quizId) => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      try {
        const response = await fetch(
          `http://localhost:8001/quizzes/delete_quiz/${quizId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          const newQuizzes = quizzes.filter((quiz) => quiz._id !== quizId);
          setQuizzes(newQuizzes);
          // Reset selectedQuiz if it's the one being deleted
          if (selectedQuiz === quizId) {
            setSelectedQuiz(null);
          }
          console.log("Quiz deleted successfully");
          alert("Quiz deleted successfully");
        } else {
          console.error("Failed to delete quiz");
          alert("Failed to delete quiz");
        }
      } catch (error) {
        console.error("Error deleting quiz:", error);
      }
    } else {
      console.log("Quiz deletion cancelled");
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-6">
        <h1 className="text-2xl font-bold mb-4">
          All Quizzes in Course {courseId}
        </h1>
        <Link
          to={`/instructor/single_course/${courseId}`}
          className="mb-4 block text-blue-500"
        >
          Back to Course
        </Link>
        <div className="relative inline-block">
          <select
            value={selectedQuiz || ""}
            onChange={(e) => setSelectedQuiz(e.target.value)}
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select a quiz...</option>
            {quizzes.map((quiz, index) => (
              <option key={index} value={quiz._id}>
                Quiz {index + 1}
              </option>
            ))}
          </select>
        </div>
        {selectedQuiz && quizzes.find((quiz) => quiz._id === selectedQuiz) && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">
              Quiz Name:{" "}
              {quizzes.find((quiz) => quiz._id === selectedQuiz)?.quizName}
            </h2>
            <ul>
              {quizzes
                .find((quiz) => quiz._id === selectedQuiz)
                .questions.map((question, qIndex) => (
                  <li key={qIndex} className="mb-4">
                    <p className="font-semibold mb-1">
                      Question: {question.question}
                    </p>
                    <ul>
                      {question.options.map((option, oIndex) => (
                        <li
                          key={oIndex}
                          className={
                            oIndex === question.correctOptionIndex
                              ? "text-green-600"
                              : ""
                          }
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
            </ul>
            <button
              onClick={() => handleDeleteQuiz(selectedQuiz)}
              className="bg-red-500 text-white rounded-md px-4 py-2 mt-4"
            >
              Delete Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllQuizzesPage;
