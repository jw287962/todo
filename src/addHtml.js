import { el } from 'date-fns/locale';
import {format} from '../node_modules/date-fns' 

import {makeDark} from './logic.js'
function createHTMLInitial(){
        // CREATES HEADER 
    //Create content Div
    const contentDiv = document.createElement('div');
    contentDiv.setAttribute('id','content');

    // header
    const headerDiv = document.createElement('div');
    headerDiv.classList.add('header');

    
    const headerText = document.createElement('p');
    headerText.textContent = "TODO LIST";


    const helpButtonDiv = document.createElement('div');
    helpButtonDiv.classList.add('headerbuttondiv');
    
    const helpButton = makeButton('help');
    const projectsButton = makeButton('projects');
      // make TODO DIV BODY
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');



    // append
    headerDiv.appendChild(headerText);
    headerDiv.appendChild(helpButtonDiv);
    helpButtonDiv.appendChild(helpButton);
    helpButtonDiv.appendChild(projectsButton);
    contentDiv.appendChild(headerDiv);
    contentDiv.appendChild(todoDiv);


  return contentDiv;
}


function getCurrentDate(){
  const today = new Date();
  const date = format((today),'yyyy-MM-dd');
  return date;
}

// CREATES FORM
function addInputForm(){

  const todoDiv = document.querySelector('.todo');

// create INPUT for getting text

  const form = document.createElement('form');
  form.classList.add('todoform');
 
  const fieldset = document.createElement('fieldset');
  const inputTitleHTML = document.createElement('input');

  inputTitleHTML.classList.add('title');
  inputTitleHTML.type = "text";
  inputTitleHTML.placeholder = "Type TITLE for your todo reminder";
  inputTitleHTML.maxLength = "25";
  // const span = document.createElement('span');
  // span.classList.add('spanerror')


  const inputDescriptionHTML = document.createElement('textarea');
  inputDescriptionHTML.classList.add('description');
  // inputDescriptionHTML.type = "text";

  inputDescriptionHTML.placeholder = "Type DESCRIPTION your todo reminder";


  const dateInput = document.createElement('input');
  dateInput.type = "date";
  dateInput.value = getCurrentDate();
  dateInput.classList.add('date');

  const prioritySelect = document.createElement('select');
  const priorityLabel = document.createElement('label');
  priorityLabel.htmlFor = "priority";
  priorityLabel.textContent = "Priority:"
  prioritySelect.id ="priority";
  prioritySelect.name = "priority";
  prioritySelect.default = "LOW";
  dateInput.classList.add('priority');
    const lowOption = document.createElement('option');
    lowOption.textContent ="LOW";
    lowOption.value = "LOW";
    lowOption.for ="priority";
    const medOption = document.createElement('option');
    medOption.textContent ="MED";
    medOption.value = "MED";
    const highOption = document.createElement('option');
    highOption.textContent ="HIGH";
    highOption.value ="HIGH";
    priorityLabel.appendChild(prioritySelect);
    prioritySelect.appendChild(lowOption);
    prioritySelect.appendChild(medOption);
    prioritySelect.appendChild(highOption);

  const submit = document.createElement('input');
submit.value = "SET TODO";
  submit.type = "submit";
  submit.classList.add('submittodo')


  todoDiv.appendChild(form);
  form.appendChild(fieldset);
  fieldset.appendChild(inputTitleHTML);
  // fieldset.appendChild(span);
  fieldset.appendChild(inputDescriptionHTML);
  fieldset.appendChild(dateInput);
  fieldset.appendChild(priorityLabel);
  fieldset.appendChild(submit);

  return todoDiv;
}




function addNewTodo(titleText,descriptionText,dueDate,priorityText,counter){
  //create div with new todo text inside button.

  const newTodoDeleteButton = makeButton('delete');

  const newTodoEditButton = makeButton('edit');

  const newTodoDiv = document.createElement('div');
  newTodoDiv.classList.add('todoedit');

  newTodoDiv.classList.add(`${priorityText}`);
  newTodoDiv.setAttribute('id',`${counter}`);

  const newTodoTitleDiv = document.createElement('div');
  newTodoTitleDiv.classList.add('todotitle');

  const newTodoDescriptionDiv = document.createElement('div');
  newTodoDescriptionDiv.classList.add('tododescription');
  newTodoDescriptionDiv.classList.add('hidden');

  const newTodoDueDateDiv = document.createElement('input');
  newTodoDueDateDiv.type = 'date';
  newTodoDueDateDiv.value = dueDate;
  newTodoDueDateDiv.classList.add('tododuedate');
  
  newTodoTitleDiv.textContent = titleText;
  newTodoDescriptionDiv.textContent =descriptionText;
  // newTodoDueDateDiv.textContent = dueDate;

  newTodoDiv.appendChild(newTodoTitleDiv);
  newTodoDiv.appendChild(newTodoDescriptionDiv);
  newTodoDiv.appendChild(newTodoDueDateDiv);
  newTodoDiv.appendChild(newTodoEditButton);
  newTodoDiv.appendChild(newTodoDeleteButton);
 

  return {newTodoDiv,newTodoDeleteButton,newTodoEditButton};
}
function addNewProject(projectTitle){
  const newTodoDeleteButton = makeButton('delete');

  const newTodoEditButton = makeButton('editproject');

  const newTodoDiv = document.createElement('div');
  newTodoDiv.classList.add('todoedit');

  const newTodoTitleDiv = document.createElement('div');
  newTodoTitleDiv.classList.add('todoproject');

  
  newTodoTitleDiv.textContent = "PROJECT: " + projectTitle ;

  // newTodoDueDateDiv.textContent = dueDate;

  newTodoDiv.appendChild(newTodoTitleDiv);
  newTodoDiv.appendChild(newTodoEditButton);
  newTodoDiv.appendChild(newTodoDeleteButton);
 

  return {newTodoDiv,newTodoDeleteButton,newTodoEditButton};
}
function updateTodo(){
 
}



