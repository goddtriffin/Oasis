// handles signing up
function signup (signup) {
    console.log('signup attempted | username:', signup.username, ' , password:', signup.password);
    this.emit('signup success', signup);
    // this.emit('signup failure', signup);
}

module.exports = {
    signup
}