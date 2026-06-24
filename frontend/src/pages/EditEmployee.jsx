import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/config";
import "../styles/EditEmployee.css";

export default function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const fetchEmployee = async () => {
    try {
      const res = await api.get(`/employees/${id}`);
      setForm(res.data);
    } catch (error) {
      alert("Failed To Fetch Employee Data");
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.put(`/employees/${id}`, form);

      alert("Employee Updated Successfully");

      navigate("/dashboard");
    } catch (error) {
      alert("Failed To Update Employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Update Employee</h2>

      <form onSubmit={handleUpdate}>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          type="text"
          name="department"
          value={form.department}
          onChange={handleChange}
        />

        <button type="submit">
          {loading ? "Updating..." : "Update Employee"}
        </button>
      </form>
    </div>
  );
}