const db = require("../config/db");

const addEmployee = (req, res) => {
  const { name, email, phone, department } = req.body;

  const sql =
    "insert into employees (name, email, phone, department) VALUES (?, ?,?, ?)";

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
  const sql = "select * from employees";

  db.query(sql, (err, result) => {
    if (err) {
     return res.status(500).json(err);
    }
res.status(200).json(result);
  });
};

const getEmployeeById = (req, res) => {
  const { id } = req.params;

  const sql = "select * from employees where id = ?";

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
    "upadte employees set name=?, email=?, phone=?, department=? where id=?";

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
  const sql = "selete from employees where id=?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.status(200).json({
      message: "Employee Deleted Successfully",
    });
  });
};
module.exports = { addEmployee,
getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};