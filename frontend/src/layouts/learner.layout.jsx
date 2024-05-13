import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../componets/common/Navbar";
import Footer from "../componets/common/Footer";

function leanertorLayout() {
  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <main className="container">
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
}

export default leanertorLayout;
