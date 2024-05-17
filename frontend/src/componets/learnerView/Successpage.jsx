import React from "react";
import { useEffect, useState, useNavigate } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function successpage() {
  const [status, setStatus] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const newToken = localStorage.getItem("authToken");
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get("session_id");

    //function ti get the status of the session and set it to the states
    async function getStatus() {
      try {
        const response = await axios.get(
          `http://localhost:8005/payment/session-status?session_id=${sessionId}`,
          { headers: { Authorization: `Bearer ${newToken}` } }
        );

        if (response.status === 200) {
          setStatus(response.data.status);
          setData(response.data);
        } else {
          console.log("Did not return any data", response);
        }
      } catch (error) {
        console.log("Error in getting session status", error);
      }
    }

    //calling the function if only session id is returned in params
    if (urlParams.has("session_id")) {
      getStatus();
    } else {
      window.location.href = "/dashboard";
    }
  }, []);

  if (status === "open") {
   return <Navigate to={'/learner/payment'}
/>  }

  if (status === "complete") {
    return (
      <>
     
        <div className=" max-w-[1440px] py-[64px] flex flex-col mx-auto items-center justify-center">
          <p className="text-3xl font-semibold text-center ">
            We appreciate your business! {" "}
            {/*  {data.course_id}. */}
          </p>
          <img
            src="/images/done.png"
            alt="success"
            className=" w-auto h-auto aspect-1 mt-[50px]"
          />
          <Link to="/learner/mycourse">
            <button className="mt-[50px] font-semibold hover:underline px-8 py-2 rounded-xl">
              Go to My Courses
            </button>
          </Link>
        </div>
      </>
    );
  }
}