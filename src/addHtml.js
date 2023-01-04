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
  submit.textContent = "submit";
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

function addNewTodo(titleText,descriptionText,dueDate){
  //create div with new todo text inside button.
  const newTodoButton = document.createElement('button');
  newTodoButton.classList.add('todoedit');


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



  newTodoButton.appendChild(newTodoTitleDiv);
  newTodoButton.appendChild(newTodoDescriptionDiv);
  newTodoButton.appendChild(newTodoDueDateDiv);

  return newTodoButton;
}

function addInputCheckSpan(text){
 



}


// export

export {createHTMLInitial,addInputForm, addNewTodo,addInputCheckSpan};



