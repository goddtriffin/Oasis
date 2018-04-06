// intitialize socket.io client socket
// const socket = io();

// on complete page load
document.addEventListener('DOMContentLoaded', function() {
    // load page header
    document.body.appendChild(getPageHeader());

    // present login/signup choice
    document.body.appendChild(getLoginSignupChoice());
}, false);

