class TodoCounter {
  constructor(initialTodos) {
    this._element = document.querySelector(".counter__text");
    this._total = initialTodos.length;
    this._completed = initialTodos.filter((todo) => todo.completed).length;
    this._updateText();
  }

  updateCompleted = (increment) => {
    this._completed = increment ? this._completed + 1 : this._completed - 1;
    this._updateText();
  };

  updateTotal = (increment) => {
    this._total = increment ? this._total + 1 : this._total - 1;
    this._updateText();
  };

  _updateText = () => {
    this._element.textContent = `${this._completed} out of ${this._total} completed`;
  };
}

export default TodoCounter;
