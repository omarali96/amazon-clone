
import { fetchAPI } from "../utils/fetch_api.js";
import vid from "../helper/validation.js";

// get input elements
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const email = document.querySelector("#Email");
const passWord = document.querySelector("#passWord");

// get Error elements
const firstNameError = document.querySelector("#firstNameError");
const lastNameError = document.querySelector("#lastNameError");
const emailError = document.querySelector("#emailError");
const passError = document.querySelector("#passError");

const submit = document.querySelector("#sup");



submit.addEventListener('click', register);

function register(e) {
    e.preventDefault();
    let flag = false;
    emailError.innerHTML = ""
    firstNameError.innerHTML = ""
    lastNameError.innerHTML = ""
    passError.innerHTML = ""
    if(!vid.validateEmail(email.value)){
        emailError.innerHTML =  "not valid email";
        flag = true;
    }
    if(!vid.validateEmpty(firstName.value)){
        firstNameError.innerHTML =  "Empty firstName!!";
        flag = true;
    }
    if(!vid.validateEmpty(lastName.value)){
        lastNameError.innerHTML =  "Empty lastName!!";
        flag = true;
    }
    if(!vid.validatePassword(passWord.value,6)){
        passError.innerHTML = "Password  Must be more than 6 char!!";
        flag = true;
    }
    if( flag) return;


   let body =  {
        "first_name":firstName.value,
        "last_name":lastName.value,
        "email": email.value,
        "password":passWord.value
    }
    let header = {
        "Content-Type": "application/json"
    }
    let result =  fetchAPI("http://localhost:5000/api/users/register",header,body,"POST");
    console.log(result)
}









