import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/header__logo.svg';


function Header({loggedIn, userData, handleLogout, linkText, redirect}) {

  return (
    <header className="header">
      <img className="logo" src={logo} alt="Mesto"/>
      <nav className="menu">
        {loggedIn && <p className="menu__user-info">{userData.email}</p>}
        {loggedIn ? <Link className="menu__link" to="sign-in" onClick={handleLogout}>Выйти</Link> : <Link className="menu__link" to={redirect}>{linkText}</Link>}
      </nav>
    </header>
  );

};

export default Header;
