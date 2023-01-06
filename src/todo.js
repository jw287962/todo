export {todoItem,todoProject};
const todoProject = (name) =>  {
    const todoProject = [];
    var projectName = name;

      function addProjectItem(todoItems){
        todoProject.push(todoItems);
      }
      function getProject(){
        return todoProject;
      }
      function removeProjectItem(number){
        todoProject.splice(number,1);
      }
      function replaceProjectItem(number,todoItems){
        todoProject.splice(number,1,todoItems);
      }
      
      function getProjectItem(number){
        return todoProject[number];
      }

      function setProjectName(name){
        projectName = name;
      }
      function getProjectName(){
      return projectName;
      }
return {addProjectItem,removeProjectItem,replaceProjectItem,
    getProjectItem,getProject,setProjectName,getProjectName};
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

