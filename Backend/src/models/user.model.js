import mongoose ,{Schema}from "mongoose";

const userSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    fullName:{
        type:String,
        required:true
    }
})

export const User = mongoose.model("user",userSchema);