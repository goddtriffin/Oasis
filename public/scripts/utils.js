// removes element by id
function removeElement (id) {
    const elem = document.getElementById(id);
    return elem.parentNode.removeChild(elem);
}