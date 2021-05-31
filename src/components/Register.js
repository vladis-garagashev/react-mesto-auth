import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import AuthForm from './AuthForm';


function Register({handleRegister, isLoading}) {

  return (
    <>
      <Header linkText='Войти' redirectPath='/sign-in'/>
      <div className="auth">
        <h1 className="auth__header">Регистрация</h1>
        <AuthForm handleAuth={handleRegister} isLoading={isLoading} btnText='Зарегестрироваться'/>
        <div className="auth__signin">
          <p className="auth__signin-caption">Уже зарегистрированы?</p>
          <Link to="sign-in" className="auth__login-link">Войти</Link>
        </div>
      </div>
    </>
  );

};

export default Register;
