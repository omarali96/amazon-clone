import { fetchAPI } from "../utils/fetch_api.js";
import vid from "../helper/validation.js";

// get input elements
const email = document.querySelector("#Email");
const passWord = document.querySelector("#passWord");
const submit = document.querySelector("#sign-in");

// get Error elements
const emailError = document.querySelector("#emailError");
const passError = document.querySelector("#passError");

//Switch to Home Page
submit.addEventListener('click', login);

//login to websitea
async function login(e) {
    e.preventDefault();
    let flag = false;
    emailError.innerHTML = ""
    passError.innerHTML = ""
    if (!vid.validateEmail(email.value)) {
        emailError.innerHTML = "not valid email";
        flag = true;
    }
    if (!vid.validatePassword(passWord.value, 6)) {
        passError.innerHTML = "Password  Must be more than 6 char!!";
        flag = true;
    }
    if (flag) return;

    let body = {
        "email": email.value,
        "password": passWord.value
    }
    let header = {
        "Content-Type": "application/json"
    }
   
    let result = await fetchAPI("http://localhost:5000/api/users/login", header, body, "POST");
    // console.log(result);
    if (result) {
        // store data _id
        localStorage.setItem("token", result.token);
        localStorage.setItem("user_id", result._id);
        // go to home pages
          window. location. replace("index.html");
    }else{
        alert("Invalid login Credentials Please login again")
    }

}

