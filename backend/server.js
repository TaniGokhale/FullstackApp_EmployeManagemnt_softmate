const  express = require('express')
 const cors =require("cors")
const authRoutes = require("./routes/authRoutes")
const employeeRoutes=require("./routes/employeeRoutes")
 const app=express()

 app.use(cors())
 app.use(express.json())

 app.use("/api/auth",authRoutes)
app.use("/api/employees",employeeRoutes)

 app.get("/",(req,res)=>{
console.log("Backend is running ")
 })

 const PORT = process.env.PORT || 5000;

 app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
 })