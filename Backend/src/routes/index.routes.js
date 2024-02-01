import { Router } from "express";
import { createUser, loginUser, jiyaChut } from "../controllers/auth.controllers.js";
import authMiddleware from "../middlewares/auth.js";

const rootRouter = Router();

// Uncomment if you want to use the userRouter
rootRouter.post("/sign-up", createUser);
rootRouter.post('/sign-in',loginUser)
rootRouter.get("/jiya",authMiddleware,jiyaChut)

export default rootRouter
