export default class FormValidator {
  constructor(popup) {
    this.popup = popup;
  }

  checkInputValidity(element, error) {
    
    if (!(error.textContent === " " && element.validity.valueMissing)) {
      if (element.type === "url") {
        element.checkValidity()
          ? this.setErrorState(error, "")
          : this.setErrorState(error, "Здесь должна быть ссылка");
      }
      if (element.type === "text") {
        if (element.checkValidity()) {
          this.setErrorState(error, "");
        } else {
          element.validity.valueMissing
            ? this.setErrorState(error, "Это обязательное поле")
            : this.setErrorState(error, "Должно быть от 2 до 30 символов");
        }
      }
    }
  }

  setErrorState(error, message) {
    if (message === "") {
      error.textContent = " ";
      error.classList.remove("error-message_show");
      error.classList.add("error-message_hidden");
    } else {
      error.textContent = message;
      error.classList.add("error-message_show");
      error.classList.remove("error-message_hidden");
    }
  }

  clearInputValueAndErrorState() {
    const errors = this.popup.querySelectorAll(".error-message");
    const inputs = this.popup.querySelectorAll(".popup__input");
    errors.forEach(element => {
      element.textContent = " ";
      element.classList.remove("error-message_show");
      element.classList.add("error-message_hidden");
    });
    inputs.forEach(element => {
      element.value = "";
    });
  }
  setSubmitButtonState() {
    const inputs = this.popup.querySelectorAll(".popup__input");
    const errors = this.popup.querySelectorAll(".error-message");
    const submitButton = this.popup.querySelector(".popup__button");
    inputs.forEach((element, index) => {
      this.checkInputValidity(element, errors[index]);
    });
    if (this.popup.checkValidity()) {
      submitButton.disabled = false;
      submitButton.classList.remove("popup__button_disabled");
      submitButton.classList.add("popup__button_enabled");
    } else {
      submitButton.disabled = true;
      submitButton.classList.remove("popup__button_enabled");
      submitButton.classList.add("popup__button_disabled");
    }
  }

  setEventListeners() {
    this.popup.addEventListener("input", () =>
      this.setSubmitButtonState.call(this)
    );
  }
}
