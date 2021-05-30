import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/header__logo.svg';


function Header({loggedIn, userData, handleLogout, linkText, redirectPath, handleMenuClick, isOpen}) {

  const menuClassName = (
    `menu ${isOpen && 'menu_opened'}`
  );

  const buttonClassName = (
    `button button_type_menu ${isOpen && 'button_type_menu_active'}`
  );

  return (
    <header className="header">
      <img className="logo" src={logo} alt="Mesto"/>
      <nav className={menuClassName}>
        {loggedIn && <p className="menu__user-info">{userData.email}</p>}
        {loggedIn ? <Link className="menu__link" to="sign-in" onClick={handleLogout}>Выйти</Link> : <Link className="menu__link" to={redirectPath}>{linkText}</Link>}
      </nav>
      <button className={buttonClassName} onClick={handleMenuClick} ></button>
    </header>
  );

};

export default Header;
