import React, { useContext, useEffect } from "react";
import { AppContext } from "../contexts/AppContext";

import PopupWithForm from "./PopupWithForm";
import { useFormValidation } from "../hooks/useForm";

function EditAvatarPopup({ isOpen, onUpdateAvatar }) {
  const value = useContext(AppContext);

  const { values, handleChange, resetFrom, errors, isValid } =
    useFormValidation();

  //-----------------------------------

  // Сброс полей формы
  useEffect(() => {
    resetFrom({});
  }, [isOpen, resetFrom]);

  //-----------------------------------

  // Обработчик сабмита формы
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar(values);
  };

  //-----------------------------------

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="edit-avatar"
      btnText={value.isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <section className="form__section">
        <input
          className="form__item form__item_element_image-link"
          type="url"
          name="avatar"
          id="avatar"
          placeholder="Ссылка на картинку"
          value={values.avatar}
          onChange={handleChange}
          required
        />
        <span className="form__item-error" id="avatar-error">
          {errors.avatar || ""}
        </span>
      </section>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
