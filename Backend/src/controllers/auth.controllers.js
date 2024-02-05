import { Account, User } from "../models/user.model.js";
import bcrypt from "bcrypt"
import Jwt from 'jsonwebtoken'
import mongoose from "mongoose";

const randomNumber = () => {
    const balance = Math.floor(Math.random() * 1000) + 1;
    return balance;
}


export const signup = async (req,res) => {
    try {
        //fetch data from req.body
        const {username, password,firstName,lastName} = req.body;

        //validation
        if(!username || !password || !lastName || !firstName){
            return res.status(404).json({
                success:false,
                message:"Field should not be empty"
            })
        }

        //check user exist or not
        const userExist = await User.findOne({username});
        if(userExist){
            return res.status(404).json({
                success:false,
                message:"user already exist"
            })
        }

        //hash Your password
        const hashedPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            username,
            password:hashedPassword,
            firstName,
            lastName
        })

        const balance = randomNumber();
        const givebalance = await Account.create({
            userId:user._id,
            balance:balance
        })
        const payLoad = {
            username:username
        }
        const token = Jwt.sign(payLoad,"Aryan",{expiresIn:"2h"})
        //successfull response
        return res.status(200).json({
            success:true,
            message:"User Created successfull",
            token:token
        })
    } catch (error) {
        console.log(error)
        return error
    }
}

export const logIn = async (req,res) => {
    try {
        //fetch data from user
        const {username,password} = req.body;

        //validation
        if(!username || !password){
            return res.status(400).json({
                success:false,
                message:"input field sholud not be empty"
            })
        }

        //check user exist of not
        const user = await User.findOne({username});
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
            name:user.username,
            id:user._id
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

export const updatePassword = async (req, res) => {
    try {
        const { username, oldPassword, newPassword } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

        if (!isPasswordCorrect) {
            return res.status(400).json({
                success: false,
                message: "Incorrect old password",
            });
        }

        // If old password is correct, update the password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await User.findOneAndUpdate(
            { username },
            { password: hashedNewPassword }
        );

        return res.status(200).json({
            success: true,
            message: "Your password updated successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong, please try again later",
        });
    }
};

export const findUser =  async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    return res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
}

export const getBalance = async (req,res) => {
    try {
        const userId = req.user.id;
        const balance = await Account.findOne({userId})
        return res.status(200).json({
            success:true,
            message:"This is your balance",
            balance:balance
        })
    } catch (error) {
        console.log(error)
        return error
    }
}

export const tranferMoney = async (req, res) => {
    try {
        const session = await mongoose.startSession();

        session.startTransaction();
        const { amount, to } = req.body;
    
        // Fetch the accounts within the transaction
        const userAccount = await Account.findOne({ userId: req.user.id }).session(session);
    
        if (!userAccount || userAccount.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Insufficient balance"
            });
        }
    
        const toAccount = await Account.findOne({ userId: to }).session(session);
    
        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid account"
            });
        }
    
        // Perform the transfer
        await Account.updateOne({ userId: req.user.id }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);
    
        // Commit the transaction
        await session.commitTransaction();
    
        return res.json({
            message: "Transfer successful"
        });
    }catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later."
        });
    }    
};