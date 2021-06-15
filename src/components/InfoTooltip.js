import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

import successImage from "../images/success__image.svg";
import errorImage from "../images/error__image.svg";

function InfoTooltip({ isOpen, isSuccess }) {
  const value = useContext(AppContext);

  const image = isSuccess ? successImage : errorImage;
  const caption = isSuccess
    ? "Вы успешно зарегистрировались!"
    : "Что-то пошло не так! Попробуйте ещё раз.";

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
      className={`popup ${isOpen ? "popup_opened" : ""}`}
      onMouseDown={handleOverlayClose}
    >
      <div className="popup__container">
        <div className="info">
          <img className="info__image" src={image} alt={caption} />
          <p className="info__caption">{caption}</p>
          <button
            className="button button_type_close"
            type="reset"
            aria-label="Закрыть"
            onClick={value.onClose}
          ></button>
        </div>
      </div>
    </article>
  );
}

export default InfoTooltip;
