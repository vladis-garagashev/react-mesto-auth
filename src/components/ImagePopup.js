import React, { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

function ImagePopup({ card }) {
  const value = useContext(AppContext);

  return (
    <article
      className={`popup ${card ? "popup_opened" : ""}`}
      onClick={value.onClose}
    >
      <div className="popup__container" onClick={(e) => e.stopPropagation()}>
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
