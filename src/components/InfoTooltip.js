import React from 'react';

import successImage from '../images/success__image.svg';
import errorImage from '../images/error__image.svg';

function InfoTooltip({onClose, isOpen, isSuccess}) {
  const image = isSuccess ? successImage : errorImage;
  const caption = isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.';

  return (
    <article className={`popup ${isOpen ? 'popup_opened' : ''}`} onClick={onClose}>

      <div className="popup__container" onClick={e => e.stopPropagation()}>
        <div className="info">
          <img className="info__image" src={image} alt={caption}/>
          <p className="info__caption">{caption}</p>
          <button className="button button_type_close" type="reset" aria-label="Закрыть" onClick={onClose}></button>
        </div>
      </div>

    </article>
  );

};

export default InfoTooltip;
