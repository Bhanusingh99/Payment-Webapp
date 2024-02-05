import React, { useState } from "react";
import womenImage from "../assets/images/women.jpg";
import Header from "./shared/Header";
import { Input } from "./shared/Input";
import SubHeading from "./shared/SubHeading";
import Button from "./shared/Btn";
import DontHave from "./shared/DontHave";

const Signin = () => {
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  return (
      <div className="flex w-full h-[100vh] bg-[#3B4B7F] justify-center items-center">
        <div className="w-[60%] h-[70%] bg-white max-md:w-[80%] max-md:h-[75%] flex">
          <div className="w-[50%] h-[100%] max-md:hidden">
            <img src={womenImage} alt="Women" className="h-full" />
          </div>
          <div className="bg-[#fff] w-[50%] max-md:w-full py-5 px-10 mt-16">
            <Header lable={"Log-in"} />
            <SubHeading label={"Enter your infromation to Log-in"} />

            <Input placeholder="Bhanu99" onChange={e => {
              setFirstName(e.target.value)
            }}label={"Username"} />

            <Input placeholder="*******" onChange={e => {
              setFirstName(e.target.value)
            }}label={"Password"} />

            <div className="text-center mt-7">
                <Button label={"Log-in"} />
            </div>
            <DontHave 
            label={"Create a account"}
            text={"sign-up"}
            href={'/signup'}
            />
          </div>
        </div>
      </div>
  );
};

export default Signin;
