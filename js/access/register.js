//Register User

const userName = document.querySelector("#userName");
const email = document.querySelector("#Email");
const passWord = document.querySelector("#passWord");
const submit = document.querySelector("#sup");



submit.addEventListener('click', register);

//Saving data in local storage
function addUserData() {
    localStorage.setItem("userName", userName.value);
    localStorage.setItem("email", email.value);
    localStorage.setItem("passWord", passWord.value);
}


//Sign Up
function register(e) {
    e.preventDefault();
    if (userName.value === "" || email.value === "" || passWord.value === "") {
        alert("Please fill data!");
    }
    else {
        addUserData();
        setTimeout(() => { window.location = "index.html" }, 1000); // Go to Home Page After Sign up
    }
}









