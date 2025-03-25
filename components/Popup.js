class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseButton = this._popupElement.querySelector(".popup__close");

    this._handleEscapeClose = this._handleEscapeClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);

    this.setEventListeners();
  }

  open() {
    this._popupElement.classList.add("popup_visible");
    document.addEventListener("keyup", this._handleEscapeClose);
  }

  close() {
    this._popupElement.classList.remove("popup_visible");
    document.removeEventListener("keyup", this._handleEscapeClose);
  }

  _handleEscapeClose(event) {
    if (event.key === "Escape") {
      this.close();
      console.log("Escape key was pressed");
    }
  }

  _handleOverlayClose(event) {
    if (event.target === this._popupElement) {
      this.close();
    }
  }

  setEventListeners() {
    if (this._popupCloseButton) {
      this._popupCloseButton.addEventListener("click", (evt) => this.close());
    }

    this._popupElement.addEventListener("mousedown", this._handleOverlayClose);
  }
}

export default Popup;
