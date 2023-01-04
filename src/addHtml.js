import {format,getYear,getMonth,getDaysInMonth,startOfToday,getDayOfYear} from '../node_modules/date-fns' 


function createHTMLInitial(){
    //Create content Div
    const contentDiv = document.createElement('div');
    contentDiv.setAttribute('id','content');

    // header
    const headerDiv = document.createElement('div');
    headerDiv.classList.add('header');

    const headerText = document.createElement('p');
    headerText.textContent = "TODO LIST";
      // make TODO DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // append
    headerDiv.appendChild(headerText);
    contentDiv.appendChild(headerDiv);
    contentDiv.appendChild(todoDiv);


  return contentDiv;
}
function getCurrentDate(){
  const today = new Date();
  const date = format((today),'yyyy-MM-dd');
  return date;
}

function addInputForm(){

  const todoDiv = document.querySelector('.todo');

// create INPUT for getting text

  const form = document.createElement('form');
 
  const fieldset = document.createElement('fieldset');
  const inputTitleHTML = document.createElement('input');

  inputTitleHTML.classList.add('title');
  inputTitleHTML.type = "text";
  inputTitleHTML.placeholder = "Type TITLE for your todo reminder";
 
  // const span = document.createElement('span');
  // span.classList.add('spanerror')


  const inputDescriptionHTML = document.createElement('input');
  inputDescriptionHTML.classList.add('description');
  inputDescriptionHTML.type = "text";
  inputDescriptionHTML.placeholder = "Type DESCRIPTION your todo reminder";

  const dateInput = document.createElement('input');
  dateInput.type = "date";
  dateInput.value = getCurrentDate();
  dateInput.classList.add('date');

  const submit = document.createElement('input');
submit.value = "Set Todo";
  submit.type = "submit";


  todoDiv.appendChild(form);
  form.appendChild(fieldset);
  fieldset.appendChild(inputTitleHTML);
  // fieldset.appendChild(span);
  fieldset.appendChild(inputDescriptionHTML);
  fieldset.appendChild(dateInput);
  fieldset.appendChild(submit);

  return todoDiv;
}

function addNewTodo(titleText,descriptionText,dueDate,counter){
  //create div with new todo text inside button.



  const newTodoDeleteButton = document.createElement('button');
  newTodoDeleteButton.classList.add('deletebutton');
  newTodoDeleteButton.textContent = "✔";

  const newTodoDiv = document.createElement('div');
  newTodoDiv.classList.add('todoedit');
  newTodoDiv.setAttribute('id',`${counter}`);

  const newTodoTitleDiv = document.createElement('div');
  newTodoTitleDiv.classList.add('todotitle');

  const newTodoDescriptionDiv = document.createElement('div');
  newTodoDescriptionDiv.classList.add('tododescription');

  const newTodoDueDateDiv = document.createElement('input');
  newTodoDueDateDiv.type = 'date';
  newTodoDueDateDiv.value = dueDate;
  newTodoDueDateDiv.classList.add('tododuedate');
  
  newTodoTitleDiv.textContent = titleText;
  newTodoDescriptionDiv.textContent =descriptionText;
  // newTodoDueDateDiv.textContent = dueDate;



  newTodoDiv.appendChild(newTodoTitleDiv);
  newTodoDiv.appendChild(newTodoDeleteButton);
  newTodoDiv.appendChild(newTodoDescriptionDiv);
  newTodoDiv.appendChild(newTodoDueDateDiv);

  return {newTodoDiv,newTodoDeleteButton};
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
  
  todoItems.forEach(element => {
      createNewTodoItem(element.getTitle(),element.getDescription(),element.getDueDate(),counter);
      counter++;
  });
  return counter;
}


function getFormData(inputTitleData,inputDescriptionData,dateInputData){
  
  const titleText = inputTitleData.value;
  const descriptionText = inputDescriptionData.value;
  const dateText = dateInputData.value;

  return {titleText,descriptionText,dateText}
}

function resetFormData(inputTitleData,inputDescriptionData,dateInputData){

  inputTitleData.value = "";
  inputDescriptionData.value = "";
  dateInputData.value = getCurrentDate();
}

// export

function createNewTodoItem(titleText,descriptionText,dateText,counter){
  const todoDiv = document.querySelector('.todo'); 
  var holderTodo = addNewTodo(titleText,descriptionText,dateText,counter);
       todoDiv.appendChild(holderTodo.newTodoDiv);
    
// const findDeleteButton = document.querySelectorAll('.deletebutton');
// // removeeventlistener of the delete button to prevent extra removal
// findDeleteButton.forEach(element => {
   
   // });
   

   return holderTodo;

}


function removeFromArrayNum(element){
  const toRemoveDiv = element.parentElement;
 const removeNum = toRemoveDiv.id;
   
    return removeNum;
}

export {createHTMLInitial,addInputForm, addNewTodo,updateTodo,getCurrentDate,
  createNewTodoItem,
  removeFromArrayNum,removeFromHTML,repopulateHTMLFromArray,getFormData,resetFormData
};



