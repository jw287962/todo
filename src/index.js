
import {todoItem} from './todo.js'
import './style.css'
import {getCurrentDate, removeFromArrayNum,removeFromHTML,repopulateHTMLFromArray,
    getFormData,resetFormData,createNewTodoItem,
    createHTMLInitial,addInputForm, addNewTodo,updateTodo} from './addHtml.js'

 
const bodyDiv = document.querySelector('body');
bodyDiv.appendChild(createHTMLInitial());  //makes #content and add header

const contentDiv = document.getElementById('content');   
contentDiv.appendChild(addInputForm());  //add input form under contentDiv


// need to update after input text is entered and user clicks enter
const todoItems = [];
// const todoDiv = document.querySelector('.todo'); 
const form = document.querySelector('form');

getTodoItemsStorage()

let counter = 0;
//get form data and adds new todo element 
submitTodoQuery();
// 



function submitTodoQuery(){
    form.addEventListener('submit', function(e) {
        const inputTitleData = document.querySelector('.title');
      const inputDescriptionData = document.querySelector('.description');
      const dateInputData = document.querySelector('.date');
    
       const todoData =  getFormData(inputTitleData,inputDescriptionData,dateInputData);
    
    updateArrayTodoList(todoData.titleText,todoData.descriptionText,todoData.dateText);
    if(todoData.titleText.length!=0){   
    const holderTodo = createNewTodoItem(todoData.titleText,todoData.descriptionText,
                todoData.dateText,counter);
        counter++;
    
       addEventListenerCheckButton(holderTodo.newTodoDeleteButton);
    }
    
    populateStorage();
    resetFormData(inputTitleData,inputDescriptionData,dateInputData);
    
    
    
    e.preventDefault();
    });
}

 const removeTodoElements = (element) =>{
    return function(){
        counter = 0;
     // update ARRAY but also RE-ADD ALL ITEMS IN HTML
    
    todoItems.splice(removeFromArrayNum(element),1);
    const query = '.todoedit';
    removeFromHTML(query);
   
  counter =  repopulateHTMLFromArray(todoItems,counter);
  
    const deleteButtonDivs = document.querySelectorAll('.deletebutton');
    deleteButtonDivs.forEach(element => {
     
        addEventListenerCheckButton(element);
    });
  
}
}

// create the new TODO from Form and update ARRAY


function addEventListenerCheckButton(holderTodo){
    holderTodo.addEventListener("click", removeTodoElements(holderTodo)); 
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
