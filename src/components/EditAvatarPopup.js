import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/AppContext";

import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onUpdateAvatar, isLoading }) {
  const value = useContext(AppContext);

  const [data, setData] = useState({
    avatar: "",
  });

  //-----------------------------------

  useEffect(() => {
    setData({
      avatar: "",
    });
  }, [isOpen]);

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
  const handleSubmit = (e) => {
    e.preventDefault();

    onUpdateAvatar({
      avatar: data.avatar,
    });
  };

  //-----------------------------------

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="edit-avatar"
      btnText={value.isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <section className="form__section">
        <input
          className="form__item form__item_element_image-link"
          type="url"
          name="avatar"
          id="avatar"
          placeholder="Ссылка на картинку"
          value={data.avatar}
          onChange={handleChange}
          required
        />
        <span className="form__item-error" id="avatar-error"></span>
      </section>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
