import React from 'react';


function PopupWithForm({name, title, btnText, children, isOpen, onClose, onSubmit}) {

  return (
    <article className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>

      <div className="popup__container">
        <form className="form" method="POST" name={name} noValidate onSubmit={onSubmit}>
          <h3 className="form__heading">{title}</h3>

          {children}

          <button className="form__submit-button" type="submit">{btnText}</button>
          <button className="button button_type_close" type="reset" aria-label="Закрыть" onClick={onClose}></button>
        </form>
      </div>

    </article>
  );

};

export default PopupWithForm;
