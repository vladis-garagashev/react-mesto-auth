import { useState } from 'react';
import PopupWithForm from './PopupWithForm';


function AddPlacePopup({isOpen, onClose, onAddPlace, isLoading}) {

  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  //-----------------------------------

  // Обработчики изменения инпутов обновляют стейты
  function handleNameChange(e) {
    setName(e.target.value);
  };
  function handleLinkValueChange(e) {
    setLink(e.target.value);
  };

  //-----------------------------------

  // Обработчик сабмита формы
  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name,
      link,
    });
  };

  //-----------------------------------

  return (
    <PopupWithForm title="Новое место" name="add-card" btnText={isLoading ? 'Сохранение...' : 'Сохранить'} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <section className="form__section">
        <input className="form__item form__item_element_name" type="text" name="name" id="image-name" placeholder="Название" value={name || ''} onChange={handleNameChange} minLength="2" maxLength="30" required/>
        <span className="form__item-error" id="image-name-error"></span>
      </section>
      <section className="form__section">
        <input className="form__item form__item_element_image-link" type="url" name="link" id="image-link" placeholder="Ссылка на картинку" value={link || ''} onChange={handleLinkValueChange} required/>
        <span className="form__item-error" id="image-link-error"></span>
      </section>
    </PopupWithForm>
  );

};

export default AddPlacePopup;
