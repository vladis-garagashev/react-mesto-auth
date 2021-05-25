import { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';


function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoading}) {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  //-----------------------------------

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser?.name);
    setDescription(currentUser?.about);
  }, [currentUser, isOpen]);

  //-----------------------------------

  // Обработчики изменения инпутов обновляют стейты
  function handleNameChange(e) {
    setName(e.target.value);
  };
  function handleDescriptionValueChange(e) {
    setDescription(e.target.value);
  };

  //-----------------------------------

  // Обработчик сабмита формы
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description
    });
  }

  //-----------------------------------

  return (
    <PopupWithForm title="Редактировать профиль" name="edit-profile" btnText={isLoading ? 'Сохранение...' : 'Сохранить'} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <section className="form__section">
        <input className="form__item form__item_element_name" type="text" name="name" id="name" placeholder="Имя" value={name || ''} onChange={handleNameChange} minLength="2" maxLength="40" required/>
        <span className="form__item-error" id="name-error"></span>
      </section>
      <section className="form__section">
        <input className="form__item form__item_element_job" type="text" name="about" id="about" placeholder="О себе" value={description || ''} onChange={handleDescriptionValueChange} minLength="2" maxLength="200" required/>
        <span className="form__item-error" id="about-error"></span>
      </section>
    </PopupWithForm>
  );

};

export default EditProfilePopup;
