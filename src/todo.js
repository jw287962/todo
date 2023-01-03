export {todoItem};
const todoProject = (todoItem) =>  {
    const proto = { 
        project,
        //code 
      }
};

const todoItem = (title,description,priority,dueDate,completed) =>  {
    const proto = { 
        title,
        description,
        priority, 
        dueDate,
        completed,
    
        //code 
      }
      function setTitle(title){
        proto.title = title;
      }
      function getTitle(){
       return proto.title;
      }
      function setDescription(description){
        proto.description = description;
      }
      function getDescription(){
       return proto.description;
      }

    
return {setTitle,getTitle,setDescription,getTitle};
};

// const buyBooks = todoItem();
// buyBooks.setTitle('Buy Books');
// console.log(buyBooks.getTitle());

