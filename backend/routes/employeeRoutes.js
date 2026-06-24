const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const {
  addEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} = require("../controller/employeeController");

router.post("/add", verifyToken, addEmployee);

router.get("/", verifyToken, getEmployees);

router.get("/:id", verifyToken, getEmployeeById);

router.put("/:id", verifyToken, updateEmployee);

router.delete("/:id", verifyToken, deleteEmployee);

module.exports = router;