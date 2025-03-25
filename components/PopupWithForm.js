import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popupElement.querySelector(".popup__form");
    console.log('PopupForm element:', this._popupForm);
  }

  _getInputValues() {
    this._inputList = this._popupForm.querySelectorAll(".popup__input");
    console.log('Input elements found:', this._inputList);
    const values = {};
    this._inputList.forEach((input) => {
      values[input.name] = input.value;
      console.log(`Input ${input.name}:`, input.value);
    });
    console.log('Collected values:', values);
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    console.log('Setting up form submit listener on:', this._popupForm);
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      console.log('Form submitted');
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
    });
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}

export default PopupWithForm;
