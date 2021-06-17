import React, {  useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { AppContext } from "../contexts/AppContext";

import PopupWithForm from "./PopupWithForm";
import { useFormValidation } from "../hooks/useForm";

function EditProfilePopup({ isOpen, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const value = useContext(AppContext);

  const { inputValues, handleChange, resetFrom, errors, isValid } =
    useFormValidation();

  //-----------------------------------

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    if (currentUser) {
      resetFrom(currentUser, {}, true);
    }
  }, [currentUser, resetFrom]);

  //-----------------------------------

  // Обработчик сабмита формы
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(inputValues);
  };

  //-----------------------------------

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      btnText={value.isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <section className="form__section">
        <input
          className="form__item form__item_element_name"
          type="text"
          name="name"
          id="name"
          placeholder="Имя"
          value={inputValues.name || ""}
          onChange={handleChange}
          minLength="2"
          maxLength="40"
          required
        />
        <span className="form__item-error" id="name-error">
          {errors.name || ""}
        </span>
      </section>
      <section className="form__section">
        <input
          className="form__item form__item_element_job"
          type="text"
          name="about"
          id="about"
          placeholder="О себе"
          value={inputValues.about || ""}
          onChange={handleChange}
          minLength="2"
          maxLength="200"
          required
        />
        <span className="form__item-error" id="about-error">
          {errors.about || ""}
        </span>
      </section>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
