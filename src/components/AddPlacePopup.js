import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../contexts/AppContext";

import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onAddPlace }) {
  const value = useContext(AppContext);

  const [data, setData] = useState({
    name: "",
    link: "",
  });

  //-----------------------------------

  useEffect(() => {
    setData({
      name: "",
      link: "",
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

    onAddPlace({
      name: data.name,
      link: data.link,
    });
  };

  //-----------------------------------

  return (
    <PopupWithForm
      title="Новое место"
      name="add-card"
      btnText={value.isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <section className="form__section">
        <input
          className="form__item form__item_element_name"
          type="text"
          name="name"
          id="image-name"
          placeholder="Название"
          value={data.name}
          onChange={handleChange}
          minLength="2"
          maxLength="30"
          required
        />
        <span className="form__item-error" id="image-name-error"></span>
      </section>
      <section className="form__section">
        <input
          className="form__item form__item_element_image-link"
          type="url"
          name="link"
          id="image-link"
          placeholder="Ссылка на картинку"
          value={data.link}
          onChange={handleChange}
          required
        />
        <span className="form__item-error" id="image-link-error"></span>
      </section>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
