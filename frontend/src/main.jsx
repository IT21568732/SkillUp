
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import CoursePage from "./componets/courseView/course.page.jsx";
import CreateCoursePage from "./componets/courseView/createCourse.page.jsx";
import SingleCourse from "./componets/courseView/singleCourseView.page.jsx";
import Signup from "./componets/register/register.jsx";
import Login from "./componets/login/login.jsx";
import RootLayout from "./layouts/root.layout.jsx";
import InstructorLayout from "./layouts/instructor.layout.jsx";
import CreateQuizPage from "./componets/courseView/createQuiz.page.jsx";
import AllQuizzesPage from "./componets/courseView/allQuizzes.page.jsx";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/register",
        element: <Signup />,
      },
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "instructor",
        element: <InstructorLayout />,
        children: [
          {
            path: "courses",
            element: <CoursePage />,
          },
          {
            path: "single_course/:id",
            element: <SingleCourse />,
          },
          {
            path: "create_course",
            element: <CreateCoursePage />,
          },
          {
            path: "create_quiz/:id",
            element: <CreateQuizPage />,
          },
          {
            path: "allQuizzes/:id",
            element: <AllQuizzesPage />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
