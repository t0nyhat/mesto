import './pages/index.css'
import Card from './scripts/Card'
import CardList from './scripts/CardList'
import FormValidator from './scripts/FormValidator'
import Popup from './scripts/Popup'
import Api from './scripts/Api'
import UserInfo from './scripts/UserInfo'

const api = new Api({
    baseUrl: "https://praktikum.tk/cohort9",
    headers: {
        authorization: "371f243d-a4a5-4ca5-b415-b8dcc6b3808c",
        "Content-Type": "application/json"
    }
});
const popupCard = document.querySelector(".popup__card");
const popupAvatar = document.querySelector(".popup__avatar");
const imagePopup = new Popup(
    document.querySelector(".popup__image"),
    document.querySelector(".popup__close-image")
);
const cardPopup = new Popup(popupCard, document.querySelector(".popup__close"));
const avatarPopup = new Popup(
    popupAvatar,
    document.querySelector(".popup__close-avatar")
);
const infoPopup = new Popup(
    document.querySelector(".popup__edit"),
    document.querySelector(".popup__close-edit")
);
const userInfo = new UserInfo(
    document.querySelector(".popup__input_type_name-edit"),
    document.querySelector(".popup__input_type_job-edit"),
    document.querySelector(".user-info__name"),
    document.querySelector(".user-info__job"),
    document.querySelector(".user-info__photo")
);

api.getUserInfo().then(result => {
    userInfo.loadUserInfo(result);
});

const placesList = new CardList(document.querySelector(".places-list"), null);
api
    .getInitialCards()
    .then(result => {
        return result.map(result => {
            const card = new Card(result, userInfo.id, api);
            card.create();
            card.setEventListeners();
            return card;
        });
    })
    .then(cards => {
        placesList.cards = cards;
        return placesList;
    })
    .then(placesList => {
        placesList.render();
    });

const formValidatorUserEdit = new FormValidator(
    document.querySelector(".popup__form-edit")
);
formValidatorUserEdit.setEventListeners();

const formValidatorCardEdit = new FormValidator(
    document.querySelector(".popup__form-card")
);
formValidatorCardEdit.setEventListeners();
const formValidatorAvatarEdit = new FormValidator(
    document.querySelector(".popup__form-avatar")
);
formValidatorAvatarEdit.setEventListeners();

function submitNewCardInsertion(event) {
    const popupInputName = document.querySelector(".popup__input_type_name");
    const popupUrl = document.querySelector(".popup__input_type_link-url");

    api.addNewCard(popupInputName.value, popupUrl.value).then(result => {
        if (result !== "error") {
            const card = new Card(result, userInfo.id, api);
            card.create();
            placesList.addCard(card);
            event.target.reset();
            cardPopup.close();
        }
    });

    event.preventDefault();
}

function submitBioUpdate(event) {
    userInfo.setUserInfo();
    api.updateUserInfo(userInfo.name, userInfo.about).then(result => {
        if (result !== "error") {
            userInfo.updateUserInfo();
            event.target.reset();
            infoPopup.close();
        }
    });
    event.preventDefault();
}

function submitAvatarUpdate(event) {
    api
        .updateAvatar(popupAvatar.querySelector(".popup__input").value)
        .then(result => {
            if (result !== "error") {
                userInfo.avatarImage = result.avatar;
                userInfo.updateUserInfo();
                avatarPopup.close();
            }
        });

    event.preventDefault();
}

document.querySelector(".user-info__photo").addEventListener("click", () => {
    formValidatorAvatarEdit.setSubmitButtonState();
    formValidatorAvatarEdit.clearInputValueAndErrorState();
    avatarPopup.open();
});

document.querySelector(".user-info__button").addEventListener("click", () => {
    formValidatorCardEdit.setSubmitButtonState();
    formValidatorCardEdit.clearInputValueAndErrorState();
    cardPopup.open();
});

document
    .querySelector(".user-info__edit-button")
    .addEventListener("click", () => {
        userInfo.initUserInfo();
        formValidatorUserEdit.setSubmitButtonState();
        infoPopup.open();
    });

// Тут лучше посоветоваться с наставником не стоит ли этот метод в CardList перенести
// или пусть тут будет. Но если будете переносить, то не забудьте сущности передать в параметры.
document.querySelector(".places-list").addEventListener("click", event => {
    if (event.target.classList.contains("place-card__image")) {
        imagePopup.setEventListeners();
        imagePopup.open();
        document
            .querySelector(".popup__image-content")
            .setAttribute(
                "src",
                event.target.style.backgroundImage.slice(4, -1).replace(/"/g, "")
            );
    }
});

document
    .querySelector(".popup__form")
    .addEventListener("submit", event => submitNewCardInsertion(event));

document
    .querySelector(".popup__form-edit")
    .addEventListener("submit", event => submitBioUpdate(event));

document
    .querySelector(".popup__form-avatar")
    .addEventListener("submit", event => submitAvatarUpdate(event));



/* REVIEW  по заданию 9.

Взаимодействие с сервером происходит правильно.

Методы класса Api имеют правильную структуру.
Правильно обрабатываются ответы от сервера - с помощью методов имеющихся классов.
Предусмотрено обнаружение ошибок и вывод их в консоль.


Что можно улучшить.

1. Создавать экземпляр Api лучше там там же, где Вы создаёте экземпляры всех классов - в script.js.

Задание принято!


P.S.
Почему на аватаре мрачный Маяковский - Антон, а не Иван? Вам приходит правильная информация о профиле по Вашему токену?

*/
