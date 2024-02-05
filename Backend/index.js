import express from "express";
import cors from "cors";
import rootRouter from "./src/routes/index.routes.js";
import { connectionDB } from "./src/database/connectionDB.js";
import cookieParser from "cookie-parser";

const app = express();

// Fix cors usage
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", rootRouter);
connectionDB();

app.listen(3000, () => {
  console.log("App is listening on Port 3000");
});
