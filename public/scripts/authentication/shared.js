//
//      Form Creation
//

// returns username input field
function getUsernameInputField () {
    // check for element creation errors
    if (elementCreationErrors('usernameInputField')) return;

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
    // check for element creation errors
    if (elementCreationErrors('passwordInputField')) return;

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

// returns repassword input field (for re-entering password)
function getRepasswordInputField () {
    // check for element creation errors
    if (elementCreationErrors('repasswordInputField')) return;

    // create input field
    const repasswordInputField = document.createElement('input');

    // set attributes
    repasswordInputField.setAttribute('alt', 'username input field');
    repasswordInputField.setAttribute('autocomplete', 'off');
    repasswordInputField.setAttribute('id', 'repasswordInputField');
    repasswordInputField.setAttribute('placeholder', 'Re-enter Password');
    repasswordInputField.setAttribute('required', 'true');
    repasswordInputField.setAttribute('type', 'password');

    // return completed repassword input field
    return repasswordInputField;
}