// removes element by id
function removeElement (elementID) {
    // check for element removal errors
    if (elementRemovalErrors(elementID)) return;

    // remove element
    const element = document.getElementById(elementID);
    return element.parentNode.removeChild(element);
}

// returns true if element already exists, false otherwise
function elementExists (elementID) {
    return document.getElementById(elementID) !== null;
}

// returns true on element creation errors, false otherwise
function elementCreationErrors (elementID) {
    // check if element already exists
    if (elementExists(elementID)) {
        console.error('element creation err:', elementID, 'already exists');
        return true;
    }

    // we gucci
    return false;
}

// returns true on element removal errors, false otherwise
function elementRemovalErrors (elementID) {
    // check if element doesn't exist
    if (!elementExists(elementID)) {
        console.error('element removal error:', elementID, 'doesn\'t exist');
        return true;
    }

    // we gucci
    return false;
}