import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import useMediaQuery from "react-hook-media-query";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { AppContext } from "../contexts/AppContext";

import ProtectedRoute from "./ProtectedRoute";
import Main from "./Main";
import Login from "./Login";
import Register from "./Register";
import Footer from "./Footer";
import InfoTooltip from "./InfoTooltip";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import ImagePopup from "./ImagePopup";

import api from "../utils/api";
import * as auth from "../utils/auth";

function App() {
  const [currentUser, setCurrentUser] = useState();
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false);
  const [selectedDeleteCard, setSelectedDeleteCard] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [userData, setUserData] = useState({
    email: "",
    _id: "",
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);

  const history = useHistory();

  const mobileWidth = useMediaQuery("(max-width: 767px)");

  //-----------------------------------

  useEffect(() => {
    // Проверяем есть ли токен
    checkToken();

    // Получаем данные профиля
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((error) => console.log(error));

    // Получаем карточки
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    // Проверяем ширину экрана
    if (!mobileWidth) {
      setIsMenuOpen(false);
    }
  }, [mobileWidth]);

  useEffect(() => {
    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  });

  //-----------------------------------

  // Функция обработчик ошибки
  const handleError = () => {
    setSuccess(false);
    handleInfoTooltipOpen(true);
  };

  // Функция регистрации пользователя
  const handleRegister = ({ email, password }) => {
    setLoading(true);
    auth
      .register(password, email)
      .then((data) => {
        const { email, _id } = data.data;
        setUserData({ email, _id });
        setSuccess(true);
        handleInfoTooltipOpen(true);
        history.push("/sign-in");
      })
      .catch(handleError)
      .finally(() => {
        setLoading(false);
      });
  };

  // Функция авторизации пользователя
  const handleLogin = ({ email, password }) => {
    setLoading(true);
    auth
      .authorise(password, email)
      .then((data) => {
        const { token } = data;
        localStorage.setItem("jwt", token);
        setUserData({ ...userData, email });
        setLoggedIn(true);
        history.push("/");
      })
      .catch(handleError)
      .finally(() => {
        setLoading(false);
      });
  };

  // Функция деавторизации пользователя
  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    setUserData({
      email: "",
      _id: "",
    });
  };

  // Функция проверки наличия токена
  const checkToken = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getContent(jwt)
        .then((data) => {
          const { email, _id } = data.data;
          setUserData({ email, _id });
          setLoggedIn(true);
          history.push("/");
        })
        .catch((error) => console.log(error));
    }
  };

  //-----------------------------------
  // Функция проставки и удаления лайков у карточки
  const handleCardLike = (card) => {
    // Проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => console.log(error));
  };

  //-----------------------------------

  // Обработчики открытия и закрытия попапов

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  const handleCardDelete = (card) => {
    setDeleteCardPopupOpen(true);
    setSelectedDeleteCard(card);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleInfoTooltipOpen = () => {
    setInfoTooltipPopupOpen(true);
  };

  const closeAllPopups = () => {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setDeleteCardPopupOpen(false);
    setSelectedDeleteCard(null);
    setSelectedCard(null);
    setInfoTooltipPopupOpen(false);
  };

  const handleEscClose = (evt) => {
    const escapeKey = "Escape";
    if (evt.key === escapeKey) {
      closeAllPopups();
    }
  };

  //-----------------------------------

  // Обработчики обновления данных пользователя
  const handleUpdateUser = (formData) => {
    setLoading(true);
    api
      .editUserInfo(formData)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  };

  const handleUpdateAvatar = (formData) => {
    setLoading(true);
    api
      .editUserAvatar(formData)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  };

  //-----------------------------------

  // Обработчик добавления карточки
  const handleAddPlaceSubmit = (formData) => {
    setLoading(true);
    api
      .addCard(formData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  };

  //-----------------------------------

  // Функция удаления карточки
  const handleCardDeleteSubmit = (card) => {
    setLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  };

  //-----------------------------------

  // Обработчик открытия и закрытия меню
  const handleMenuButtonClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  //-----------------------------------

  return (
    <div className="page__container">
      <CurrentUserContext.Provider value={currentUser}>
        <AppContext.Provider
          value={{
            loggedIn: loggedIn,
            handleLogin: handleLogin,
            handleRegister: handleRegister,
            userData: userData,
            isLoading: isLoading,
            onClose: closeAllPopups,
          }}
        >
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              component={Main}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              handleLogout={handleLogout}
              isMenuOpen={isMenuOpen}
              onMenuClick={handleMenuButtonClick}
            />

            <Route path="/sign-up">
              <Register />
            </Route>

            <Route path="/sign-in">
              <Login />
            </Route>
            <Route path="/">
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>

          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onAddPlace={handleAddPlaceSubmit}
          />
          <DeleteCardPopup
            isOpen={isDeleteCardPopupOpen}
            onCardDelete={handleCardDeleteSubmit}
            card={selectedDeleteCard}
          />
          <ImagePopup card={selectedCard} />
          <InfoTooltip isSuccess={isSuccess} isOpen={isInfoTooltipPopupOpen} />
        </AppContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
