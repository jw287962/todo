
function createHTMLInitial(){
    //Create content Div
    const contentDiv = document.createElement('div');
    contentDiv.setAttribute('id','content');

    // header
    const headerDiv = document.createElement('div');
    headerDiv.textContent = "TODO LIST";
    headerDiv.classList.add('header');

      // make TODO DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // append
    contentDiv.appendChild(headerDiv);
    contentDiv.appendChild(todoDiv);


  return contentDiv;
}

function addInputForm(){

  const todoDiv = document.querySelector('.todo');

// create INPUT for getting text

  const form = document.createElement('form');
  const inputHTML = document.createElement('input');
  inputHTML.type = "text";

  todoDiv.appendChild(form);
  form.appendChild(inputHTML);

  return todoDiv;
}

function addNewTodo(text){
  //create div with new todo text inside button.
  const newTodoButton = document.createElement('button');
  newTodoButton.classList.add('todoedit');
  const newTodoDiv = document.createElement('div');

  newTodoDiv.textContent = text;

  newTodoButton.appendChild(newTodoDiv);
  return newTodoButton;
}



// export

export {createHTMLInitial,addInputForm, addNewTodo};



