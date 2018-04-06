//
//      Callbacks
//

// handles signing up
function signup (e) {
    e.preventDefault();

    // get user info
    const username = document.getElementById('usernameInputField').value;
    const password = document.getElementById('passwordInputField').value;
    const repassword = document.getElementById('repasswordInputField').value;

    if (password !== repassword) {
        console.log('passwords don\'t match');
        return;
    }
    
    console.log('signup: username: ' + username + ' , password: ' + password);
}

//
//      Element Creation
//

// returns form for signing up
function getSignupForm () {
    // create form
    const signupForm = document.createElement('form');

    // set attributes
    signupForm.setAttribute('id', 'signupForm');

    // add elements
    signupForm.appendChild(getSignupHeader());
    signupForm.appendChild(getUsernameInputField());
    signupForm.appendChild(getPasswordInputField());
    signupForm.appendChild(getRepasswordInputField());
    signupForm.appendChild(getSignupButton());

    // add listeners
    signupForm.addEventListener('submit', signup);

    // return completed signup form
    return signupForm;
}

// removes signup form
function removeSignupForm () {
    // remove listeners
    document.getElementById('signupForm').removeEventListener('submit', signup);

    // remove element
    removeElement('signupForm');
}

// returns signup form header
function getSignupHeader () {
    // create header
    const signupHeader = document.createElement('h2');

    // add info
    signupHeader.innerHTML = "Sign Up";
    signupHeader.setAttribute('id', 'signupHeader');

    // return completed signup header
    return signupHeader;
}

// returns signup button
function getSignupButton () {
    // create button
    const signupButton = document.createElement('button');

    // set attributes
    signupButton.innerHTML = "Sign Up";
    signupButton.setAttribute('id', 'signupButton');
    
    // return completed signup button
    return signupButton;
}