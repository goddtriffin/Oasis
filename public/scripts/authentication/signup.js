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
    socket.emit('signup', {username, password, repassword});
}

// handles signup success
function signupSuccess () {
    // go back to main screen
    removeSignupForm();
    removeBackButton();
    loadMainScreen();
}

// handles signup failure
function signupFailure (err) {
    console.log('signup failed | err:', err);
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
    signupForm.appendChild(createSignupHeader());
    signupForm.appendChild(createUsernameInputField());
    signupForm.appendChild(createPasswordInputField());
    signupForm.appendChild(createRepasswordInputField());
    signupForm.appendChild(createSignupButton());

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