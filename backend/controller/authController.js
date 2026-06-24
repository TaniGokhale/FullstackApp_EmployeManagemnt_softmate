const db = require ("../config/db")
const bcrypt=require("bcrypt")
const jwt = require("jsonwebtoken")


const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const checkUser =
      "select * from users where email = ?";

    db.query(checkUser, [email], async (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (result.length > 0) {
        return res.status(400).json({
          message: "User already exists",
        });
      }

      const hashedPassword =
        await bcrypt.hash(password, 10);

      const sql =
        "insert into users(name,email,password) VALUES(?,?,?)";

      db.query(
        sql,
        [name, email, hashedPassword],
        (err, data) => {
          if (err) {
            return res.status(500).json(err);
          }

          res.status(201).json({
            message: "User Registered Successfully",
          });
        }
      );
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const loginUser = (req, res) => {
  const { email, password } = req.body;

  const sql =
    "select * from users where email = ?";

  db.query(sql, [email], async (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const user = result[0];

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
 "secretkey",
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      message: "Login Successful",
      token,
    });
  });
};


module.exports={loginUser,registerUser}