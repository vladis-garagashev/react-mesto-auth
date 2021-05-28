import {useState} from 'react';
import { Link } from 'react-router-dom';


function Login() {

  const [data, setData] = useState({
    email: '',
    password: ''
  });

  //-----------------------------------

  // Обработчик изменения инпутов
  function handleChange(evt) {
    const {name, value} = evt.target;
    setData({
      ...data,
      [name] : value
    });
  };

  //-----------------------------------

  // Обработчик сабмита формы
  function handleSubmit(evt) {
    evt.preventDefault();
    const {email, password} = data;
    console.log(email, password);
  };

  //-----------------------------------

  return (
    <div className="auth">
      <h1 className="auth__header">Вход</h1>

      <form className="form form_type_auth" method="POST" name="login" noValidate onSubmit={handleSubmit}  >
          <section className="form__section">
            <input className="form__item form__item_type_auth form__item_element_email " type="email" name="email" id="email" placeholder="Email" value={data.email} onChange={handleChange} required/>
            <span className="login__form-item_error" id="email-error"></span>
          </section>
          <section className="form__section">
            <input className="form__item form__item_type_auth form__item_element_password" type="password" name="password" id="password" placeholder="Пароль" value={data.password} onChange={handleChange} minLength="2" maxLength="200" required/>
            <span className="login__form-item_error" id="password-error"></span>
          </section>

          <button className="form__submit-button form__submit-button_type_white" type="submit">Войти</button>
        </form>
    </div>
  );

};

export default Login;
