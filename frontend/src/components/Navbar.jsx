import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logout Successfully");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2>EMS</h2>

      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>

        <Link to="/add">Add Employee</Link>

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}