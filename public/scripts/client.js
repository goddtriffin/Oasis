// on complete page load
document.addEventListener('DOMContentLoaded', function() {
    // user session lasts until next page refresh or close tab
    removeSessionInfo();

    // load page header
    document.body.appendChild(getPageHeader());

    // present login/signup choice
    document.body.appendChild(getLoginSignupChoice());
}, false);

// removes user session info
function removeSessionInfo () {
    localStorage.removeItem('Bungalow-session-id');
    localStorage.removeItem('Bungalow-session-username');
}