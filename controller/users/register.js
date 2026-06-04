// import db from "../../model/db.js";
// import bcrypt from "bcrypt";
// import JWT from "jsonwebtoken";
// const register = async (req, res) => {
//   const { name, email, password, phone ,image} = req.body;

//   // validation
//   if (!name || !email || !password) {
//     return res.json({
//       msg: "All fields are required",
//     });
//   }

//   try {
//     const [existingUser] = await db.query(`SELECT * FROM users WHERE email = ?`, [email]);

//     if (existingUser.length > 0) {  
//       return res.json({
//         msg: "Email already exists",
//       });
//     }


//     const hashedPassword = await bcrypt.hash(password, 10);

    
//     const sql = `
//       INSERT INTO users (name, email, password, phone, image)
//       VALUES (?, ?, ?, ?, ?)
//     `;

//     const [result] = await db.query(sql, [name, email, hashedPassword, phone, image]);

//     const token = JWT.sign({id:result.insertId, email: email},
//       `our secret key`,
//       { expiresIn: "7d" }
//     );

//     res.json({
//       message: "You are registered successfully",
//       id: result.insertId,
//       token: token,
//       user:{
//         name,
//         email,
//         phone,
//         image
//       }
     
//     });
//   } catch (error) {
//     console.log(error.message);

//     res.json({
//       error: error.message,
//     });
//   }
// };

// export default register;

import db from '../../config/db.js';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';

const register = async (req, res) => {
  const { name, email, password, phone, image } = req.body;

  if (!name || !email || !password) {
    return res.json({
      message: "All fields are required",
    });
  }

  try {
    const [existingUser] = await db.query("SELECT * FROM users WHERE email=?", [
      email,
    ]);

    if (existingUser.length > 0) {
      return res.json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      `INSERT INTO users(name,email,password,phone,image)
       VALUES(?,?,?,?,?)`,
      [name, email, hashedPassword, phone, image],
    );

    const token = JWT.sign(
      { id: result.insertId, email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );
    res.json({
      message: "Registration successful",
      token,
      user: {
        name,
        email,
        phone,
        image,
      },
    });
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};

export default register;
