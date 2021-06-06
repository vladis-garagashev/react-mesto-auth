import React, { useContext, useState } from "react";
import { AppContext } from "../contexts/AppContext";

function AuthForm({ handleAuth, isLoading, btnText }) {
  const value = useContext(AppContext);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  //-----------------------------------

  // Обработчик изменения инпутов
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  //-----------------------------------

  // Обработчик сабмита формы
  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { email, password } = data;
    handleAuth({ email, password });
  };

  //-----------------------------------

  return (
    <form
      className="form form_type_auth"
      method="POST"
      name="login"
      noValidate
      onSubmit={handleSubmit}
    >
      <section className="form__section">
        <input
          className="form__item form__item_type_auth form__item_element_email "
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          required
        />
        <span className="login__form-item_error" id="email-error"></span>
      </section>

      <section className="form__section">
        <input
          className="form__item form__item_type_auth form__item_element_password"
          type="password"
          name="password"
          id="password"
          placeholder="Пароль"
          value={data.password}
          onChange={handleChange}
          minLength="2"
          maxLength="200"
          required
        />
        <span className="login__form-item_error" id="password-error"></span>
      </section>

      <button
        className="form__submit-button form__submit-button_type_white"
        type="submit"
      >
        {value.isLoading ? "Загрузка..." : btnText}
      </button>
    </form>
  );
}

export default AuthForm;
