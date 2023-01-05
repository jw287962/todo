
import {todoItem} from './todo.js'
import './style.css'
import {findArrayNum,removeFromHTML,repopulateHTMLFromArray,
    getFormData,resetFormData,createNewTodoItemHTML,makeHelpCard,
    createHTMLInitial,addInputForm,toggleHelp} from './addHtml.js'
import {isConfirmed,updateArrayTodoList} from './logic.js'
 
const bodyDiv = document.querySelector('body');
bodyDiv.appendChild(createHTMLInitial());  //makes #content and add header

const contentDiv = document.getElementById('content');   
contentDiv.appendChild(addInputForm());     //add input form under contentDiv

bodyDiv.appendChild(makeHelpCard());

// need to update after input text is entered and user clicks enter
const todoItems = [];
var editNumber;
const form = document.querySelector('form');

let counter = 0;

form.addEventListener('submit', doTodoFormSubmission);


// GET FORM DATA  + ADD NEW TODO ELEMENT IN HTML



function doTodoFormSubmission(event){
 
    const inputTitleData = document.querySelector('.title');
    const inputDescriptionData = document.querySelector('.description');
    const dateInputData = document.querySelector('.date');
    const priorityData = document.querySelector('#priority');
    const submitButton = document.querySelector('.submittodo');
  
     const todoData =  getFormData(inputTitleData,inputDescriptionData,dateInputData,priorityData);
  // Here
  if(todoData.titleText.length!=0){   
  todoItems.push(updateArrayTodoList(todoData.titleText,todoData.descriptionText,todoData.dateText,todoData.priorityText));
  

  const holderTodo = createNewTodoItemHTML(todoData.titleText,todoData.descriptionText,
              todoData.dateText,todoData.priorityText,counter);
      counter++;
  

      todoCheckButtonListener(holderTodo.newTodoDeleteButton);
    
      editButtonListener(holderTodo.newTodoEditButton);
  
   

  resetFormData(inputTitleData,inputDescriptionData,dateInputData,priorityData,submitButton);
  event.preventDefault();
}
}


toggleHelp();
// 

// FUNCTIONS BELOW




    function editButtonListener(editButtonDiv){
        editButtonDiv.addEventListener('click', clickedEditButton(editButtonDiv));
    }
    function clickedEditButton(element){
            return function(){
                if(isConfirmed()){
            
                editNumber = findArrayNum(element);
                const todoItemHolder = todoItems[editNumber];
                    // update ARRAY but also RE-ADD ALL ITEMS IN HTML
                
                const inputTitleData = document.querySelector('.title');
                const inputDescriptionData = document.querySelector('.description');
                const dateInputData = document.querySelector('.date');
                const priorityData = document.querySelector('#priority');
                const submitButton = document.querySelector('.submittodo');
                        
                submitButton.value = "***UPDATE***";
            inputTitleData.value = todoItemHolder.getTitle();;
                inputDescriptionData.value = todoItemHolder.getDescription();
                dateInputData.value = todoItemHolder.getDueDate();
                priorityData.value = todoItemHolder.getPriority().toUpperCase();
                //  neeed to get updated data
        form.removeEventListener('submit', doTodoFormSubmission);
        form.addEventListener('submit', updateTodoChanges);
        
        } }   }

     function updateTodoChanges(event){
        
        console.log("UPDATETODOCHANGE" +event);
            
           
        
     const inputTitleData = document.querySelector('.title');
    const inputDescriptionData = document.querySelector('.description');
    const dateInputData = document.querySelector('.date');
    const priorityData = document.querySelector('#priority');
    const submitButton = document.querySelector('.submittodo');
  
     const todoData =  getFormData(inputTitleData,inputDescriptionData,dateInputData,priorityData);
  // Here
  
            const holderTodo = updateArrayTodoList(todoData.titleText,todoData.descriptionText,todoData.dateText,todoData.priorityText);
            // console.log("TEST Priority: " + holderTodo.getPriority())
            todoItems.splice(editNumber,1,holderTodo);
            removeAllTodoHTML();
            counter = 0;
       
            counter =  repopulateHTMLFromArray(todoItems,counter);
           
            readdListenerAfterRemoval();

            event.preventDefault();

           
        resetFormData(inputTitleData,inputDescriptionData,dateInputData,priorityData,submitButton);

            form.removeEventListener('submit', updateTodoChanges);
            form.addEventListener('submit', doTodoFormSubmission);
           
        }
    function removeAllTodoHTML(){
      
        const query = '.todoedit';
        removeFromHTML(query);
    }
       
   
    function todoCheckButtonListener(holderTodo){
        holderTodo.addEventListener("dblclick", removeTodoElements(holderTodo)); 
    }
// CHECK IF COMPLETION AND UPDATE
const removeTodoElements = (element) =>{

    return function(){
        if(isConfirmed()){
            counter = 0;
            // update ARRAY but also RE-ADD ALL ITEMS IN HTML
            todoItems.splice(findArrayNum(element),1);
            removeAllTodoHTML();
        
        counter =  repopulateHTMLFromArray(todoItems,counter);
        
        readdListenerAfterRemoval();
        
        } } }

        function readdListenerAfterRemoval(){
            const deleteButtonDivs = document.querySelectorAll('.deletebutton');
            deleteButtonDivs.forEach(element => {
                
                todoCheckButtonListener(element);
                
            });
    
            const editButtonDiv = document.querySelectorAll('.editbutton');
            editButtonDiv.forEach(element => {
                editButtonListener(element);
            });
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

function addFromStorage(){

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
