import { Route, Routes, useLocation } from "react-router-dom";
import useAuth from './utils/useAuth';
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./pages/login";
import Register from "./pages/register";
import UserHome from "./pages/userHome";
import Courses from "./pages/courses";
import AdminDashboard from "./pages/adminDashboard";
import "../src/App.css";

function App() {

   useAuth();

  const location = useLocation();
  // Check if the current location is not "/Login" or "/register"
  const showNavbar = location.pathname !== "/" && location.pathname !== "/register";

  
  return (
    <div className="bg-space overflow-x-hidden relative w-[100vw] bg-cover h-[100vh]">
      {showNavbar && (
        <div className="w-full bg-burger bg-repeat-x">
          <Navbar />
        </div>
      )}

      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/register" element={<Register/>} /> 
        <Route path="/home" element={<UserHome/>} />    
        <Route path="/courses" element={<Courses/>} />     
        <Route path="/admindashboard" element={<AdminDashboard/>} />        
      </Routes>
    </div>
  );
}


export default App;