import React, { useContext, useEffect } from "react";
import { AppContext } from "../contexts/AppContext";

import PopupWithForm from "./PopupWithForm";
import { useFormValidation } from "../hooks/useForm";

function AddPlacePopup({ isOpen, onAddPlace }) {
  const value = useContext(AppContext);

  const { inputValues, handleChange, resetFrom, errors, isValid } =
    useFormValidation();

  //-----------------------------------

  // Сброс полей формы
  useEffect(() => {
    resetFrom();
  }, [isOpen, resetFrom]);

  //-----------------------------------

  // Обработчик сабмита формы
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace(inputValues);
  };

  //-----------------------------------

  return (
    <PopupWithForm
      title="Новое место"
      name="add-card"
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
          id="image-name"
          placeholder="Название"
          value={inputValues.name}
          onChange={handleChange}
          minLength="2"
          maxLength="30"
          required
        />
        <span className="form__item-error" id="image-name-error">
          {errors.name || ""}
        </span>
      </section>
      <section className="form__section">
        <input
          className="form__item form__item_element_image-link"
          type="url"
          name="link"
          id="image-link"
          placeholder="Ссылка на картинку"
          value={inputValues.link}
          onChange={handleChange}
          required
        />
        <span className="form__item-error" id="image-link-error">
          {errors.link || ""}
        </span>
      </section>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
