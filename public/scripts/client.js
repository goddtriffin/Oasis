// intitialize socket.io
let socket = io();

// on complete page load
document.addEventListener('DOMContentLoaded', function() {
    // load page header
    document.body.appendChild(getPageHeader());

    // load login form
    document.body.appendChild(getLoginForm());
 }, false);

 //
 //     Element Creation
 //

 function getPageHeader () {
    // create header
    const pageHeader = document.createElement('h1');

    // set attributes
    pageHeader.innerHTML = "Bungalow";
    pageHeader.setAttribute('id', 'pageHeader');

    // return completed page header
    return pageHeader;
 }