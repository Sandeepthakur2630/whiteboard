import React from "react";
import Slider from "./Slider";
import { useAuth } from "../context/AuthContext";

const Login = ({ title }) => {
  const { onLogin } = useAuth();

  const handleClick = () => {
    onLogin();
  };
  return (
    <div className=" rounded-[33px]">
      <div>
        <Slider />
      </div>
      <div className="w-[570px] h-[344px] bg-[#FFFFFF] flex flex-col gap-5 justify-center items-center rounded-[33px]">
        <div className="">
          <input
            className="pl-[25px] flex items-center justify-center w-[487px] h-[64px] rounded-[32px] bg-[#EFEFEF]"
            type="text"
            placeholder="Username"
          />
        </div>
        <div>
          <input
            className="pl-[25px] w-[487px] h-[64px] rounded-[32px] bg-[#EFEFEF]"
            type="text"
            placeholder="password"
          />
        </div>
        <div className="text-[white] bg-[#2670FF] rounded-[32px] w-[487px] h-[64px] flex items-center justify-center">
          <button onClick={handleClick}>{title}</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
