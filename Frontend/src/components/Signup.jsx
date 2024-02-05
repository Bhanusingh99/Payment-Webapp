import React, { useState } from "react";
import womenImage from "../assets/images/women.jpg";
import Header from "./shared/Header";
import { Input } from "./shared/Input";
import SubHeading from "./shared/SubHeading";
import Button from "./shared/Btn";
import DontHave from "./shared/DontHave";
import axios from "axios";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex w-full h-[100vh] bg-[#3B4B7F] justify-center items-center">
      <div className="w-[60%] h-[70%] bg-white max-md:w-[80%] max-md:h-[85%] flex">
        <div className="w-[50%] h-[100%] max-md:hidden">
          <img src={womenImage} alt="Women" className="h-full" />
        </div>
        <div className="bg-[#fff] w-[50%] max-md:w-full py-5 px-10">
          <Header lable={"Sign-up"} />
          <SubHeading label={"Enter your infromation to create an account"} />

          <Input
            placeholder="Bhanu"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            label={"First Name"}
          />

          <Input
            placeholder="Singh"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            label={"Last Name"}
          />

          <Input
            placeholder="Bhanu99"
            onChange={(e) => {
              setusername(e.target.value);
            }}
            label={"Username"}
          />

          <Input
            placeholder="*******"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            label={"Password"}
          />

          <div className="text-center mt-7">
          <Button
  label={"sign-up"}
  onClick={async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/sign-up", {
        username,
        firstName,
        lastName,
        password,
      })
        .then((response) => {
          // Handle success, if needed
          console.log(response);
          console.log(response.data.token);

          // Store the token in local storage
          localStorage.setItem("token", response.data.token);
        })
        .catch((error) => {
          // Handle error, if needed
          console.error(error);
        });
    } catch (error) {
      // Handle other errors
      console.error(error);
    }
  }}
/>

          </div>
          <DontHave
            label={"Already have account"}
            text={"log-in"}
            href={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
