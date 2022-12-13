import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
const Context = createContext({});
const AuthProvider = (props) => {
  const navigate = useNavigate();
  const onLogin = () => {
    navigate("/drawingPage");
    console.log("hoeeo");
  };
  return (
    <>
      <Context.Provider value={{ onLogin }}>{props.children}</Context.Provider>
    </>
  );
};

export const useAuth = () => {
  const val = useContext(Context);
  return val;
};

export default AuthProvider;
