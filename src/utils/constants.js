// Находим селекторы попапов
export const cardPopupSelector = "#popupCard";
export const avatarPopupSelector = "#popupAvatar";
export const profilePopupSelector = "#popupProfile";
export const imagePreviePopupSelector = "#popupImagePrevie";
export const deleteCardPopupSelector = "#popupDeleteCard";

// Находим кнопки открыть попап
export const avatarEditButton = document.querySelector(
  ".button_type_edit-avatar"
);
export const profileEditButton = document.querySelector(".button_type_edit");
export const addCardButton = document.querySelector(".button_type_add");

// Находим форму редактирования профиля и её инпуты
export const profileEditForm = document.forms.editProfileForm;
export const nameInput = profileEditForm.querySelector(
  ".form__item_element_name"
);
export const aboutInput = profileEditForm.querySelector(
  ".form__item_element_job"
);

// Выбераем элементы, куда должны быть вставлены значения полей
export const profileNametSelector = ".profile__name";
export const profileAboutSelector = ".profile__job";
export const profileAvatarSelector = ".profile__avatar-image";

// Находим селектор контейнера с карточками
export const cardListSelector = ".cards__list";

// Настройки с селекторами и классами форм
export const options = {
  inputSelector: ".form__item",
  submitButtonSelector: ".form__submit-button",
  inactiveButtonClass: "form__submit-button_disabled",
  inputErrorClass: "form__item_type_error",
  errorClass: "form__item-error_visible",
};
