import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/config";
import Navbar from "../components/Navbar";
import "../styles/Dashboard.css";

export default function Dashboard() {
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const fetchEmployee = async () => {
    try {
      setLoading(true);

      const res = await api.get("/employees");

      setEmployee(res.data);
    } catch (error) {
      alert("Error fetching employee data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  const deleteEmployee = async (id) => {
    try {
      await api.delete(`/employees/${id}`);

      alert("Employee Deleted Successfully");

      fetchEmployee();
    } catch (error) {
      alert("Delete Failed");
    }
  };

  const filteredData = employee.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase()) ||
      emp.department.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <h2>Employee Management Application</h2>

        <h3>Dashboard</h3>

        <input
          type="text"
          placeholder="Search Employee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="add-btn"
          onClick={() => navigate("/add")}
        >
          Add Employee
        </button>

        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.phone}</td>
                  <td>{emp.department}</td>

          <td>
              <button
                      onClick={() =>
                        navigate(`/view/${emp.id}`)
                      }
                    >
                      View
                    </button>

                    <button
                   onClick={() =>
                        navigate(`/edit/${emp.id}`)
                      }
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                     deleteEmployee(emp.id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No Employees Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}