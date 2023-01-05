import {todoItem} from './todo.js'


function makeDark(isTrue){
    const htmlDoc = document.querySelector('html');
    const contentDiv = document.getElementById('content');   
    if(isTrue){
    htmlDoc.style.background =  "rgba(0, 0, 0, .5)";
    contentDiv.style.filter = "brightness(50%)";
    }
    else{
    htmlDoc.style.background =  "rgba(240, 238, 241, 0)";
    contentDiv.style.filter = "brightness(100%)";
    }
}

function isConfirmed(){
    const isConfirmed = true;
    // confirm("ARE YOU SURE?");
    return isConfirmed;
}


function updateArrayTodoList(titleText,descriptionText,dateText,priorityText){
    const todoNewItem = todoItem();
    todoNewItem.setTitle(titleText);
    todoNewItem.setDescription(descriptionText);
    todoNewItem.setDueDate(dateText);
    todoNewItem.setPriority(priorityText);
    return todoNewItem;
}

function updateProjectArray(){
    
}

export {makeDark,isConfirmed,updateArrayTodoList};
