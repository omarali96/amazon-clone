 
const validateEmail = function (value) {
    let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (value.match(mailFormat)) {
        return true;
    }
    else {
        return false;
    }
}

const validateEmpty = function (value) {
    if (value !== "") {
        return true;
    }
    else {
        return false;
    }
}
const validatePassword = function (value, minLength) {
    if (value.length >= minLength ) {
        return true;
    }
    else {
        return false;
    }
}

export default {validateEmail , validateEmpty , validatePassword };