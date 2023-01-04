
import {todoItem} from './todo.js'
import './style.css'
import {deleteTodo,getCurrentDate,
    createHTMLInitial,addInputForm, addNewTodo,updateTodo} from './addHtml.js'

 
const bodyDiv = document.querySelector('body');
bodyDiv.appendChild(createHTMLInitial());  //makes #content and add header

const contentDiv = document.getElementById('content');   
contentDiv.appendChild(addInputForm());  //add input form under contentDiv


// need to update after input text is entered and user clicks enter
const todoItems = [];
const todoDiv = document.querySelector('.todo'); 
const form = document.querySelector('form');
getTodoItemsStorage()

let counter = 0;
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
    todoNewItem.getDescription(),todoNewItem.getDueDate()
    ));
  

    todoItems.push(todoNewItem);
    populateStorage();
     inputTitleData.value = "";
inputDescriptionData.value = "";
dateInputData.value = getCurrentDate();

counter++;
}

const findDeleteButton = document.querySelectorAll('.deletebutton');



findDeleteButton.forEach(element => {
   
   
    if(todoItems.length >= 2){
        element.removeEventListener("click", removeTodoHTML(element));
    }
    if(todoItems.length != 0){
       
        element.addEventListener("click", removeTodoHTML(element));
        // delete upon button click
       
    }
});



e.preventDefault();
});

function removeTodoHTML(element){
    const toRemoveDiv = element.parentElement;
 const removeNum = toRemoveDiv.id
 console.clear();
  return function(){
    deleteTodo(toRemoveDiv);
  
   todoItems.splice(removeNum,1);
  
   printArray(todoItems);
   
  }
}

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
