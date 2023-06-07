const userInfo = document.querySelector("#user-info");
const userDom = document.querySelector("#name");
const logout = document.querySelector("#logout")
const links = document.querySelector("#links");
const checkUser = localStorage.getItem("userName");
const togglebtn = document.getElementById("");

//Check if the User Sign up or not
if (checkUser) {
    changeUi();
}

//When user sign-in||up => remove sign from UI ande replace it with userName & Logout Button
function changeUi() {
    links.remove();
    display();
}

//Display UserName&Logout
function display() {
    userInfo.style.display = "flex";
    userInfo.style.gap = "20px";
    userDom.innerHTML = checkUser;
    logout.innerHTML = "Log Out";
}

//logout From Page
logout.addEventListener('click', () => {
    setTimeout(() => { window.location = "login.html" }, 1000);
})

//show hide password

togglebtn.onclick = function () {
    if (passWord.type === "password") {
        passWord.setAttribute("type", "text");
    }
}



