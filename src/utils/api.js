class Api {
  constructor({ adress, token, cohortId }) {
    this._adress = adress;
    this._token = token;
    this._cohortId = cohortId;
  }

  //-----------------------------------

  // Функция обработки ответа промиса
  _handleResponse = (res) =>
    res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);

  //-----------------------------------

  // Функция получения информации о пользователе
  getUserInfo() {
    return fetch(`${this._adress}/v1/${this._cohortId}/users/me`, {
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._handleResponse(res));
  }

  //-----------------------------------

  // Функция редактирования аватара пользователя
  editUserAvatar(data) {
    return fetch(`${this._adress}/v1/${this._cohortId}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => this._handleResponse(res));
  }

  //-----------------------------------

  // Функция редактирования информации о пользователе
  editUserInfo(data) {
    return fetch(`${this._adress}/v1/${this._cohortId}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._handleResponse(res));
  }

  //-----------------------------------

  // Функция получения стандартных карточек
  getInitialCards() {
    return fetch(`${this._adress}/v1/${this._cohortId}/cards`, {
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._handleResponse(res));
  }

  //-----------------------------------

  // Функция добавления новой карточки
  addCard(data) {
    return fetch(`${this._adress}/v1/${this._cohortId}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._handleResponse(res));
  }

  //-----------------------------------

  // Функция проставки и удаления лайка для карточки
  changeLikeCardStatus(id, isNotLiked) {
    if (isNotLiked) {
      return fetch(`${this._adress}/v1/${this._cohortId}/cards/likes/${id}`, {
        method: "PUT",
        headers: {
          authorization: this._token,
        },
      }).then((res) => this._handleResponse(res));
    } else {
      return fetch(`${this._adress}/v1/${this._cohortId}/cards/likes/${id}`, {
        method: "DELETE",
        headers: {
          authorization: this._token,
        },
      }).then((res) => this._handleResponse(res));
    }
  }

  //-----------------------------------

  // Функция удаления карточки
  deleteCard(id) {
    return fetch(`${this._adress}/v1/${this._cohortId}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then((res) => this._handleResponse(res));
  }
}

//-----------------------------------

//Инстанцирование экземпляра класса Api
const api = new Api({
  adress: "https://mesto.nomoreparties.co",
  token: "12e16369-63c3-45db-b812-aa3f60268f30",
  cohortId: "cohort-22",
});

export default api;
