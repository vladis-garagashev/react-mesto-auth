import {useState} from 'react';
import { Link, withRouter } from 'react-router-dom';


function Register() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //-----------------------------------

  // Обработчики изменения инпутов обновляют стейты
  function handleEmailChange(e) {
    setEmail(e.target.value);
  };
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  };

  //-----------------------------------

  return (
    <div className="auth">
      <h1 className="auth__header">Регистрация</h1>

      <form className="form form_type_auth" method="POST" name="login" noValidate>
          <section className="form__section">
            <input className="form__item form__item_type_auth form__item_element_email " type="email" name="email" id="email" placeholder="Email" value={email || ''} onChange={handleEmailChange} required/>
            <span className="login__form-item_error" id="email-error"></span>
          </section>
          <section className="form__section">
            <input className="form__item form__item_type_auth form__item_element_password" type="password" name="password" id="password" placeholder="Пароль" value={password || ''} onChange={handlePasswordChange} minLength="2" maxLength="200" required/>
            <span className="login__form-item_error" id="password-error"></span>
          </section>

          <button className="form__submit-button form__submit-button_type_white" type="submit">Зарегистрироваться</button>
        </form>

        <div className="auth__signin">
          <p className="auth__signin-caption">Уже зарегистрированы?</p>
          <Link to="login" className="auth__login-link">Войти</Link>
        </div>

    </div>
  );

};

export default withRouter(Register);
