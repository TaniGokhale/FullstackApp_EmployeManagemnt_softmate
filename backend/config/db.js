const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "demo",
  password: "Tanisha@27",
  database: "employee_app",
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed");
  } else {
    console.log("Databse Connected");
  }
});

module.exports = db;