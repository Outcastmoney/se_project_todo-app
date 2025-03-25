class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseButton = this._popupElement.querySelector(".popup__close");

    this._handleEscapeClose = this._handleEscapeClose.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
  }

  open() {
    console.log('Opening popup')
    this._popupElement.classList.add("popup_visible");
    document.addEventListener("keyup", this._handleEscapeClose);
  }

  close() {
    console.log('Closing popup');
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
    console.log('Setting up base popup event listeners');
    if (this._popupCloseButton) {
      this._popupCloseButton.addEventListener("click", () => this.close());
    }

    this._popupElement.addEventListener("mousedown", this._handleOverlayClose.bind(this));
  }
}

export default Popup;
