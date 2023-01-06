
import {todoItem,todoProject} from './todo.js'
import './style.css'
import {findArrayNum,removeFromHTML,repopulateHTMLFromArray,getFormProjectData,
    getFormData,resetFormData,createNewTodoItemHTML,makeHelpCard,
    createHTMLInitial,addInputForm,toggleHelp,removeAllTodoHTML
,addCurrentHTMLFromArray,createNewProjectHTML} from './addHtml.js'
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
let form = document.querySelector('.todoform');
let inputTitleData = document.querySelector('.title');
let inputDescriptionData = document.querySelector('.description');
let dateInputData = document.querySelector('.date');
let priorityData = document.querySelector('#priority');
let submitButton = document.querySelector('.submittodo');
var editNumber;

var counter = 0;
form.addEventListener('submit', doTodoFormSubmission);


const todoDiv = document.querySelector('.todo');
toggleHelp();


var projectView= true;
const projectsButton = document.querySelector('.projectsbutton');


allProjects.push(todoItems);
var projectLength = allProjects.length;

var projectNum = 0;
// For default View
repopulateAllProjectArray();

projectsButton.addEventListener('click', makeNewProject());


function makeNewProject(){
    return function(){
        console.log('make new Project')
        
        resetFormListeners();

        // inputDescriptionData.classList.remove('hidden');
            if(checkProjectView(projectView)){  //true is hidden
      
              // submitButton.replaceWith(submitButton.cloneNode(true));
           
              form.addEventListener('submit', addNewProject)
            }
            else{    }
}
}


function repopulateAllProjectArray(){
    
        removeAllTodoHTML();
     repopulateHTMLFromArray(allProjects, 0);

    
      const allProjectButtons = document.querySelectorAll('.editprojectbutton');
     let counter = 0; //for project addition 
      allProjectButtons.forEach(element => {
        element.addEventListener('dblclick',editProjects);
        element.setAttribute('id',counter);
        counter++;
      })
     

}
function repopulateCurrentProject(num){
    console.log('test' + num);
     //for adding project
    // const todoDiv = document.querySelector('.todo');
    // const allProjectButtons = document.querySelectorAll('.editprojectbutton');
    let counter = 0;
    allProjects.forEach(element => {
       
        if(counter == num){
            
          var holderCardDiv =   createNewProjectHTML(element.getProjectName()).newTodoDiv;
          holderCardDiv.addEventListener('dblclick',editProjects);
          
          } 
          
          counter++;
         
    })
  
  
        
}
function addCurrentProjectCard(){
    
    const currentDivHolder = addCurrentHTMLFromArray(allProjects,projectNum).newTodoDiv;
    console.log(currentDivHolder);
    currentDivHolder.addEventListener('dblclick',editProjects);
    // const allProjectButtons = document.querySelectorAll('.editprojectbutton');
    
}
function removeProjectCompletely(event){
 const removeProjectNum = event.currentTarget.previousElementSibling.id;
    allProjects.splice(removeProjectNum,1);

    repopulateAllProjectArray();
}
function addListenerProjectDelete(){
 
    const everyProjectDeleteButton = document.querySelectorAll('.deleteprojectbutton');
    console.log(everyProjectDeleteButton);
    everyProjectDeleteButton.forEach(element => {
        console.log(element);
        element.addEventListener('click', removeProjectCompletely);
        
    });

}
function checkProjectView(boolean){
    removeAllTodoHTML()
  
    if(boolean){
        console.log('make hidden' + projectView );
        
        inputDescriptionData.classList.add('hidden');
        dateInputData.classList.add('hidden');
        priorityData.parentElement.classList.add('hidden');
        submitButton.value = "Submit Project Name"
        projectView = !boolean;
        console.log(projectView);
        
        resetFormListeners();
        form.addEventListener('submit', addNewProject);
       repopulateAllProjectArray();

       addListenerProjectDelete();
       return boolean;
    }
    else{
        // console.log('make visible :' + projectView);
        inputDescriptionData.classList.remove('hidden');
        dateInputData.classList.remove('hidden');
        priorityData.parentElement.classList.remove('hidden');
        submitButton.value = "SET TODO"
        projectView = !boolean;
        // console.log("Test" + projectNum);

        resetFormListeners();
        
        form.addEventListener('submit', doTodoFormSubmission);
        console.log("Single Project View projectNum:" +projectNum);

        repopulateCurrentProject(projectNum);
       counter =  repopulateHTMLFromArray(allProjects[projectNum], 0);
       console.log(counter);
        const todoEditButton = document.querySelectorAll('.editbutton'); 
      let count = 0;
        todoEditButton.forEach(element => {
            editButtonListener(element);
            element.parentElement.setAttribute('id',count)
            count++;
        });
        return boolean;

    }
  
}

