//
//      Form Creation
//

// returns username input field
function getUsernameInputField () {
    // create input field
    const usernameInputField = document.createElement('input');

    // set attributes
    usernameInputField.setAttribute('alt', 'username input field');
    usernameInputField.setAttribute('autocomplete', 'off');
    usernameInputField.setAttribute('id', 'usernameInputField');
    usernameInputField.setAttribute('placeholder', 'Username');
    usernameInputField.setAttribute('required', 'true');
    usernameInputField.setAttribute('type', 'text');

    // return completed username input field
    return usernameInputField;
}

// returns password input field
function getPasswordInputField () {
    // create input field
    const passwordInputField = document.createElement('input');

    // set attributes
    passwordInputField.setAttribute('alt', 'username input field');
    passwordInputField.setAttribute('autocomplete', 'off');
    passwordInputField.setAttribute('id', 'passwordInputField');
    passwordInputField.setAttribute('placeholder', 'Password');
    passwordInputField.setAttribute('required', 'true');
    passwordInputField.setAttribute('type', 'password');

    // return completed password input field
    return passwordInputField;
}