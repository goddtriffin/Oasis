// on complete page load
document.addEventListener('DOMContentLoaded', function() {
    // user session lasts until next page refresh or close tab
    // removeSessionInfo();

    // initialize the view
    initView();
}, false);

// removes user session info
function removeSessionInfo () {
    localStorage.removeItem('Oasis-session-id');
    localStorage.removeItem('Oasis-session-username');
}

// loads the inital view when you refresh/open this page
function initView () {
    // load page header
    const pageHeader = createPageHeader();
    if (pageHeader) document.body.appendChild(pageHeader);

    // ready the page
    loadMainScreen();
}

// shows choice between login/signup
// if user session data exists, sends user to game screen
function loadMainScreen () {
    // present login/signup choice
    const loginSignupChoice = createLoginSignupChoice();
    if (loginSignupChoice) document.body.appendChild(loginSignupChoice);

    // check for user session data
    const sessionID = localStorage.getItem('Oasis-session-id');
    const sessionUsername = localStorage.getItem('Oasis-session-username');

    // if both session variables exist/not-null, send to game
    if (sessionID && sessionUsername) {
        // get rid of header
        removePageHeader();

        // get rid of login/signup screen
        removeLoginSignupChoice();

        // start the game!
        initGame();
    }
}