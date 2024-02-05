import React from "react";
import womenImage from "../assets/images/women.jpg";
import Header from "./shared/Header";
import { Input } from "./shared/Input";
import SubHeading from "./shared/SubHeading";
import Button from "./shared/Btn";
import DontHave from "./shared/DontHave";

const Signup = () => {
  return (
      <div className="flex w-full h-[100vh] bg-[#3B4B7F] justify-center items-center">
        <div className="w-[60%] h-[70%] bg-white max-md:w-[80%] max-md:h-[85%] flex">
          <div className="w-[50%] h-[100%] max-md:hidden">
            <img src={womenImage} alt="Women" className="h-full" />
          </div>
          <div className="bg-[#fff] w-[50%] max-md:w-full py-5 px-10">
            <Header lable={"Sign-up"} />
            <SubHeading label={"Enter your infromation to create an account"} />
            <Input placeholder="Bhanu" label={"First Name"} />
            <Input placeholder="Singh" label={"Last Name"} />
            <Input placeholder="Bhanu99" label={"Username"} />
            <Input placeholder="*******" label={"Password"} />
            <div className="text-center mt-7">
                <Button label={"sign-up"} />
            </div>
            <DontHave 
            label={"Already have account"}
            text={"log-in"}
            href={'/signin'}
            />
          </div>
        </div>
      </div>
  );
};

export default Signup;
