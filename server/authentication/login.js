// handles logging in a user
function login (login) {
    console.log('login attempted | username:', login.username, ' , password:', login.password);
    this.emit('login success', login);
    // this.emit('login failure', login);
}

// export
module.exports = {
    login
}