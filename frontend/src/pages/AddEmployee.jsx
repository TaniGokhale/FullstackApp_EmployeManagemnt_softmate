import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/config";
import "../styles/AddEmployee.css";

export default function AddEmployee() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.department
    ) {
        alert("All Fields Are Required");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      await api.post("/employees/add", form);

      alert("Employee Added Successfully");

      navigate("/dashboard");
    } catch (error) {
      alert("Failed To Add Employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Add Employee</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"  placeholder="Employee Name"value={form.name}
          onChange={handleChange}
        />

        <input
          type="email" name="email"
          placeholder="Employee Email"
          value={form.email}
          onChange={handleChange}
        />

        <input type="text"
          name="phone"
          placeholder="Employee Phone"
          value={form.phone}
          onChange={handleChange}
        />

        <input  type="text" name="department"  placeholder="Department" value={form.department} onChange={handleChange}
        />

        <button type="submit">
          {loading ? "Adding..." : "Add Employee"}
        </button>
      </form>
    </div>
  );
}