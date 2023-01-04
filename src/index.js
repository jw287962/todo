
import {todoItem} from './todo.js'
import './style.css'
import {getDueDate,setDueDate,
    createHTMLInitial,addInputForm, addNewTodo,addInputCheckSpan} from './addHtml.js'


const bodyDiv = document.querySelector('body');
bodyDiv.appendChild(createHTMLInitial());  //makes #content and add header

const contentDiv = document.getElementById('content');   
contentDiv.appendChild(addInputForm());  //add input form under contentDiv


// need to update after input text is entered and user clicks enter
const todoItems = [];
const todoDiv = document.querySelector('.todo'); 
const form = document.querySelector('form');


//get form data

form.addEventListener('submit', function(e) {
const inputTitleData = document.querySelector('.title');
const inputDescriptionData = document.querySelector('.description');
const dateInputData = document.querySelector('.date');


const titleText = inputTitleData.value;
const descriptionText = inputDescriptionData.value;
const dateText = dateInputData.value;

if(titleText.length!=0){
const todoNewItem = todoItem();
    todoNewItem.setTitle(titleText);
    todoNewItem.setDescription(descriptionText);
    todoNewItem.setDueDate(dateText);

    todoDiv.appendChild(addNewTodo(todoNewItem.getTitle(),
    todoNewItem.getDescription(),todoNewItem.getDueDate()));
  

    todoItems.push(todoNewItem);
     inputTitleData.value = "";
inputDescriptionData.value = "";
dateInputData.value = "";
}
else{
    addInputCheckSpan("Can't be empty");
}

 e.preventDefault();
 
});



