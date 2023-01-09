import { el } from "date-fns/locale";
import { format } from "../node_modules/date-fns";
import { makeDark } from "./logic.js";


function getCurrentDate() {
  const today = new Date();
  const date = format(today, "yyyy-MM-dd");
  return date;
} 

function addMenuDropDown(element){
const parent = element;
  const button1 = makeButton("menus");
  const button2 = makeButton("menus");


  parent.appendChild(button1);
  parent.appendChild(button2);

  button1.classList.toggle('hidden');
  button2.classList.toggle('hidden');
}

function addNewTodo(
  titleText,
  descriptionText,
  dueDate,
  priorityText,
  counter
) {
  //create div with new todo text inside button.

  const newTodoDeleteButton = makeButton("delete");

  const newTodoEditButton = makeButton("edit");

  const newTodoDiv = document.createElement("div");
  newTodoDiv.classList.add("todoedit");

  newTodoDiv.classList.add(`${priorityText}`);
  newTodoDiv.setAttribute("id", `${counter}`);

  const newTodoTitleDiv = document.createElement("div");
  newTodoTitleDiv.classList.add("todotitle");

  const newTodoDescriptionDiv = document.createElement("div");
  newTodoDescriptionDiv.classList.add("tododescription");
  newTodoDescriptionDiv.classList.add("hidden");

  const newTodoDueDateDiv = document.createElement("input");
  newTodoDueDateDiv.type = "date";
  newTodoDueDateDiv.value = dueDate;
  newTodoDueDateDiv.classList.add("tododuedate");

  newTodoTitleDiv.textContent = titleText;
  newTodoDescriptionDiv.textContent = descriptionText;
  // newTodoDueDateDiv.textContent = dueDate;

  newTodoDiv.appendChild(newTodoTitleDiv);
  newTodoDiv.appendChild(newTodoDescriptionDiv);
  newTodoDiv.appendChild(newTodoDueDateDiv);
  newTodoDiv.appendChild(newTodoEditButton);
  newTodoDiv.appendChild(newTodoDeleteButton);

  return { newTodoDiv, newTodoDeleteButton, newTodoEditButton };
}
function addNewProject(projectTitle) {
  const newTodoDeleteButton = makeButton("deleteproject");

  const newTodoEditButton = makeButton("editproject");

  const newTodoDiv = document.createElement("div");
  newTodoDiv.classList.add("todoedit");

  const newTodoTitleDiv = document.createElement("div");
  newTodoTitleDiv.classList.add("todoproject");

  newTodoTitleDiv.textContent = "PROJECT: " + projectTitle;

  // newTodoDueDateDiv.textContent = dueDate;

  newTodoDiv.appendChild(newTodoTitleDiv);
  newTodoDiv.appendChild(newTodoEditButton);
  newTodoDiv.appendChild(newTodoDeleteButton);

  return { newTodoDiv, newTodoDeleteButton, newTodoEditButton };
}
function updateTodo() {}

function removeFromHTML(query) {
  const removeAllTodoDivs = document.querySelectorAll(query);
  removeAllTodoDivs.forEach((element) => {
    element.remove();
  });
}

function repopulateHTMLFromArray(todoItems, counter) {
  if (todoItems.constructor.name === "Object") {
    todoItems = todoItems.getProject();
    todoItems.forEach((element) => {
      createNewTodoItemHTML(
        element.getTitle(),
        element.getDescription(),
        element.getDueDate(),
        element.getPriority(),
        counter
      );
      counter++;
    });
    return counter;
  } else if (todoItems.constructor.name === "Array") {
    todoItems.forEach((element) => {
      createNewProjectHTML(element.getProjectName());
      counter++;
    });
    return counter;
  }
}
function addCurrentHTMLFromArray(todoProjectArray, currentNum) {

  return createNewProjectHTML(todoProjectArray[currentNum].getProjectName());
}

function createNewProjectHTML(todoProject) {
  const projectDiv = document.querySelector(".todo");

  const holderProject = addNewProject(todoProject);

  projectDiv.appendChild(holderProject.newTodoDiv);

  return holderProject;
}

function createNewTodoItemHTML(
  titleText,
  descriptionText,
  dateText,
  priorityText,
  counter
) {
  const todoDiv = document.querySelector(".todo");
  var holderTodo = addNewTodo(
    titleText,
    descriptionText,
    dateText,
    priorityText,
    counter
  );

  todoDiv.appendChild(holderTodo.newTodoDiv);
  return holderTodo;
}

function makeButton(text) {
  const button = document.createElement("button");

  button.classList.add(`${text}button`);
  text = text.toUpperCase();
  if (text === "DELETE") {
    text = "✔";
  }
  if (text === "DELETEPROJECT") {
    text = "❌";
  }

  button.textContent = text;
  return button;
}

function getFormData(
  inputTitleData,
  inputDescriptionData,
  dateInputData,
  priorityData
) {
  const titleText = inputTitleData.value;
  const descriptionText = inputDescriptionData.value;
  const dateText = dateInputData.value;
  const priorityText = priorityData.value.toLowerCase();
  return { titleText, descriptionText, dateText, priorityText };
}
function getFormProjectData(projectName) {
  const titleText = projectName.value;

  return titleText;
}

function resetFormData(
  inputTitleData,
  inputDescriptionData,
  dateInputData,
  priorityData,
  submitButton
) {
  inputTitleData.value = "";
  inputDescriptionData.value = "";
  dateInputData.value = getCurrentDate();
  priorityData.value = "LOW";
  submitButton.value = "SET TODO";
}

// export

function findArrayNum(element) {
  const toRemoveDiv = element.parentElement;

  const removeNum = toRemoveDiv.id;

  return removeNum;
}

function makeHelpCard() {
  const bodyDiv = document.querySelector("body");
  const newDiv = document.createElement("div");
  newDiv.classList.add("helpdiv");

  const helpText = document.createElement("p");
  helpText.classList.add("helptext");

  helpText.textContent =
    "✔: requires a doubleclick!\n Project requires doubleclick \n Title: is Required! " +
    "\n Click Card to EDIT or VIEW  \n Version: 1.1.5";
  newDiv.appendChild(helpText);
  bodyDiv.appendChild(newDiv);

}

let helpToggle = true;
function toggleHelp() {
  const helpButton = document.querySelector(".helpbutton");
  const helpCard = document.querySelector(".helpdiv");
  helpCard.style.visibility = "hidden";
  helpButton.addEventListener("click", () => {
    if (helpToggle) {
      helpCard.style.visibility = "visible";
      helpButton.style.height = "100vh";
      helpButton.style.width = "100vw";
      helpButton.style.opacity = "0.1";
      makeDark(helpToggle);
      helpToggle = false;
    } else {
      helpCard.style.visibility = "hidden";
      helpButton.style.height = "25px";
      helpButton.style.width = "fit-content";
      helpButton.style.opacity = "1";
      makeDark(helpToggle);
      helpToggle = true;
    }
  });
}

function removeAllTodoHTML() {
  const query = ".todoedit";
  removeFromHTML(query);
}

export {

  // addInputForm,
  addNewTodo,
  updateTodo,
  getCurrentDate,
  createNewTodoItemHTML,
  makeHelpCard,
  toggleHelp,
  removeAllTodoHTML,
  getFormProjectData,
  findArrayNum,
  removeFromHTML,
  repopulateHTMLFromArray,
  getFormData,
  resetFormData,
  addCurrentHTMLFromArray,
  createNewProjectHTML,
  addMenuDropDown,
};
