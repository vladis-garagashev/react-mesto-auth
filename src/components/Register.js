import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import AuthForm from "./AuthForm";

import { AppContext } from "../contexts/AppContext";

function Register() {
  const value = useContext(AppContext);

  return (
    <>
      <Header linkText="Войти" redirectPath="/sign-in" />
      <div className="auth">
        <h1 className="auth__header">Регистрация</h1>
        <AuthForm
          handleAuth={value.handleRegister}
          btnText="Зарегестрироваться"
        />
        <div className="auth__signin">
          <p className="auth__signin-caption">Уже зарегистрированы?</p>
          <Link to="sign-in" className="auth__login-link">
            Войти
          </Link>
        </div>
      </div>
    </>
  );
}

export default Register;
