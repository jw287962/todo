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
      function setDueDate(dueDate){
        proto.dueDate = dueDate;
      
      }
      function getDueDate(){
       return proto.dueDate;
      }

      function setPriority(priority){
        proto.priority = priority;
      
      }
      function getPriority(){
       return proto.priority;
      }
    
return {setPriority,getPriority,
    setTitle,getTitle,setDescription,getDueDate,setDueDate,getDescription,getTitle};
};

// const buyBooks = todoItem();
// buyBooks.setTitle('Buy Books');
// console.log(buyBooks.getTitle());

