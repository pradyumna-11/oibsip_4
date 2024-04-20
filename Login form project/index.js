let registerSectionEl = document.getElementById("sectionRegister");
let loginContainerEl = document.getElementById("loginContainer");
let registerFormEl = document.getElementById("registerForm");
let loginFormEl = document.getElementById("loginForm");


let inputRegisterUsernameEl = document.getElementById("registerUser");
let registerUsernameError = document.getElementById("usernameError");
let inputRegisterPasswordEl = document.getElementById("registerPassword");
let registerPasswordError = document.getElementById("passwordError");
let confirmPasswordEl = document.getElementById("confirmPassword");
let confirmPasswordError = document.getElementById("confirmPasswordError");
let signUpErrorEl = document.getElementById("signupConfirmError");

let loginUsernameInputEl = document.getElementById("username");
let loginUsernameErrorEl = document.getElementById("loginUsernameError");
let loginPasswordInputEl = document.getElementById("password");
let loginPasswordErrorEl = document.getElementById("loginPasswordError");
let signinConfirmErrorEl = document.getElementById("signinConfirmError");

let getUsersList = () => {
    let fetchedData = localStorage.getItem("users");
    let parsedData = JSON.parse(fetchedData);
    if (parsedData === null) {
        return [];
    } else {
        return parsedData;
    }
};

let users = getUsersList();



let navigateRegisterSection = function() {
    registerSectionEl.classList.toggle("d-none");
    loginContainerEl.classList.toggle("d-none");
};

let navigateToSignInSection = function() {
    loginContainerEl.classList.toggle('d-none');
    registerSectionEl.classList.toggle("d-none");
};



inputRegisterUsernameEl.addEventListener("blur", (event) => {
    if (event.target.value === '') {
        registerUsernameError.classList.remove("d-none");
    } else {
        registerUsernameError.classList.add("d-none");
    }
});

inputRegisterPasswordEl.addEventListener("blur", (event) => {
    if (event.target.value === '') {
        registerPasswordError.classList.remove("d-none");
    } else {
        registerPasswordError.classList.add("d-none");
    }
});
confirmPasswordEl.addEventListener("blur", (event) => {
    if (event.target.value === '') {
        confirmPasswordError.classList.remove("d-none");
    } else {
        confirmPasswordError.classList.add("d-none");
    }
});

let storeUserDetails = (username, password) => {
    let newUser = {
        username,
        password
    };

    let length = users.length;
    let exist = false;
    if (length > 0) {
        for (let i = 0; i < length; i++) {
            if (users[i].username === newUser.username) {
                exist = true;
            }
        }
        if (exist) {
            signUpErrorEl.classList.remove('d-none');
            signUpErrorEl.textContent = 'User already exist, please try with some other username.';
        } else {
            signUpErrorEl.classList.add("d-none");
            users.push(newUser);
            let stringifiedUsersList = JSON.stringify(users);
            localStorage.setItem("users", stringifiedUsersList);
            inputRegisterUsernameEl.value = '';
            inputRegisterPasswordEl.value = '';
            confirmPasswordEl.value = '';
        }
    } else {
        users.push(newUser);
        let stringifiedUsersList = JSON.stringify(users);
        localStorage.setItem("users", stringifiedUsersList);
        inputRegisterUsernameEl.value = '';
        inputRegisterPasswordEl.value = '';
        confirmPasswordEl.value = '';
    }

    /*let storageItem = localStorage.getItem("users");
    let parsedStorageItem = JSON.parse(storageItem);
    
    if(parsedStorageItem===null) {
         users = [newUser];
        
    }
    else{
        
    }
    console.log(parsedStorageItem);*/

};

let verifyRegisterForm = (event) => {
    event.preventDefault();
    if (inputRegisterUsernameEl.value !== '' && inputRegisterPasswordEl.value !== '') {
        if (confirmPasswordEl.value === inputRegisterPasswordEl.value) {
            //console.log("User created");
            signUpErrorEl.classList.add('d-none');
            storeUserDetails(inputRegisterUsernameEl.value, inputRegisterPasswordEl.value);
        } else {
            //console.log("Password didn't match");
            signUpErrorEl.textContent = 'Password did not match';
            signUpErrorEl.classList.remove('d-none');
        }
    }
};

registerFormEl.addEventListener("submit", verifyRegisterForm);



loginUsernameInputEl.addEventListener("blur", (event) => {
    if (event.target.value === '') {
        loginUsernameErrorEl.classList.remove('d-none');
    } else {
        loginUsernameErrorEl.classList.add('d-none');
    }
});


loginPasswordInputEl.addEventListener("blur", (event) => {
    if (event.target.value === '') {
        loginPasswordErrorEl.classList.remove('d-none');
    } else {
        loginPasswordErrorEl.classList.add('d-none');
    }
});

let checkUserExist = (inputUsername, inputPassword) => {
    let dataExist = false;
    for (let each of users) {
        if (each.username === inputUsername && each.password === inputPassword) {
            //console.log("user logged in successfully");
            loginUsernameInputEl.value = '';
            loginPasswordInputEl.value = '';
            signinConfirmErrorEl.classList.add("d-none");
            dataExist = true;
            window.location.href = "https://demotribute.ccbp.tech";
        }
    }
    if (dataExist === false) {
        signinConfirmErrorEl.textContent = 'Username and password did not match.';
        signinConfirmErrorEl.classList.remove("d-none");
    }
};


let verifyUserLogin = (event) => {
    event.preventDefault();
    if (loginUsernameInputEl.value !== '' && loginPasswordInputEl.value !== '') {
        //console.log('check user');
        //signinConfirmErrorEl.classList.add("d-none");
        checkUserExist(loginUsernameInputEl.value, loginPasswordInputEl.value);
    } else {
        signinConfirmErrorEl.textContent = 'Please enter credentials';
        signinConfirmErrorEl.classList.remove("d-none");
    }
};


loginFormEl.addEventListener("submit", verifyUserLogin);