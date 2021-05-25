import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Card({card, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  //-----------------------------------

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `button button_type_like ${isLiked ? 'button_type_like_active' : ''}`
  );
  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `button ${isOwn ? 'button_type_delete' : 'button_type_delete_hidden'}`
  );

  //-----------------------------------

  function handleClick() {
    onCardClick(card);
  };

  function handleLikeClick() {
    onCardLike(card);
  };

  function handleDeleteClick() {
    onCardDelete(card);
  };

  //-----------------------------------

  return (

    <li className="card">
      <img className="card__image" src={card.link} alt={card.name} onClick={handleClick}/>
      <div className="card__content">
        <h2 className="card__heading">{card.name}</h2>
        <div className="card__like">
          <button type="button"
            className={cardLikeButtonClassName}
            aria-label="Лайк"
            onClick={handleLikeClick}></button>
          <p className="card__likes-counter">{card.likes.length}</p>
        </div>
        <button
          type="button"
          className={cardDeleteButtonClassName}
          aria-label="Удалить карточку"
          onClick={handleDeleteClick}></button>
      </div>
    </li>
  );

};

export default Card;

