
import {todoItem} from './todo.js'
import './style.css'



function createHTMLInitial(){
    //Create content Div
    const contentDiv = document.createElement('div');
    contentDiv.setAttribute('id','content');


  return contentDiv;
}
const body = document.querySelector('body');
body.appendChild(createHTMLInitial());

