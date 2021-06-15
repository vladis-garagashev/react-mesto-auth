import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/AppContext";
import { useFormValidation } from "../hooks/useForm";

function AuthForm({ handleAuth, btnText }) {
  const value = useContext(AppContext);

  const { values, handleChange, resetFrom, errors, isValid } =
    useFormValidation();

  //-----------------------------------

  // Сброс полей формы
  useEffect(() => {
    resetFrom({});
  }, [resetFrom]);

  //-----------------------------------

  // Обработчик сабмита формы
  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleAuth(values);
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
          value={values.email}
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
          value={values.password}
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
