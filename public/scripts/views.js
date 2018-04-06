//
//     Callbacks
//

// handles choosing to signup
function chooseSignup () {
    removeLoginSignupChoice();

    // load back button
    document.body.appendChild(getBackButton('signup'));

    // load signup form
    document.body.appendChild(getSignupForm());
}

// handles choosing to login
function chooseLogin () {
    removeLoginSignupChoice();

    // load back button
    document.body.appendChild(getBackButton('login'));

    // load login form
    document.body.appendChild(getLoginForm());
}

// handles resetting the page to home from login/signup forms
function resetHome (e) {
    if (e.target.name === 'login') {
        removeLoginForm();
    } else 
    if (e.target.name === 'signup') {
        removeSignupForm();
    } else {
        console.log('unknown back button \'name\': ' + e.target.name);
        return;
    }

    removeBackButton();

    // present login/signup choice
    document.body.appendChild(getLoginSignupChoice());
}

//
//     Element Creation
//

// returns page header
function getPageHeader () {
    // create header
    const pageHeader = document.createElement('h1');

    // set attributes
    pageHeader.innerHTML = "Bungalow";
    pageHeader.setAttribute('id', 'pageHeader');

    // return completed page header
    return pageHeader;
}

// returns login/signup choice
function getLoginSignupChoice () {
    // create container
    const loginSignupChoice = document.createElement('div');

    // set attributes
    loginSignupChoice.setAttribute('id', 'loginSignupChoice');

    // add elements
    const loginButton = getLoginButton();
    loginSignupChoice.appendChild(loginButton);

    const signupButton = getSignupButton();
    loginSignupChoice.appendChild(signupButton);

    // add listeners
    loginButton.addEventListener('click', chooseLogin);
    signupButton.addEventListener('click', chooseSignup);

    // return completed login/signup choice
    return loginSignupChoice;
}

// removes login/signup choice
function removeLoginSignupChoice () {
    // remove listeners
    document.getElementById('loginButton').removeEventListener('click', chooseLogin);
    document.getElementById('signupButton').removeEventListener('click', chooseSignup);

    // remove login/signup choice
    removeElement('loginSignupChoice');
}

// returns back button; name: 'login' | 'signup'
function getBackButton (name) {
    // validation
    if (name !== 'login' && name !== 'signup') {
        console.log('invalid back button \'name\'');
        return;
    }

    // create button
    const backButton = document.createElement('button');

    // set attributes
    backButton.innerHTML = "Back";
    backButton.setAttribute('id', 'backButton');
    backButton.setAttribute('name', name);

    // set listeners
    backButton.addEventListener('click', resetHome);

    // return completed back button
    return backButton;
}

// removes back button
function removeBackButton () {
    // remove listeners
    document.getElementById('backButton').removeEventListener('click', resetHome);

    // remove back button
    removeElement('backButton');
}