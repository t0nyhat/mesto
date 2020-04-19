export default class Card {
    constructor(cardObject, userId, api) {
        this.cardElement = null;
        this.name = cardObject.name;
        this.link = cardObject.link;
        this.id = cardObject._id;
        this.owner = cardObject.owner;
        this.likes = cardObject.likes;
        this.userId = userId;
        this.api = api;
    }

    create() {
        const placeCard = document.createElement("div");
        placeCard.classList.add("place-card");
        const placeCardImage = document.createElement("div");
        placeCardImage.classList.add("place-card__image");
        placeCardImage.setAttribute("style", `background-image: url(${this.link})`);
        const placeCardDeleteIconButton = document.createElement("button");
        placeCardDeleteIconButton.classList.add("place-card__delete-icon");
        const placeCardDescription = document.createElement("div");
        placeCardDescription.classList.add("place-card__description");
        const placeCardName = document.createElement("h3");
        placeCardName.classList.add("place-card__name");
        placeCardName.innerText = this.name;
        const placeCardLikeContainer = document.createElement("div");
        placeCardLikeContainer.classList.add("place-card__like-container");
        const placeCardLikeCounter = document.createElement("span");
        placeCardLikeCounter.classList.add("place-card__like-counter");
        placeCardLikeCounter.textContent = `${this.likes.length}`;
        const placeCardLikeIconButton = document.createElement("button");
        placeCardLikeIconButton.classList.add("place-card__like-icon");
        placeCardLikeContainer.appendChild(placeCardLikeIconButton);
        placeCardLikeContainer.appendChild(placeCardLikeCounter);
        placeCardImage.appendChild(placeCardDeleteIconButton);
        placeCardDescription.appendChild(placeCardName);
        placeCardDescription.appendChild(placeCardLikeContainer);
        placeCard.appendChild(placeCardImage);
        placeCard.appendChild(placeCardDescription);
        this.cardElement = placeCard;
        this.setLiked();
        return placeCard;
    }

    setEventListeners() {
        this.cardElement
            .querySelector(".place-card__like-icon")
            .addEventListener("click", event => this.like(event));
        if (this.userId === this.owner._id) {
            this.cardElement
                .querySelector(".place-card__delete-icon")
                .addEventListener("click", () => this.remove());
        } else {
            this.cardElement.querySelector(".place-card__delete-icon").remove();
        }
    }

    like(event) {
        let result = this.likes.find(element => {
            if (element._id === this.userId) {
                return true;
            }
        });
        if (typeof result === "undefined") {
            this.api.like.call(this.api, this.id).then(result => {
                if (result !== "error") {
                    event.target.classList.add("place-card__like-icon_liked");
                    this.likes = result.likes;
                    this.cardElement.querySelector(
                        ".place-card__like-counter"
                    ).textContent = this.likes.length;
                }
            });
        } else {
            this.api.dislike.call(this.api, this.id).then(result => {
                if (result !== "error") {
                    event.target.classList.remove("place-card__like-icon_liked");
                    this.likes = result.likes;
                    this.cardElement.querySelector(
                        ".place-card__like-counter"
                    ).textContent = this.likes.length;
                }
            });
        }
    }

    remove() {
        const answer = confirm("Вы действительно хотите удалить эту карточку?");
        if (answer) {
            this.api.deleteCard.call(this.api, this.id).then(result => {
                if (result !== "error") {
                    this.cardElement.removeEventListener("click", this.like);
                    this.cardElement.removeEventListener("click", this.remove);
                    this.cardElement.remove();
                }
            });
        }
    }

    setLiked() {
        let result = this.likes.find(element => {
            if (element._id === this.userId) {
                return true;
            }
        });
        if (typeof result !== "undefined") {
            this.cardElement
                .querySelector(".place-card__like-icon")
                .classList.add("place-card__like-icon_liked");
        }
    }
}
