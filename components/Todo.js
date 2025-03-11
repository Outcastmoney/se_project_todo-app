class Todo {
  constructor(data, selector) {
    console.log(data);
    console.log(selector);
    this._data = data;
    this._templateElement = document.querySelector(selector);
  }

  _setEventListeners() {
    const todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    const todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
      console.log(`Todo "${this._data.name}" has been deleted.`);
    });

    todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = !this._data.completed;
      console.log(
        `Todo "${this._data.name}" completed status: ${this._data.completed}`
      );
    });
  }

  _generateCheckboxEl() {
    const todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    const todoLabel = this._todoElement.querySelector(".todo__label");

    todoCheckboxEl.checked = this._data.completed;
    todoCheckboxEl.id = `todo-${this._data.id}`;
    todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  getView() {
    if (!this._templateElement) {
      return null;
    }

    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameEl = this._todoElement.querySelector(".todo__name");
    const todoDate = this._todoElement.querySelector(".todo__date");

    todoNameEl.textContent = this._data.name;

    if (this._data.date) {
      const dueDate = new Date(this._data.date);
      if (!isNaN(dueDate)) {
        todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}`;
      }
    }
    this._generateCheckboxEl();
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
