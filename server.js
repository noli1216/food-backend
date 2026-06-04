import dotenv from "dotenv";
dotenv.config();

import express from "express";
import router from "./routers/router.js";
import db from "./config/db.js";
import cors from "cors";

const app = express();
const port = 3001;
app.use(cors());
app.use(express.json());
app.use("/api", router);
app.get("/", (req, res) => {
  res.json({
    msg: `Mesi Catering Backend Running `,
  });
});
//basic router
//dynamic router
//query string router

app.listen(port, () => {
  console.log(`server running http://localhost:${port}`);
});
