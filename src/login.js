import { enlargeButton} from './addHtml';
import {makeDark} from './logic';
export default showLoginForm;


let isBright = true;
let hasSetListener = false;


function checkSubmission(event){
    event.preventDefault();

   
}
function displayError(text,event){
    const errorSpan = event.target.nextSibling.nextSibling;
    event.target.setCustomValidity(text);
    errorSpan.classList.add('invalid');
    errorSpan.textContent = text;
}
function removeDisplayError(event){
    event.target.setCustomValidity("");
    const errorSpan = event.target.nextSibling.nextSibling;
    errorSpan.classList.remove('invalid');
    errorSpan.textContent = "";
}
function checkFormData(event){
let errorText;
if(event.target.type==="email"){
    if(event.target.validity.typeMismatch){
        errorText = "I am expecting an email address!";
        displayError(errorText,event);
    }
    else{
        removeDisplayError(event);
    }
}
else if(event.target.type==="password"){
    const passRegex = /^[a-z]+[A-Z]+[0-9]/;
    console.log(passRegex.test('aS1'));
   if(passRegex.test(event.target.value)){
    removeDisplayError(event);
   }else{
  
    errorText = "Password must include number, text, and capital!";
    event.target.setCustomValidity(errorText);
    displayError(errorText,event);
   }
}
else{
    removeDisplayError(event);

    if(event.target.validity.valueMissing){
        errorText = "I am expecting text!";
       event.target.setCustomValidity(errorText);
       displayError(errorText,event);
    }
  
}}


function checkFormValidity(){
    const loginForm = document.querySelector('.loginform');

    loginForm.addEventListener('submit', checkSubmission);    
    const nameInput = document.querySelector('.name');
    nameInput.addEventListener('input', checkFormData);
    const emailInput = document.querySelector('.email');
    emailInput.addEventListener('input', checkFormData);
    const password = document.querySelector('.pwd');
    password.addEventListener('input', checkFormData);
    const pwdConfirm = document.querySelector('.pwdconfirm');
    pwdConfirm.addEventListener('input', checkFormData);



}
function showLoginForm(){
  
    

    const loginFormDiv = document.querySelector('.login');
    loginFormDiv.classList.toggle('hidden');
    const headerButtonDiv = document.querySelector(".headerbuttondiv");
    const loginButton = document.querySelector(".loginbutton");
    makeDark(isBright);
    enlargeButton(isBright,loginButton);
  
    if (isBright) {
        headerButtonDiv.style.opacity = "0";
      } else {
        headerButtonDiv.style.opacity = "1";
      
      }
      isBright = !isBright;
      checkFormValidity();
      return false;

  
}
