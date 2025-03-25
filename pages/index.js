import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const counterText = document.querySelector(".counter__text");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (evt) => {
    const name = evt.target.name.value;
    const dateInput = evt.target.date.value;

    let adjustedDate = null;
    if (dateInput) {
      const date = new Date(dateInput);
      adjustedDate = new Date(
        date.getTime() - date.getTimezoneOffset() * 60000
      );
    }

    const id = uuidv4();
    const values = { name, date: adjustedDate, id };
    renderTodo(values);

    addTodoPopup.close();
    evt.target.reset();
  },
});

addTodoPopup.setEventListeners();

const updateCounter = () => {
  const todos = Array.from(document.querySelectorAll(".todo"));
  const completedTodos = todos.filter(
    (todo) => todo.querySelector(".todo__completed").checked
  ).length;
  counterText.textContent = `Showing ${completedTodos} out of ${todos.length} completed`;
};

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", updateCounter);
  return todo.getView();
};

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todo = generateTodo(item);
    section.addItem(todo);
  },
  containerSelector: ".todos__list",
});

section.renderItems();

const renderTodo = (item) => {
  const todo = generateTodo(item);
  section.addItem(todo);
  updateCounter();
};

function handleEscapeClose(evt) {
  if (evt.key === "Escape") {
    addTodoPopup.close();
    document.removeEventListener("keyup", handleEscapeClose);
  }
}

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

// addTodoForm.addEventListener("submit", (evt) => {
//   evt.preventDefault();
//   const name = evt.target.name.value;
//   const dateInput = evt.target.date.value;

//   let adjustedDate = null;
//   if (dateInput) {
//     const date = new Date(dateInput);
//     adjustedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
//   }

//   const id = uuidv4();
//   const values = { name, date: adjustedDate, id };
//   renderTodo(values);

//   addTodoPopup.close();
//   evt.target.reset();
// });

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
