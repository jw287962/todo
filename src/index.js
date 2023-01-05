
import {todoItem,todoProject} from './todo.js'
import './style.css'
import {findArrayNum,removeFromHTML,repopulateHTMLFromArray,
    getFormData,resetFormData,createNewTodoItemHTML,makeHelpCard,
    createHTMLInitial,addInputForm,toggleHelp,removeAllTodoHTML} from './addHtml.js'
import {isConfirmed,updateArrayTodoList} from './logic.js'
 
const bodyDiv = document.querySelector('body');
bodyDiv.appendChild(createHTMLInitial());  //makes #content and add header

const contentDiv = document.getElementById('content');   
contentDiv.appendChild(addInputForm());     //add input form under contentDiv

bodyDiv.appendChild(makeHelpCard());

// need to update after input text is entered and user clicks enter
const allProjects = [];

// this is a project
const todoItems = todoProject("Default");

var currentProjectName;


var editNumber;
const form = document.querySelector('form');
let counter = 0;
form.addEventListener('submit', doTodoFormSubmission);
const inputTitleData = document.querySelector('.title');
const inputDescriptionData = document.querySelector('.description');
const dateInputData = document.querySelector('.date');
const priorityData = document.querySelector('#priority');
const submitButton = document.querySelector('.submittodo');
toggleHelp();

var projectView= false;
const projectsButton = document.querySelector('.projectsbutton');

let projectNum = 0;
allProjects.push(todoItems);
repopulateAllProjectArray();
projectsButton.addEventListener('click', makeNewProject());

function makeNewProject(){
    return function(){
        const allProjectButtons = document.querySelectorAll('.editprojectbutton');
  

        
        
    form.removeEventListener('submit', doTodoFormSubmission);
       
    repopulateAllProjectArray();
    checkProjectView(projectView);
    
        // inputDescriptionData.classList.remove('hidden');

                         form.addEventListener('submit', doTodoFormSubmission);

}
}

// GET FORM DATA  + ADD NEW TODO ELEMENT IN HTML
function repopulateAllProjectArray(){
    
        removeAllTodoHTML();
      repopulateHTMLFromArray(allProjects);
      const allProjectButtons = document.querySelectorAll('.editprojectbutton');
      allProjectButtons.forEach(element => {
        element.addEventListener('dblclick',editProjects());
      })
     
     

}

function checkProjectView(boolean){
    if(boolean){
        removeAllTodoHTML()
        inputDescriptionData.classList.add('hidden');
        dateInputData.classList.add('hidden');
        priorityData.parentElement.classList.add('hidden');
        submitButton.value = "Submit Project Name"
        projectView = !boolean;
       
       repopulateAllProjectArray();
    }
    else{
        inputDescriptionData.classList.remove('hidden');
        dateInputData.classList.remove('hidden');
        priorityData.parentElement.classList.remove('hidden');
        submitButton.value = "SET TODO"
        projectView = !boolean;

        repopulateHTMLFromArray(allProjects[projectNum]);
    }
}

function editProjects(){
    return function() {
        checkProjectView(projectView);
    }
   
}
// FUNCTIONS BELOW
function doTodoFormSubmission(event){
    event.preventDefault();
  
  
     const todoData =  getFormData(inputTitleData,inputDescriptionData,dateInputData,priorityData);
  // Here
    if(todoData.titleText.length!=0){   
    todoItems.addProjectItem(updateArrayTodoList(todoData.titleText,todoData.descriptionText,todoData.dateText,todoData.priorityText));
    const holderTodo = createNewTodoItemHTML(todoData.titleText,todoData.descriptionText,
                todoData.dateText,todoData.priorityText,counter);
    counter++;
    todoCheckButtonListener(holderTodo.newTodoDeleteButton);
    editButtonListener(holderTodo.newTodoEditButton);
     resetFormData(inputTitleData,inputDescriptionData,dateInputData,priorityData,submitButton);
     
     allProjects.splice(projectNum,1,todoItems);
     
}
}


function editButtonListener(editButtonDiv){
    editButtonDiv.addEventListener('click', clickedEditButton(editButtonDiv));
}
function clickedEditButton(element){
   
        return function(){
            if(isConfirmed()){
                window.scrollTo(0,0);
            editNumber = findArrayNum(element);
            const todoItemHolder = todoItems.getProjectItem(editNumber);
                // update ARRAY but also RE-ADD ALL ITEMS IN HTML
            
            
                    
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
        const todoData =  getFormData(inputTitleData,inputDescriptionData,dateInputData,priorityData);
// Here

        const holderTodo = updateArrayTodoList(todoData.titleText,todoData.descriptionText,todoData.dateText,todoData.priorityText);
        // console.log("TEST Priority: " + holderTodo.getPriority())
        todoItems.replaceProjectItem(editNumber,holderTodo);
        removeAllTodoHTML();
        counter = 0;
        
        counter =  repopulateHTMLFromArray(todoItems,counter);
    
        readdListenerAfterRemoval();

        event.preventDefault();

        
        resetFormData(inputTitleData,inputDescriptionData,dateInputData,priorityData,submitButton);
        allProjects.splice(0,1,todoItems);
        form.removeEventListener('submit', updateTodoChanges);
        form.addEventListener('submit', doTodoFormSubmission);
        
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
            todoItems.removeProjectItem(findArrayNum(element),1);
            removeAllTodoHTML();
     
        counter =  repopulateHTMLFromArray(todoItems,counter);
        allProjects.splice(projectNum,1,todoItems);
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
    localStorage.setItem('todoItems', todoItems.getProject())

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
