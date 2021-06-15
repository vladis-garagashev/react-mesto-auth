import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

function ImagePopup({ card }) {
  const value = useContext(AppContext);

  //-----------------------------------

  // Обработчик закрытия попапа при нажатии Esc
  const isOpen = !!card;

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
      className={`popup ${card ? "popup_opened" : ""}`}
      onMouseDown={handleOverlayClose}
    >
      <div className="popup__container">
        <figure className="figure">
          <figcaption className="figure__figcaption">
            <img className="figure__image" src={card?.link} alt={card?.name} />
            <p className="figure__caption">{card?.name}</p>
          </figcaption>
          <button
            className="button button_type_close"
            type="reset"
            aria-label="Закрыть"
            onClick={value.onClose}
          ></button>
        </figure>
      </div>
    </article>
  );
}

export default ImagePopup;
