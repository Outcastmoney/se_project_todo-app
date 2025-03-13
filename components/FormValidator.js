class FormValidator {
  constructor(settings, formEl) {
    this._settings = settings;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._formEl = formEl;

    this._inputList = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formEl.querySelector(
      this._submitButtonSelector
    );
  }

  _checkInputValidity(inputElement) {
    if (!inputElement) return;

    const errorElement = this._formEl.querySelector(
      `#${inputElement.id}-error`
    );
    if (!errorElement) {
      console.warn(`Error element for ${inputElement.id} not found.`);
      return;
    }

    if (!inputElement.validity.valid) {
      inputElement.classList.add(this._inputErrorClass);
      errorElement.textContent = inputElement.validationMessage;
      errorElement.classList.add(this._errorClass);
    } else {
      inputElement.classList.remove(this._inputErrorClass);
      errorElement.textContent = "";
      errorElement.classList.remove(this._errorClass);
    }
  }

  _toggleButtonState() {
    if (!this._inputList.length || !this._buttonElement) {
      console.warn("FormValidator: No inputs or submit button found.");
      return;
    }

    const isFormValid = this._inputList.every((input) => input.validity.valid);

    if (isFormValid) {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    } else {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    }
  }

  _setEventListeners() {
    if (!this._inputList.length || !this._buttonElement) {
      console.warn("FormValidator: No inputs or button found.");
      return;
    }

    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._checkInputValidity(inputElement);

      this._formEl.reset();
      this._toggleButtonState();
    });

    this._toggleButtonState();
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.resetValidation();
    });

    this._setEventListeners();
  }
}

export default FormValidator;
