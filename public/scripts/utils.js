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

// removes a specific item from a list
function removeFromList (list, item) {
    const index = list.indexOf(item);
    if (index > -1) {
        list.splice(index, 1);
    }
}

// returns a random number between the bounds; both bounds inclusive
// (int) min , (int) max
function getRandInt (min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);

	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Returns an image resource from a given resource path.
// (String [path to image resource folder]) assetsPath
// (String [image file name with extension]) fileName
function getImage (assetsPath, fileName) {
	const img = new Image();
	img.src = assetsPath + fileName;
	return img;
}