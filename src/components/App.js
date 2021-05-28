import { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from './Header';
import Login from './Login';
import Register from './Register';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import api from '../utils/api';
import * as auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function App() {

  const [currentUser, setCurrentUser] = useState();
  const [cards, setCards] = useState([]);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] =useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false);
  const [selectedDeleteCard, setSelectedDeleteCard] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const [userData, setUserData] = useState({
    email: '',
    _id: ''
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);

  const history = useHistory();

  //-----------------------------------

  useEffect(() => {

    // Проверяем есть ли токен
    checkToken()

    // Получаем данные профиля
    api.getUserInfo()
    .then((userData) => {
      setCurrentUser(userData);
    })
    .catch(error => console.log(error));

    // Получаем карточки
    api.getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch(error => console.log(error));

  }, []);

  //-----------------------------------

  // Функция обработчик ошибки
  const handleError = () => {
    setSuccess(false);
    handleInfoTooltipOpen(true);
  };

  // Функция регистрации пользователя
  function handleRegister({email, password}) {
    auth.register(password, email)
      .then(data => {
        const { email, _id } = data.data;
        setUserData({ email, _id  });
        setSuccess(true)
        handleInfoTooltipOpen(true);
      })
      .catch(handleError);
  };

  // Функция авторизации пользователя
  function handleLogin({email, password}) {
    auth.authorise(password, email)
      .then(data => {
        const { token } = data;
        localStorage.setItem('jwt', token);
        setUserData({ ...userData, email });
        setLoggedIn(true);
        history.push('/');
      })
      .catch(handleError);
  };

  // Функция деавторизации пользователя
  function handleLogout() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    setUserData({
      email: '',
      _id: ''
    });
  };

  // Функция проверки наличия токена
  function checkToken() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getContent(jwt)
        .then(data => {
          const { email, _id } = data.data;
          setUserData({ email, _id });
          setLoggedIn(true);
          history.push('/');
        })
        .catch(error => console.log(error))};
  };

  //-----------------------------------
  // Функция проставки и удаления лайков у карточки
  function handleCardLike(card) {

    // Проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch(error => console.log(error));
  };

  //-----------------------------------

  // Обработчики открытия и закрытия попапов

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  };

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  };

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  };

  function handleCardDelete(card) {
    setDeleteCardPopupOpen(true);
    setSelectedDeleteCard(card);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
  };

  function handleInfoTooltipOpen() {
    setInfoTooltipPopupOpen(true);
  };

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setDeleteCardPopupOpen(false);
    setSelectedDeleteCard(null);
    setSelectedCard(null);
  };

  function closeInfoTooltipPopup() {
    setInfoTooltipPopupOpen(false);
    {isSuccess && history.push('/sign-in')};
  };

  //-----------------------------------

  // Обработчики обновления данных пользователя
  function handleUpdateUser(formData) {
    setLoading(true)
    api.editUserInfo(formData)
      .then(newUserData => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch(error => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  };

  function handleUpdateAvatar(formData) {
    setLoading(true)
    api.editUserAvatar(formData)
      .then(newUserData => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch(error => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  };

  //-----------------------------------

  // Обработчик добавления карточки
  function handleAddPlaceSubmit(formData) {
    setLoading(true)
    api.addCard(formData)
    .then(newCard => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch(error => console.log(error))
    .finally(() => {
      setLoading(false);
    });
  };

  //-----------------------------------

  // Функция удаления карточки
  function handleCardDeleteSubmit(card) {
    setLoading(true)
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch(error => console.log(error))
      .finally(() => {
        setLoading(false);
      });

  };

  //-----------------------------------

  return (
    <div className="page__container">

      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <ProtectedRoute
            exact path="/"
            loggedIn={loggedIn}
            component={Main}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            handleLogout={handleLogout}
            userData={userData}
          />

          <Route path="/sign-up">
            <Register handleRegister={handleRegister}/>
          </Route>

          <Route path="/sign-in">
            <Login handleLogin={handleLogin}/>
          </Route>
          <Route exact path="/">
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>

        </Switch>

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isLoading}/>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isLoading={isLoading}/>
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} isLoading={isLoading}/>
        <DeleteCardPopup isOpen={isDeleteCardPopupOpen} onClose={closeAllPopups} onCardDelete={handleCardDeleteSubmit} isLoading={isLoading} card={selectedDeleteCard}/>
        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
        <InfoTooltip isSuccess={isSuccess} isOpen={isInfoTooltipPopupOpen} onClose={closeInfoTooltipPopup}/>

      </CurrentUserContext.Provider>

        {/* <Main
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}/> */}

    </div>
  );

};

export default App;
