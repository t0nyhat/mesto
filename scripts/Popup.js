class Popup {
  constructor(popupElement, closeButton) {
    this.closeButton = closeButton;
    this.popupElement = popupElement;
  }

  open() {
    this.popupElement.classList.add("popup_is-opened");
    this.setEventListeners();
  }

  close() {
    this.popupElement.classList.remove("popup_is-opened");
    this.closeButton.removeEventListener("click", this.close, false);
  }

  setEventListeners() {
    this.closeButton.addEventListener("click", () => this.close.call(this));
    document.addEventListener("keyup", e => {
      if (e.key === "Escape") {
        this.close();
      }
    });
  }
}
