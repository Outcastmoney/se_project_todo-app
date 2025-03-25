class Todo {
  constructor(data, selector, onUpdate, handleCheck, handleDelete) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
    this._onUpdate = onUpdate;
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;

    if (!this._templateElement) {
      console.warn(`Todo template "${selector}" not found.`);
      return;
    }
  }

  _setEventListeners() {
    if (!this._todoElement) {
      console.warn("Todo element is not initialized.");
      return;
    }

    const todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    const todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");

    if (!todoCheckboxEl || !todoDeleteBtn) {
      console.warn("Required elements not found within the todo item.");
      return;
    }

    todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = todoCheckboxEl.checked;
      this._todoElement.classList.toggle(
        "todo--completed",
        this._data.completed
      );
      console.log(
        `Todo "${this._data.name}" completed status: ${this._data.completed}`
      );

      if (this._onUpdate) this._onUpdate(this._data.completed, this._data.id);
      if (this._handleCheck) this._handleCheck(this._data.completed);
    });

    todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
      console.log(`Todo "${this._data.name}" has been deleted.`);

      if (this._handleDelete) this._handleDelete(this._data.id);
      if (this._onUpdate) this._onUpdate(this._data.completed, this._data.id);
    });
  }

  _generateCheckboxEl() {
    if (!this._todoElement) {
      console.warn("Todo element is not initialized.");
      return;
    }

    const todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    const todoLabel = this._todoElement.querySelector(".todo__label");

    if (!todoCheckboxEl || !todoLabel) {
      console.warn("Checkbox or label not found within the todo item.");
      return;
    }

    todoCheckboxEl.checked = this._data.completed;
    todoCheckboxEl.id = `todo-${this._data.id}`;
    todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  getView() {
    if (!this._templateElement) {
      console.error("Cannot generate Todo: template is missing.");
      return null;
    }

    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    if (!this._todoElement) {
      console.error("Failed to clone the todo template.");
      return null;
    }

    const todoNameEl = this._todoElement.querySelector(".todo__name");
    const todoDate = this._todoElement.querySelector(".todo__date");

    if (todoNameEl) todoNameEl.textContent = this._data.name;

    if (this._data.date) {
      const dueDate = new Date(this._data.date);
      if (!isNaN(dueDate) && todoDate) {
        todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}`;
      }
    }

    if (this._data.completed) {
      this._todoElement.classList.add("todo--completed");
    }

    this._generateCheckboxEl();
    this._setEventListeners();

    return this._todoElement;
  }
}

export default Todo;
