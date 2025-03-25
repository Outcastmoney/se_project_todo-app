class TodoCounter {
  constructor(todos, selector) {
    this._element = document.querySelector(selector);

    if (!this._element) {
      console.warn(`Counter element with selector "${selector}" not found.`);
      return;
    }

    this._completed = todos.filter((todo) => todo.completed).length;
    this._total = todos.length;
    this._updateText();
  }

  updateCount() {
    const todos = document.querySelectorAll('.todo');
    this._total = todos.length;
    this._completed = [...todos].filter(
      todo => todo.querySelector('.todo__completed').checked
    ).length;
    this._updateText();
  }

  updateCompleted(increment) {
    if (increment) {
      this._completed++;
    } else {
      this._completed = Math.max(0, this._completed - 1);
    }
    this._updateText();
  }

  updateTotal(increment) {
    if (increment) {
      this._total++;
    } else {
      this._total = Math.max(0, this._total - 1);
    }
    this._updateText();
  }

  _updateText() {
    if (this._element) {
      this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
    }
  }
}

export default TodoCounter;
