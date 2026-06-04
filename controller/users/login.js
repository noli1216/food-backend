// import db from "../../model/db.js";
// import bcrypt from "bcrypt";
// import JWT from "jsonwebtoken";

// const login = async (req, res) => {
//   const { email, password } = req.body;

//   // validation
//   if (!email || !password) {
//     return res.status(400).json({
//       message: "All fields are required",
//     });
//   }

//   try {
//     // 1. Find user
//     const [existingUser] = await db.query(`SELECT * FROM users WHERE email=?`, [
//       email,
//     ]);

//     if (existingUser.length === 0) {
//       return res.json({
//         message: "user not found",
//       });
//     }

//     const user = existingUser[0];

//     // 2. Check password (bcrypt)
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     console.log("Is password valid:", isPasswordValid);

//     if (!isPasswordValid) {
//       return res.json({
//         message: "invalid password",
//       });
//     }
//    const token = JWT.sign({id:user.id,
//      email: user.email,
//       phone: user.phone,
//        image: user.image}, `our secret key`, { expiresIn: "7d" }
//    )

//     res.json({
//       message: "Login successful",
//       userId: user.id,
//       token: token,
//       user: {
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         image: user.image
//       }
//     });
//   } catch (error) {
//     console.log(error.message);
//     res.json({
//       error: error.message,
//     });
//   }
// };

// export default login;


import db from '../../config/db.js';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [userData] = await db.query("SELECT * FROM users WHERE email=?", [
      email,
    ]);

    if (userData.length === 0) {
      return res.json({
        message: "User not found",
      });
    }

    const user = userData[0];

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.json({
        message: "Invalid password",
      });
    }

    const token = JWT.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        image: user.image,
        role: user.role, // MUST be here
      },
    });
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};

export default login;
