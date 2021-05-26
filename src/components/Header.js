import {useContext} from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/header__logo.svg';

function Header({loggedIn}) {

  return (
    <header className="header">
      <img className="logo" src={logo} alt="Mesto"/>
      <nav className="menu">
        {loggedIn && <p className="menu__user-info">Email</p>}
        {loggedIn
          ? <Link className="menu__link" to="sign-in">Выйти</Link>
          : <Link className="menu__link" to="sign-up">Регистрация</Link>}

      </nav>
    </header>
  );

};

export default Header;
