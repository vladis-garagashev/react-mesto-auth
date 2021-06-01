import React from 'react';


function ImagePopup({card, onClose}) {

  return (
    <article className={`popup ${card ? 'popup_opened' : ''}`} onClick={onClose}>

      <div className="popup__container" onClick={e => e.stopPropagation()}>
        <figure className="figure">
          <figcaption className="figure__figcaption">
            <img className="figure__image" src={card?.link} alt={card?.name}/>
            <p className="figure__caption">{card?.name}</p>
          </figcaption>
          <button className="button button_type_close" type="reset" aria-label="Закрыть" onClick={onClose}></button>
        </figure>
      </div>

    </article>
  );

};

export default ImagePopup;
