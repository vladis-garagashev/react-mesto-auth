import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({ isOpen, onCardDelete, card }) {
  const value = useContext(AppContext);

  // Обработчик сабмита формы
  const handleSubmit = (e) => {
    e.preventDefault();
    onCardDelete(card);
  };

  //-----------------------------------

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="delete-card"
      btnText={value.isLoading ? "Удаление..." : "Да."}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    />
  );
}

export default DeleteCardPopup;
