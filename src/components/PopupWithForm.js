import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

function PopupWithForm({ name, title, btnText, children, isOpen, onSubmit }) {
  const value = useContext(AppContext);

  return (
    <article
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}
      onClick={value.onClose}
    >
      <div className="popup__container" onClick={(e) => e.stopPropagation()}>
        <form
          className="form"
          method="POST"
          name={name}
          noValidate
          onSubmit={onSubmit}
        >
          <h3 className="form__heading">{title}</h3>

          {children}

          <button className="form__submit-button" type="submit">
            {btnText}
          </button>
          <button
            className="button button_type_close"
            type="reset"
            aria-label="Закрыть"
            onClick={value.onClose}
          ></button>
        </form>
      </div>
    </article>
  );
}

export default PopupWithForm;
