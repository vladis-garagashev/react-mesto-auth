import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

function PopupWithForm({
  name,
  title,
  btnText,
  children,
  isOpen,
  onSubmit,
  isValid,
}) {
  const value = useContext(AppContext);

  //-----------------------------------

  // Обработчик закрытия попапа при нажатии Esc
  React.useEffect(() => {
    if (!isOpen) return;
    const handleEscapeClose = (event) => {
      if (event.key === "Escape") {
        value.onClose();
      }
    };
    document.addEventListener("keydown", handleEscapeClose);
    return () => {
      document.removeEventListener("keydown", handleEscapeClose);
    };
  }, [isOpen, value.onClose]);

  // Обработчик закрытия попапа при клике по оверлею
  const handleOverlayClose = (event) => {
    if (event.target === event.currentTarget && isOpen) {
      value.onClose();
    }
  };

  //-----------------------------------

  return (
    <article
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}
      onMouseDown={handleOverlayClose}
    >
      <div className="popup__container">
        <form
          className="form"
          method="POST"
          name={name}
          noValidate
          onSubmit={onSubmit}
        >
          <h3 className="form__heading">{title}</h3>

          {children}

          <button
            className={`form__submit-button ${
              !isValid && "form__submit-button_disabled"
            }`}
            type="submit"
          >
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
