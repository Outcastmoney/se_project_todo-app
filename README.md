# Simple Todo App

"this project is to learn to use this in a project and to use JS modules "

## Functionality

"Users can click the "+ Add Todo" button to open a popup form.
The form includes:
Task Name (required, 2-40 characters).
Optional Due Date (date input field).
"Create" Button to submit the new todo.
When a user submits the form:
A new todo item is created and added to the list.
Each todo is generated using the JavaScript class Todo.js, which handles rendering and event listeners.
The form is reset after submission.
The popup closes automatically.
Each todo has a checkbox.
When checked:
The task is marked as completed.
The class "todo--completed" is added to style the task differently.
The app logs "Todo  completed status: true" in the console.
Unchecking the box toggles the completion status back to "false".
Each todo has a delete button (.todo__delete-btn).
Clicking the delete button:
Removes the task from the DOM.
Logs "Todo  has been deleted." in the console.
Uses custom JavaScript form validation to ensure users enter valid data.
Features:
Checks for required fields (name must be at least 2 characters).
Displays error messages if input is invalid.
Disables the submit button until the form is correctly filled.
Uses CSS classes (.popup__error, .popup__input_type_error) to visually highlight errors.

"

## Technology

The Simple ToDo App is built using modern JavaScript techniques and best practices. By using ES6 classes, template cloning, form validation, and event-driven programming, it provides a responsive and interactive user experience.

This modular approach ensures that the app is scalable, maintainable, and easily extendable, making it a solid foundation for further development.
 "

## Deployment

This project is deployed on GitHub Pages:

- "(https://outcastmoney.github.io/se_project_todo-app/)"
