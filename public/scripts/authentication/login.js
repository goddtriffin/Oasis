//
//      Callbacks
//

// handles logging in
function login (e) {
    e.preventDefault();

    // get user info
    const username = document.getElementById('usernameInputField').value;
    const password = document.getElementById('passwordInputField').value;
    
    console.log('login: username: ' + username + ' , password: ' + password);
}

//
//      Login Form Creation
//

// returns form for logging in
function getLoginForm () {
    // create form
    const loginForm = document.createElement('form');

    // set attributes
    loginForm.setAttribute('id', 'loginForm');

    // add necessary elements
    loginForm.appendChild(getLoginHeader());
    loginForm.appendChild(getUsernameInputField());
    loginForm.appendChild(getPasswordInputField());
    loginForm.appendChild(getLoginButton());

    // add listeners
    loginForm.addEventListener('submit', login);

    // return completed login form
    return loginForm;
}

// returns login form header
function getLoginHeader () {
    // create header
    const loginHeader = document.createElement('h2');

    // add info
    loginHeader.innerHTML = "Login";
    loginHeader.setAttribute('id', 'loginHeader');

    // return completed login header
    return loginHeader;
}

// returns login button
function getLoginButton () {
    // create button
    const loginButton = document.createElement('button');

    // set attributes
    loginButton.innerHTML = "Login";
    loginButton.setAttribute('id', 'loginButton');
    
    // return completed login button
    return loginButton;
}