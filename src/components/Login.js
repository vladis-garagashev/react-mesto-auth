import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

import Header from "./Header";
import AuthForm from "./AuthForm";

function Login() {
  const value = useContext(AppContext);

  return (
    <>
      <Header linkText="Регистрация" redirectPath="/sign-up" />
      <div className="auth">
        <h1 className="auth__header">Вход</h1>
        <AuthForm handleAuth={value.handleLogin} btnText="Войти" />
      </div>
    </>
  );
}

export default Login;