function removeFromHTML(query){
  const removeAllTodoDivs = document.querySelectorAll(query);
  removeAllTodoDivs.forEach(element => {
      element.remove();
  });
}

function repopulateHTMLFromArray(todoItems,counter){

 if(todoItems.constructor.name === 'Object'){
  todoItems = todoItems.getProject();
  todoItems.forEach(element => {
    createNewTodoItemHTML(element.getTitle(),element.getDescription(),element.getDueDate(),element.getPriority(),counter);
      counter++;
  });
  return counter;
 }
 else if(todoItems.constructor.name === 'Array'){
  todoItems.forEach(element => {
   counter++
    createNewProjectHTML(element.getProjectName());
  });
  return counter;
 }
  
}
function addCurrentHTMLFromArray(todoProjectArray,currentNum){


  createNewProjectHTML(todoProjectArray[currentNum].getProjectName());
  

 

}

function createNewProjectHTML(todoProject){
  const projectDiv = document.querySelector('.todo'); 
  
  const holderProject = addNewProject(todoProject);

  projectDiv.appendChild(holderProject.newTodoDiv);

   return holderProject;

}

function createNewTodoItemHTML(titleText,descriptionText,dateText,priorityText,counter){
  const todoDiv = document.querySelector('.todo'); 
  var holderTodo = addNewTodo(titleText,descriptionText,dateText,priorityText,counter);

       todoDiv.appendChild(holderTodo.newTodoDiv);
   return holderTodo;

}

function makeButton(text){
  const button = document.createElement('button');
  
  button.classList.add(`${text}` + `button`);
  text = text.toUpperCase();
  if(text == "DELETE") {
    
    text = '✔';
  }
  
  button.textContent = text;
return button;
}

function getFormData(inputTitleData,inputDescriptionData,dateInputData,priorityData){
  
  const titleText = inputTitleData.value;
  const descriptionText = inputDescriptionData.value;
  const dateText = dateInputData.value;
  const priorityText = priorityData.value.toLowerCase();
  return {titleText,descriptionText,dateText,priorityText}
}
function getFormProjectData(projectName){
  
  const titleText = projectName.value;

  return titleText;
}

function resetFormData(inputTitleData,inputDescriptionData,dateInputData,priorityData,submitButton){

  inputTitleData.value = "";
  inputDescriptionData.value = "";
  dateInputData.value = getCurrentDate();
  priorityData.value = "LOW";
  submitButton.value = "SET TODO";

}

// export

function findArrayNum(element){
  const toRemoveDiv = element.parentElement;

 const removeNum = toRemoveDiv.id;
   
    return removeNum;
}

function makeHelpCard(){
  
  const newDiv = document.createElement('div');
  newDiv.classList.add('helpdiv');

  const helpText = document.createElement('p');
  helpText.classList.add('helptext');


  helpText.textContent = "✔: requires a doubleclick! \n Title: is Required! " + 
  "\n Click Card to EDIT or VIEW  ";
  newDiv.appendChild(helpText)


  return newDiv;

}
let helpToggle = true;
function toggleHelp(){

  const helpButton = document.querySelector('.helpbutton');
const helpCard = document.querySelector('.helpdiv');
  helpCard.style.visibility = "hidden";
  helpButton.addEventListener('click', () => {
      if(helpToggle){
          helpCard.style.visibility = "visible";
          helpButton.style.height = "100vh";
          helpButton.style.width = "100vh";
          helpButton.style.opacity = "0.1";
          makeDark(helpToggle);
          helpToggle = false;
      }
      else{
          helpCard.style.visibility = "hidden";
          helpButton.style.height = "25px";
          helpButton.style.width = "80px";
          helpButton.style.opacity = "1";
          makeDark(helpToggle);
          helpToggle = true;
      }
});
}

function removeAllTodoHTML(){
      
  const query = '.todoedit';
  removeFromHTML(query);
}

export {createHTMLInitial,addInputForm, addNewTodo,updateTodo,getCurrentDate,
  createNewTodoItemHTML,makeHelpCard,toggleHelp,removeAllTodoHTML,getFormProjectData,
  findArrayNum,removeFromHTML,repopulateHTMLFromArray,getFormData,resetFormData
  ,addCurrentHTMLFromArray
};



