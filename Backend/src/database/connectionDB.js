import mongoose from "mongoose";

export const connectionDB = async () =>{
    try {
        await mongoose.connect("mongodb+srv://LMS123:LMS123@cluster0.stbbwyu.mongodb.net/RealDb")
        console.log("MongoDB is connected successfully")
    } catch (error) {
        console.log(error)
        throw error
    }
}