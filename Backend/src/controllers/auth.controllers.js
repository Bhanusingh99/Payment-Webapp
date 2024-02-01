import jwt from "jsonwebtoken";
import {User} from "../models/user.model.js" // Assuming your User model is in the "models" directory
import { createUserSchema } from "../utils/validation.js"; // Import the Zod validation schema
import bcrypt from "bcrypt"

export const createUser = async (req, res) => {
    try {
        const { userName, firstName, lastName, password } = req.body;

        // Validate input using Zod schema
        try {
            createUserSchema.parse({ userName, firstName, lastName, password });
        } catch (validationError) {
            return res.status(400).json({
                success: false,
                message: validationError.errors.map((error) => error.message),
            });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ userName });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Username is already taken",
            });
        }


        //Hash Password
        const hashedPassword = await bcrypt.hash(password,10)

        //Create user
        const user  = await User.create({
            userName,
            firstName,
            lastName,
            password:hashedPassword
        })

        // You may want to generate a token for authentication at this point

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data:user
            // Optionally, you can include additional data like a token or user details in the response
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};



export const loginUser = async (req, res) => {
    try {
        const { userName, password } = req.body;

        if(!userName || !password){
            return res.status(400).json({
                success:false,
                message:"Input filed should not be empty"
            })
        }

        // Check if the user exists
        const user = await User.findOne({ userName });
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not registerd, create a account first"
            })
        }


        // Generate JWT token
        if (user) {
            const token = jwt.sign({
                userId: user._id
            }, "Jiya");
      
            res.json({
                token: token
            })
            return;
        }

        // Optionally, you can also send the token as a cookie
        // res.cookie("token", token, { httpOnly: true, maxAge: 3600000 }); // 1 hour expiration
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const jiyaChut = async (req,res) => {
    try {
        res.send("suno na sangmarmar");
    } catch (error) {
        console.log(error)
        throw error
    }
}