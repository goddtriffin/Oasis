//
//      Listeners
//

socket.on('login success', loginSuccess);
socket.on('login failure', loginFailure);

//
//      Callbacks
//

// handles logging in
function login (e) {
    e.preventDefault();

    // get user info
    const username = document.getElementById('usernameInputField').value;
    const password = document.getElementById('passwordInputField').value;

    // attempt login
    socket.emit('login', {username, password});
}

// handles a login success
function loginSuccess (session) {
    // store session
    storeUserSessionData(session);

    // go back to main screen
    removeLoginForm();
    removeBackButton();
    loadMainScreen();
}

// handles a login failure
function loginFailure (err) {
    // get login form, get username input field, create error alert
    const loginForm = document.getElementById('loginForm');
    const usernameInputField = document.getElementById('usernameInputField');
    const errorAlert = createErrorAlert(err.message);

    // put the error alert right above the username input field
    loginForm.insertBefore(errorAlert, usernameInputField);
}

// stores user session information to browser local storage on successful login
function storeUserSessionData (session) {
    // set id
    localStorage.setItem('Oasis-session-id', session.id);

    // set username
    localStorage.setItem('Oasis-session-username', session.username);
}

//
//      Element Creation
//

// returns form for logging in
function createLoginForm () {
    // check for element creation errors
    if (elementCreationErrors('loginForm')) return;

    // create form
    const loginForm = document.createElement('form');

    // set attributes
    loginForm.setAttribute('id', 'loginForm');

    // add elements
    const loginHeader = createLoginHeader();
    if (loginHeader) loginForm.appendChild(loginHeader);

    const usernameInputField = createUsernameInputField();
    if (usernameInputField) loginForm.appendChild(usernameInputField);

    const passwordInputField = createPasswordInputField();
    if (passwordInputField) loginForm.appendChild(passwordInputField);

    const loginButton = createLoginButton();
    if (loginButton) loginForm.appendChild(loginButton);

    // add listeners
    loginForm.addEventListener('submit', login);

    // return completed login form
    return loginForm;
}

// removes login form
function removeLoginForm () {
    // check for element removal errors
    if (elementRemovalErrors('loginForm')) return;

    // remove listeners
    document.getElementById('loginForm').removeEventListener('submit', login);

    // remove element
    removeElement('loginForm');
}

// returns login form header
function createLoginHeader () {
    // check for element creation errors
    if (elementCreationErrors('loginHeader')) return;

    // create header
    const loginHeader = document.createElement('h2');

    // add info
    loginHeader.innerHTML = "Login";
    loginHeader.setAttribute('id', 'loginHeader');

    // return completed login header
    return loginHeader;
}

// returns login button
function createLoginButton () {
    // check for element creation errors
    if (elementCreationErrors('loginButton')) return;

    // create button
    const loginButton = document.createElement('button');

    // set attributes
    loginButton.innerHTML = "Login";
    loginButton.setAttribute('id', 'loginButton');
    
    // return completed login button
    return loginButton;
}