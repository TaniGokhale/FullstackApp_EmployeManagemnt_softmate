const db=require("../config/db")



 const addEmployee=(req,res)=>{
const {name,email, phone, department}=req.body;

const sql="insert into employees (name,email, phone, department)values (?,?,?,?)"

db.query(sql,[name,email,phone,department],(err,result)=>{
if(err){
    return res.status(500).json(err)
}res.json({message:"Employee Data Added Successfully.."})
})
 }



  const getEmployee=(req,res)=>{

const sql="select * from employees"

db.query(sql,(err,result)=>{
if(err){
    return res.status(500).json(err)
}res.json(result)
})
 }

  const getEmployeeById=(req,res)=>{
const {id}=req.params;
const sql="select * from employees"

db.query(sql,[id],(err,result)=>{
if(err){
    return res.status(500).json(err)
}res.json(result[0])
})
 }


 
 const updateEmployee=(req,res)=>{
    const {id}=req.params
const {name,email, phone, department}=req.body;

const sql="update employees set name=?,email =?, phone=?,department=? where id=?"

db.query(sql,[name,email, phone, department,id],(err,result)=>{
if(err){
    return res.status(500).json(err)
}res.json({message:"Employee Data updated Successfully.."})
})
 }


   const deleteEmployee=(req,res)=>{
const {id}=req.params;
const sql="delete from employees where id = ?"

db.query(sql,[id],(err,result)=>{
if(err){
    return res.status(500).json(err)
}res.json({message:"Employee Data deleted"})
})
 }

 module.exports={
    addEmployee,getEmployee,getEmployeeById,updateEmployee,deleteEmployee
 }