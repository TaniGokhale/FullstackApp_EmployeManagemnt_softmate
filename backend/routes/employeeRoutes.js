const express=require("express")
const router =express.Router()
const {addEmployee,getEmployee,getEmployeeById,updateEmployee,deleteEmployee}=require("../controller/employeeController")

const verifyToken=require("../middleware/authMiddleware")

router.get("/",verifyToken, getEmployee)
router.get("/:id",verifyToken, getEmployeeById)
router.post("/add",verifyToken, addEmployee)
router.put("/:id",verifyToken, updateEmployee)
router.delete("/:id",verifyToken, deleteEmployee)


module.exports=router