import { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';


function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isLoading}) {

  const [data, setData] = useState({
    avatar: ''
  });

  //-----------------------------------

  useEffect(() => {
    setData({
      avatar : ''
    });
  }, [isOpen])

  //-----------------------------------

  // Обработчик изменения инпутов
  function handleChange(evt) {
    const {name, value} = evt.target;
    setData({
      ...data,
      [name] : value
    });
  };

  //-----------------------------------

  // Обработчик сабмита формы
  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: data.avatar
    });
  }

  //-----------------------------------

  return (
    <PopupWithForm title="Обновить аватар" name="edit-avatar" btnText={isLoading ? 'Сохранение...' : 'Сохранить'} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <section className="form__section">
        <input className="form__item form__item_element_image-link" type="url" name="avatar" id="avatar" placeholder="Ссылка на картинку" value={data.avatar} onChange={handleChange} required/>
        <span className="form__item-error" id="avatar-error"></span>
      </section>
    </PopupWithForm>
  );

};

export default EditAvatarPopup;
