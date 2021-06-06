import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

import { Link } from "react-router-dom";
import logo from "../images/header__logo.svg";

function Header({
  handleLogout,
  linkText,
  redirectPath,
  handleMenuClick,
  isOpen,
}) {
  const value = useContext(AppContext);

  const headerClassName = `header ${value.loggedIn && "header_type_mobile"}`;

  const menuClassName = `menu ${value.loggedIn && "menu_type_mobile"} ${
    isOpen && "menu_opened"
  }`;

  const buttonClassName = `button button_type_menu ${
    isOpen && "button_type_menu_active"
  }`;

  return (
    <header className={headerClassName}>
      <img className="logo" src={logo} alt="Mesto" />
      <nav className={menuClassName}>
        {value.loggedIn && (
          <p className="menu__user-info">{value.userData.email}</p>
        )}
        {value.loggedIn ? (
          <Link
            className="menu__link menu__link_type_mobile"
            to="sign-in"
            onClick={handleLogout}
          >
            Выйти
          </Link>
        ) : (
          <Link className="menu__link" to={redirectPath}>
            {linkText}
          </Link>
        )}
      </nav>
      {value.loggedIn && (
        <button className={buttonClassName} onClick={handleMenuClick}></button>
      )}
    </header>
  );
}

export default Header;
