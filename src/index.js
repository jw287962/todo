
import {todoItem} from './todo.js'
import './style.css'
import {createHTMLInitial,addInputForm, addNewTodo} from './addHtml.js'


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
const inputData = document.querySelector('input');
const text = inputData.value;
const todoNewItem = todoItem();
todoNewItem.setDescription(text);

    todoDiv.appendChild(addNewTodo(text));
    todoItems.push(todoNewItem);
 e.preventDefault();


 
});



