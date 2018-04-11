//
//      Listeners
//

socket.on('signup success', signupSuccess);
socket.on('signup failure', signupFailure);

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
    
    // attempt signup
    socket.emit('signup', username, password, repassword);
}

// handles signup success
function signupSuccess () {
    // go back to main screen
    removeSignupForm();
    removeBackButton();
    loadMainScreen();
}

// handles signup failure
function signupFailure (erroType, errorMessage) {
    // get signup form, get username input field, create error alert
    const signupForm = document.getElementById('signupForm');
    const usernameInputField = document.getElementById('usernameInputField');
    const errorAlert = createErrorAlert(errorMessage);

    // put the error alert right above the username input field
    signupForm.insertBefore(errorAlert, usernameInputField);
}

//
//      Element Creation
//

// returns form for signing up
function createSignupForm () {
    // check for element creation errors
    if (elementCreationErrors('signupForm')) return;

    // create form
    const signupForm = document.createElement('form');

    // set attributes
    signupForm.setAttribute('id', 'signupForm');

    // add elements
    const signupHeader = createSignupHeader();
    if (signupHeader) signupForm.appendChild(signupHeader);

    signupForm.appendChild(createErrorAlert('Pick a dummy password! 1) The server doesn\'t use HTTPS. 2) My password hasher is `bcrypt` (Google it), so it\'s up to you if you trust that. 3) Don\'t trust anyone.'));
    signupForm.appendChild(createErrorAlert('To log out, simply refresh or close the tab.'));

    const usernameInputField = createUsernameInputField();
    if (usernameInputField) signupForm.appendChild(usernameInputField);

    const passwordInputField = createPasswordInputField();
    if (passwordInputField) signupForm.appendChild(passwordInputField);

    const repasswordInputField = createRepasswordInputField();
    if (repasswordInputField) signupForm.appendChild(repasswordInputField);

    const signupButton = createSignupButton();
    if (signupButton) signupForm.appendChild(signupButton);

    // add listeners
    signupForm.addEventListener('submit', signup);

    // return completed signup form
    return signupForm;
}

// removes signup form
function removeSignupForm () {
    // check for element removal errors
    if (elementRemovalErrors('signupForm')) return;

    // remove listeners
    document.getElementById('signupForm').removeEventListener('submit', signup);

    // remove element
    removeElement('signupForm');
}

// returns signup form header
function createSignupHeader () {
    // check for element creation errors
    if (elementCreationErrors('signupHeader')) return;

    // create header
    const signupHeader = document.createElement('h2');

    // add info
    signupHeader.innerHTML = "Sign Up";
    signupHeader.setAttribute('id', 'signupHeader');

    // return completed signup header
    return signupHeader;
}

// returns signup button
function createSignupButton () {
    // check for element creation errors
    if (elementCreationErrors('signupButton')) return;

    // create button
    const signupButton = document.createElement('button');

    // set attributes
    signupButton.innerHTML = "Sign Up";
    signupButton.setAttribute('id', 'signupButton');
    
    // return completed signup button
    return signupButton;
}