function editProjects(event){
    event.preventDefault();
    counter = 0;
   
   
      if(projectView){  //true is hidden
       
      }
      else{
        projectNum = event.currentTarget.id;
      
        // console.log("edit project projectView:" + projectView)
    }
    checkProjectView(projectView);
   
}
function addNewProject(event){
    event.preventDefault();
    console.log('AddnewProject:  pushing new project Name changes');
    const todoData =  getFormProjectData(inputTitleData);
 
        const newTodoProject = todoProject();
        newTodoProject.setProjectName(todoData);
      if(todoData.length!=0){   
      
        
        allProjects.push(newTodoProject);
        
        projectLength = allProjects.length;
        
        // allProjects[projectNum].getProjectName()

      repopulateAllProjectArray();
      
      }
      resetFormListeners();
      form.addEventListener('submit', addNewProject)
     
}
// FUNCTIONS BELOW
function doTodoFormSubmission(event){
  event.preventDefault();
  console.log("submit form submission");
    
     const todoData =  getFormData(inputTitleData,inputDescriptionData,dateInputData,priorityData);
     const newTodoItem = todoProject(allProjects[projectNum].getProjectName());
       
    

     for(let i = 0; i < allProjects[projectNum].getProject().length; i++){
       
        newTodoItem.addProjectItem(allProjects[projectNum].getProject()[i]);
     }
  
  console.log("afe" +newTodoItem.getProjectName());
    if(todoData.titleText.length!=0){   

        // console.log(allProjects[projectNum]);
        console.log(counter);
        newTodoItem.addProjectItem(updateArrayTodoList(todoData.titleText,todoData.descriptionText,todoData.dateText,todoData.priorityText));
        
    const holderTodo = createNewTodoItemHTML(todoData.titleText,todoData.descriptionText,
                todoData.dateText,todoData.priorityText,counter);
  counter++;
    todoCheckButtonListener(holderTodo.newTodoDeleteButton);
    editButtonListener(holderTodo.newTodoEditButton);
     resetFormData(inputTitleData,inputDescriptionData,dateInputData,priorityData,submitButton);
     
     console.log('do submission on todo Item  ProjectNum:' + projectNum)

//CREATE THE PROJECT 
//ADD THE STUFF TO THE PROJECT
console.log(newTodoItem.getProject());
    //  ADD A NEW PROJECT INTO ALLPROJECTS
     allProjects.splice(projectNum,1,newTodoItem);

    
     
}
}

function editButtonListener(editButtonDiv){
    console.log(editButtonDiv + "editbuttondiv")
    editButtonDiv.addEventListener('click', clickedEditButton);
}
function clickedEditButton(event){
   
     event.preventDefault();
       
            let element = event.currentTarget;
           
            console.log('clicked edit button. Await Submission todo Items' + element);
            if(isConfirmed()){
                window.scrollTo(0,0);
            editNumber = findArrayNum(element);
                console.log(editNumber);


            const todoItemHolder = allProjects[projectNum].getProject()[editNumber];
                // update ARRAY but also RE-ADD ALL ITEMS IN HTML
            
            
                    
            submitButton.value = "***UPDATE***";
                inputTitleData.value = todoItemHolder.getTitle();;
            inputDescriptionData.value = todoItemHolder.getDescription();
            dateInputData.value = todoItemHolder.getDueDate();
            priorityData.value = todoItemHolder.getPriority().toUpperCase();
         
           resetFormListeners();
            form.addEventListener('submit', updateTodoChanges);
            } 
  }

    function updateTodoChanges(event){
       
            event.preventDefault();
            console.log('update the submission Changes');
// console.log(event.currentTarget)

            // editNumber = findArrayNum(event.currentTarget);
            console.log(editNumber);
      
        
        const todoData =  getFormData(inputTitleData,inputDescriptionData,dateInputData,priorityData);
// Here

        const holderTodoItem = updateArrayTodoList(todoData.titleText,todoData.descriptionText,todoData.dateText,todoData.priorityText);
        // console.log("TEST Priority: " + holderTodo.getPriority())
        const todoItem = allProjects[projectNum].replaceProjectItem(editNumber,holderTodoItem);
        removeAllTodoHTML();
        counter = 0;

        addCurrentProjectCard();
        counter =  repopulateHTMLFromArray(allProjects[projectNum],counter);
    
        readdListenerAfterRemoval();
        resetFormData(inputTitleData,inputDescriptionData,dateInputData,priorityData,submitButton);
       
        console.log('updateChanges');
        resetFormListeners();
        form.addEventListener('submit', doTodoFormSubmission);
    
    }

function resetFormListeners(){
    
    form.replaceWith(form.cloneNode(true));
   
    redefineAllFormElementNode();
   }

function redefineAllFormElementNode(){
    
    form = document.querySelector('.todoform');
    inputTitleData = document.querySelector('.title');
    inputDescriptionData = document.querySelector('.description');
    dateInputData = document.querySelector('.date');
    priorityData = document.querySelector('#priority');
    submitButton = document.querySelector('.submittodo');
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
