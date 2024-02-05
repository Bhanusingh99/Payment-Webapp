import { User } from "../models/user.model.js";
import bcrypt from "bcrypt"
import Jwt from 'jsonwebtoken'
export const signup = async (req,res) => {
    try {
        //fetch data from req.body
        const {email, password,userName,fullName} = req.body;

        //validation
        if(!email || !password || !userName || !fullName){
            return res.status(404).json({
                success:false,
                message:"Field should not be empty"
            })
        }

        //check user exist or not
        const userExist = await User.findOne({email});
        if(userExist){
            return res.status(404).json({
                success:false,
                message:"user already exist"
            })
        }

        //hash Your password
        const hashedPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            email,
            password:hashedPassword,
            userName,
            fullName
        })

        //successfull response
        return res.status(200).json({
            success:true,
            message:"User Created successfull",
            data:user
        })
    } catch (error) {
        console.log(error)
        return error
    }
}

export const logIn = async (req,res) => {
    try {
        //fetch data from user
        const {email,password} = req.body;

        //validation
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"input field sholud not be empty"
            })
        }

        //check user exist of not
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"Create acc first"
            })
        }

        //check password
        const checkPassword = await bcrypt.compare(password,user.password);
        if(!checkPassword){
            return res.status(400).json({
                success:false,
                message:"Password incorrect"
            })
        }
        //create payload
        const payload = {
            name:user.userName,
            email:user.email
        }
        //cretae token
        const token = Jwt.sign(payload,"Aryan",{expiresIn:"2h"});
 
        const option = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 1000),
            httpOnly:true
        }
        //create cookie & response
        return res.cookie("Token",token,option).status(200).json({
            success:true,
            token,
            message:"user successfully loggedIn"
        })

    } catch (error) {
        console.log(error)
        return error
    }
}