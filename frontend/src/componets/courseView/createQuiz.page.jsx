import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Sidebar from "../common/Sidebar";

function CreateQuizPage() {
  const { id: courseId } = useParams();
  const [quizName, setQuizName] = useState("");

  // State for quiz questions
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    correctOptionIndex: 0,
  });

  // Function to add a new question
  const addQuestion = () => {
    if (
      currentQuestion.question.trim() === "" ||
      currentQuestion.options.some((option) => option.trim() === "")
    ) {
      // Check if the question or any option is empty
      alert("Please fill out the question and all options before adding.");
      return;
    }

    setQuestions([...questions, currentQuestion]);
    setCurrentQuestion({
      question: "",
      options: ["", "", "", ""],
      correctOptionIndex: 0,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8001/quizzes/create_quiz",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ courseId, quizName, questions }),
        }
      );
      if (response.ok) {
        console.log("Quiz submitted successfully");
        window.alert("Quiz submitted successfully"); // Show alert
        // You can redirect or show a success message here
      } else {
        console.error("Failed to submit quiz");
        // Handle the error as needed
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
      // Handle the error as needed
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-3/4 p-4 h-screen overflow-scroll">
        <h1 className="text-2xl font-bold mb-4">Create Quiz</h1>
        <Link
          to={`/instructor/single_course/${courseId}`}
          className="mb-4 block text-blue-500"
        >
          Back to Course
        </Link>
        <div className=" flex gap-10">
          <div className=" w-1/2">
            <label className="block mb-2">Quiz Name</label>
            <input
              type="text"
              value={quizName}
              onChange={(e) => setQuizName(e.target.value)}
              className="block w-full border border-gray-300 rounded-md p-2"
              required
            />
            <form>
              <div className="mb-4">
                <label className="block mb-2">Question</label>
                <input
                  type="text"
                  value={currentQuestion.question}
                  onChange={(e) =>
                    setCurrentQuestion({
                      ...currentQuestion,
                      question: e.target.value,
                    })
                  }
                  className="block w-full border border-gray-300 rounded-md p-2"
                  required
                />
                <label className="block mt-2 mb-2">Options</label>
                {currentQuestion.options.map((option, optionIndex) => (
                  <input
                    key={optionIndex}
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...currentQuestion.options];
                      newOptions[optionIndex] = e.target.value;
                      setCurrentQuestion({
                        ...currentQuestion,
                        options: newOptions,
                      });
                    }}
                    className="block w-full border border-gray-300 rounded-md p-2 mb-2"
                    required
                  />
                ))}
                <button
                  type="button"
                  onClick={addQuestion}
                  className="bg-blue-500 text-white rounded-md p-2 "
                >
                  Add Question
                </button>
              </div>
            </form>
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white rounded-md p-2"
            >
              Create Quiz
            </button>
          </div>
          <div className=" w-1/2">
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Added Questions:</h2>
              <table className="border-collapse border border-gray-400">
                <thead>
                  <tr>
                    <th className="border border-gray-400 p-2">Question</th>
                    <th className="border border-gray-400 p-2">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {questions.map((question, index) => (
                    <tr key={index}>
                      <td className="border border-gray-400 p-2">
                        {question.question}
                      </td>
                      <td className="border border-gray-400 p-2">
                        {question.options.map((option, optionIndex) => (
                          <div key={optionIndex}>
                            <input
                              type="radio"
                              name={`correctOption-${index}`}
                              checked={
                                question.correctOptionIndex === optionIndex
                              }
                              onChange={() => {
                                const newQuestions = [...questions];
                                newQuestions[index].correctOptionIndex =
                                  optionIndex;
                                setQuestions(newQuestions);
                              }}
                            />
                            <label>{option}</label>
                          </div>
                        ))}
                      </td>
                      <td className="border border-gray-400 p-2">
                        <button
                          type="button"
                          onClick={() => {
                            const newQuestions = [...questions];
                            newQuestions.splice(index, 1);
                            setQuestions(newQuestions);
                          }}
                          className="bg-red-500 text-white rounded-md p-2"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateQuizPage;
