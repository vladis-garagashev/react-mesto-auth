import { useRef } from 'react';
import PopupWithForm from './PopupWithForm';


function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isLoading}) {

  const avatarRef = useRef();

  //-----------------------------------

  // Обработчик сабмита формы
  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  //-----------------------------------

  return (
    <PopupWithForm title="Обновить аватар" name="edit-avatar" btnText={isLoading ? 'Сохранение...' : 'Сохранить'} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <section className="form__section">
        <input className="form__item form__item_element_image-link" type="url" name="avatar" id="avatar" placeholder="Ссылка на картинку"required ref={avatarRef}/>
        <span className="form__item-error" id="avatar-error"></span>
      </section>
    </PopupWithForm>
  );

};

export default EditAvatarPopup;
