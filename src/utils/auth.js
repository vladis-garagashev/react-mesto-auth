export const BASE_URL = 'https://auth.nomoreparties.co';

  //-----------------------------------

  // Функция обработки ответа промиса
  const handleResponse = res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`);

  //-----------------------------------

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'password': password,
      'email': email
    })
  }).then(res => handleResponse(res));
};

export const authorise = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'password': password,
      'email': email
    })
  }).then(res => handleResponse(res));
}; 

export const getContent = (jwt) => {
  return fetch(`${BASE_URL}//users/me`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${jwt}`
    }
  }).then(res => handleResponse(res));
};