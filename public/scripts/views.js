//
//     Callbacks
//

// handles choosing to signup
function chooseSignup () {
    removeLoginSignupChoice();

    // load back button
    const backButton = createBackButton('signup');
    if(backButton) document.body.appendChild(backButton);

    // load signup form
    const signupForm = createSignupForm();
    if (signupForm) document.body.appendChild(signupForm);
}

// handles choosing to login
function chooseLogin () {
    removeLoginSignupChoice();

    // load back button
    const backButton = createBackButton('login');
    if (backButton) document.body.appendChild(backButton);

    // load login form
    const loginForm = createLoginForm();
    if (loginForm) document.body.appendChild(loginForm);
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
    const loginSignupChoice = createLoginSignupChoice();
    if (loginSignupChoice) document.body.appendChild(loginSignupChoice);
}

//
//     Element Creation
//

// returns page header
function createPageHeader () {
    // check for element creation errors
    if (elementCreationErrors('pageHeader')) return;

    // create header
    const pageHeader = document.createElement('h1');

    // set attributes
    pageHeader.innerHTML = "Welcome to Oasis, a simple realtime multiplayer landscape.";
    pageHeader.setAttribute('id', 'pageHeader');

    // return completed page header
    return pageHeader;
}

// removes page header
function removePageHeader () {
    // check for element removal errors
    if (elementRemovalErrors('pageHeader')) return;

    // remove page header
    removeElement('pageHeader');
}

// returns login/signup choice
function createLoginSignupChoice () {
    // check for element creation errors
    if (elementCreationErrors('loginSignupChoice')) return;

    // create container
    const loginSignupChoice = document.createElement('div');

    // set attributes
    loginSignupChoice.setAttribute('id', 'loginSignupChoice');

    // add elements
    const loginButton = createLoginButton();
    loginSignupChoice.appendChild(loginButton);

    const signupButton = createSignupButton();
    loginSignupChoice.appendChild(signupButton);

    // add listeners
    loginButton.addEventListener('click', chooseLogin);
    signupButton.addEventListener('click', chooseSignup);

    // return completed login/signup choice
    return loginSignupChoice;
}

// removes login/signup choice
function removeLoginSignupChoice () {
    // check for element removal errors
    if (elementRemovalErrors('loginSignupChoice')) return;

    // remove listeners
    document.getElementById('loginButton').removeEventListener('click', chooseLogin);
    document.getElementById('signupButton').removeEventListener('click', chooseSignup);

    // remove login/signup choice
    removeElement('loginSignupChoice');
}

// returns game description
function createGameDescription () {
    // check for element creation errors
    if (elementCreationErrors('gameDescription')) return;

    // create container
    const gameDescription = document.createElement('div');

    // set attributes
    gameDescription.setAttribute('id', 'gameDescription');

    // add elements
    gameDescription.appendChild(createParagraphMessage('Log in to your account to start playing, or sign up if you don\'t have one yet!'));

    const gameInstructions = createGameInstructions();
    gameDescription.appendChild(gameInstructions);

    // return completed login/signup choice
    return gameDescription;
}

// removes game description
function removeGameDescription () {
    // check for element removal errors
    if (elementRemovalErrors('gameDescription')) return;

    // remove game description
    removeElement('gameDescription');
}

// returns game instructions
function createGameInstructions (message) {
    // check for element creation errors
    if (elementCreationErrors('gameInstructions')) return;

    // create container
    const gameInstructions = document.createElement('div');

    // set attributes
    gameInstructions.setAttribute('id', 'gameInstructions');

    // add elements
    gameInstructions.appendChild(createParagraphMessage('Instructions'));
    gameInstructions.appendChild(createParagraphMessage('------------'));
    gameInstructions.appendChild(createParagraphMessage('WASD    :  move your character'));
    gameInstructions.appendChild(createParagraphMessage('arrows  :  change your player\' direction'));

    // return completed login/signup choice
    return gameInstructions;
}

// returns a paragraph message
function createParagraphMessage (message) {
    // create container
    const paragraphMessage = document.createElement('p');

    // set attributes
    paragraphMessage.innerHTML = message;
    paragraphMessage.classList.add('paragraphMessage');

    // return completed login/signup choice
    return paragraphMessage;
}

// returns back button; name: 'login' | 'signup'
function createBackButton (name) {
    // check for element creation errors
    if (elementCreationErrors('backButton')) return;

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
    // check for element removal errors
    if (elementRemovalErrors('backButton')) return;

    // remove listeners
    document.getElementById('backButton').removeEventListener('click', resetHome);

    // remove back button
    removeElement('backButton');
}