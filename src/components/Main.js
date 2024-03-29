import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import Card from "./Card";
import Header from "./Header";

function Main({
  cards,
  onCardLike,
  onCardDelete,
  onEditProfile,
  onEditAvatar,
  onAddPlace,
  onCardClick,
  handleLogout,
  isMenuOpen,
  onMenuClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <Header
        handleLogout={handleLogout}
        isOpen={isMenuOpen}
        handleMenuClick={onMenuClick}
      />
      <main className="content">
        <section className="profile">
          <div className="profile__avatar">
            <img
              className="profile__avatar-image"
              src={currentUser?.avatar}
              alt={currentUser?.name}
            />
            <button
              type="button"
              className="button button_type_edit-avatar"
              aria-label="Изменить аватар"
              onClick={onEditAvatar}
            ></button>
          </div>

          <div className="profile__info">
            <h1 className="profile__name">{currentUser?.name}</h1>
            <button
              type="button"
              className="button button_type_edit"
              aria-label="Редактировать профиль"
              onClick={onEditProfile}
            ></button>
            <p className="profile__job">{currentUser?.about}</p>
          </div>

          <button
            type="button"
            className="button button_type_add"
            aria-label="Добавить фото"
            onClick={onAddPlace}
          ></button>
        </section>

        <section className="cards">
          <ul className="cards__list">
            {cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}

export default Main;
