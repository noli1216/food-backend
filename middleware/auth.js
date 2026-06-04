import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const header = req.headers.authorization;

  console.log("TOKEN:", header);
  console.log("SECRET:", process.env.JWT_SECRET);

  if (!header) {
    return res.status(401).json({ message: "No token" });
  }

  // 🔥 FIX HERE
  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("USER FROM TOKEN:", decoded);

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default auth;
