class TodoCounter {
  constructor(initialTodos) {
    this._total = initialTodos.length;
    this._completed = initialTodos.filter(todo => todo.completed).length;
  }

  updateCount(completedCount, totalCount) {
    this._completed = completedCount;
    this._total = totalCount;
    return this.getText();
  }

  getText() {
    return `Showing ${this._completed} out of ${this._total} completed`;
  }
}

export default TodoCounter;
