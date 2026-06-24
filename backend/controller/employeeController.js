const db = require("../config/db");

const addEmployee = (req, res) => {
  const { name, email, phone, department } = req.body;

  const sql =
    "INSERT INTO employees (name, email, phone, department) VALUES (?, ?, ?, ?)";

  db.query(
    sql,
    [name, email, phone, department],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(201).json({
        message: "Employee Added Successfully",
      });
    }
  );
};

const getEmployees = (req, res) => {
  const sql = "SELECT * FROM employees";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.status(200).json(result);
  });
};

const getEmployeeById = (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM employees WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.status(200).json(result[0]);
  });
};

const updateEmployee = (req, res) => {
  const { id } = req.params;
  const { name, email, phone, department } = req.body;

  const sql =
    "UPDATE employees SET name=?, email=?, phone=?, department=? WHERE id=?";

  db.query(
    sql,
    [name, email, phone, department, id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(200).json({
        message: "Employee Updated Successfully",
      });
    }
  );
};

const deleteEmployee = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM employees WHERE id=?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.status(200).json({
      message: "Employee Deleted Successfully",
    });
  });
};

module.exports = {
  addEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};