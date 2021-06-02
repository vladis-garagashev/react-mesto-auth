import React from 'react';
import PopupWithForm from './PopupWithForm';


function DeleteCardPopup({isOpen, onClose, isLoading, onCardDelete, card}) {

  // Обработчик сабмита формы
  const handleSubmit = (e) => {
    e.preventDefault();
    onCardDelete(card);
  };

  //-----------------------------------

  return (
    <PopupWithForm title="Вы уверены?" name="delete-card" btnText={isLoading ? 'Удаление...' : 'Да.'} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}/>
  );

};

export default DeleteCardPopup;
