// backend/index.js
import express from "express"
import cors from "cors"
import rootRouter from "./src/routes/index.routes.js";
import { connectionDB } from "./src/database/connectionDB.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", rootRouter);
connectionDB();

app.listen(3000,()=>{
    console.log("App is listining on Port 3000")
})