import express from "express";
import { findUser, logIn, signup, updatePassword, getBalance, tranferMoney} from "../controllers/auth.controllers.js";
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

userRouter.put("/update-password",checkAuth,updatePassword)
userRouter.get('/bulk',findUser);
userRouter.get('/get-balance',checkAuth,getBalance)
userRouter.post("/transfer-money",checkAuth,tranferMoney)

export default userRouter;