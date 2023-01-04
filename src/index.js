
import {todoItem} from './todo.js'
import './style.css'
import {getCurrentDate,
    createHTMLInitial,addInputForm, addNewTodo,updateTodo} from './addHtml.js'

 
const bodyDiv = document.querySelector('body');
bodyDiv.appendChild(createHTMLInitial());  //makes #content and add header

const contentDiv = document.getElementById('content');   
contentDiv.appendChild(addInputForm());  //add input form under contentDiv


// need to update after input text is entered and user clicks enter
const todoItems = [];
const todoDiv = document.querySelector('.todo'); 
const form = document.querySelector('form');

var removeNum;
getTodoItemsStorage()

let counter = 0;
//get form data and adds new todo element 
form.addEventListener('submit', function(e) {
    const inputTitleData = document.querySelector('.title');
const inputDescriptionData = document.querySelector('.description');
const dateInputData = document.querySelector('.date');
const titleText = inputTitleData.value;
const descriptionText = inputDescriptionData.value;
const dateText = dateInputData.value;

updateArrayTodoList(titleText,descriptionText,dateText);
    createNewTodoItem(titleText,descriptionText,dateText);

populateStorage();
inputTitleData.value = "";
inputDescriptionData.value = "";
dateInputData.value = getCurrentDate();


e.preventDefault();
});
// 

 const removeTodoElement = (element) =>{
    return function(){

     // update ARRAY but also RE-ADD ALL ITEMS IN HTML
    const toRemoveDiv = element.parentElement;
removeNum = toRemoveDiv.id;
    counter = 0;
    todoItems.splice(removeNum,1);
    
    const removeAllTodoDivs = document.querySelectorAll('.todoedit');
    removeAllTodoDivs.forEach(element => {
        element.remove();
    });
   
    todoItems.forEach(element => {
        createNewTodoItem(element.getTitle(),element.getDescription(),element.getDueDate(),counter);
    });
}
}


// create the new TODO from Form and update ARRAY
function createNewTodoItem(titleText,descriptionText,dateText){
if(titleText.length!=0){
   var holderTodo = addNewTodo(titleText,descriptionText,dateText,counter);
        todoDiv
        .appendChild(holderTodo.newTodoDiv);
     
// const findDeleteButton = document.querySelectorAll('.deletebutton');
// // removeeventlistener of the delete button to prevent extra removal
// findDeleteButton.forEach(element => {
 
holderTodo.newTodoDeleteButton.addEventListener("click", removeTodoElement(holderTodo.newTodoDeleteButton));
     
       
 
    // });
 
    counter++;
    }

    console.info(printArray(todoItems));

}

function updateArrayTodoList(titleText,descriptionText,dateText){
    const todoNewItem = todoItem();
    todoNewItem.setTitle(titleText);
    todoNewItem.setDescription(descriptionText);
    todoNewItem.setDueDate(dateText);
    todoItems.push(todoNewItem);
}

// PRINTS TODO ARRAY titles
function printArray(array){
    for(let i = 0; i<array.length;i++){
        console.log(array[i].getTitle());
       }
}

function populateStorage(){
    localStorage.setItem('todoItems', todoItems)

}
function getTodoItemsStorage(){
    const holder = localStorage.getItem('todoItems');
    console.log(holder);
}


// function storageAvailable(type) {
//     let storage;
//     try {
//         storage = window[type];
//         const x = '__storage_test__';
//         storage.setItem(x, x);
//         storage.removeItem(x);
//         return true;
//     }
//     catch (e) {
//         return e instanceof DOMException && (
//             // everything except Firefox
//             e.code === 22 ||
//             // Firefox
//             e.code === 1014 ||
//             // test name field too, because code might not be present
//             // everything except Firefox
//             e.name === 'QuotaExceededError' ||
//             // Firefox
//             e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
//             // acknowledge QuotaExceededError only if there's something already stored
//             (storage && storage.length !== 0);
//     }
// }
