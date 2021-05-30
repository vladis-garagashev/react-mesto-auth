import { useState } from 'react';
import PopupWithForm from './PopupWithForm';


function AddPlacePopup({isOpen, onClose, onAddPlace, isLoading}) {

  const [data, setData] = useState({
    name: '',
    link: ''
  });

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

    onAddPlace({
      name: data.name,
      link: data.link
    });
  };

  //-----------------------------------

  return (
    <PopupWithForm title="Новое место" name="add-card" btnText={isLoading ? 'Сохранение...' : 'Сохранить'} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <section className="form__section">
        <input className="form__item form__item_element_name" type="text" name="name" id="image-name" placeholder="Название" value={data.name} onChange={handleChange} minLength="2" maxLength="30" required/>
        <span className="form__item-error" id="image-name-error"></span>
      </section>
      <section className="form__section">
        <input className="form__item form__item_element_image-link" type="url" name="link" id="image-link" placeholder="Ссылка на картинку" value={data.link} onChange={handleChange} required/>
        <span className="form__item-error" id="image-link-error"></span>
      </section>
    </PopupWithForm>
  );

};

export default AddPlacePopup;
