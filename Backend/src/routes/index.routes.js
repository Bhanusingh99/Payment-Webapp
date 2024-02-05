import express from "express";
import { logIn, signup } from "../controllers/auth.controllers.js";
import { checkAuth } from "../middlewares/auth.middleware.js";

const userRouter = express.Router();
userRouter.post('/sign-up',signup)
userRouter.post('/sign-in',logIn)
userRouter.get('/aryan',checkAuth,(req,res) => {
    return res.status(200).json({
        success:true,
        message:"your can access this protected route"
    })
})

export default userRouter;