import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/config";
import "../styles/ViewEmployee.css";

export default function ViewEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchEmployee = async () => {
    try {
      const res = await api.get(`/employees/${id}`);
      setEmployee(res.data);
    } catch (error) {
      alert("Failed To Fetch Employee Data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="view-container">
      <h2>Employee Details</h2>

      <p>
        <strong>Name:</strong> {employee.name}
      </p>

      <p>
        <strong>Email:</strong> {employee.email}
      </p>

      <p>
        <strong>Phone:</strong> {employee.phone}
      </p>

      <p>
        <strong>Department:</strong> {employee.department}
      </p>

      <button onClick={() => navigate("/dashboard")}>
        Back
      </button>
    </div>
  );
}