const user = document.querySelector("#user");
const pass = document.querySelector("#pas");
const submit = document.querySelector("#sign-in");
const getUser = localStorage.getItem("userName");
const getPass = localStorage.getItem("passWord");

//Switch to Home Page
submit.addEventListener('click', login);

//login to website
function login(e) {
    e.preventDefault();
    if (user.value === "" || pass.value === "") {
        alert("Please fill data!");
    }
    else {
        checkLogin();
    }
}

//Check User has account or not
function checkLogin() {
    if (user.value == getUser && pass.value == getPass) {

        setTimeout(() => { window.location = "index.html" }, 1000);
    }
    else {
        alert("Username or Password is wrong!");
    }

}