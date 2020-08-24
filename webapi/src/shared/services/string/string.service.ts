function replaceAll(text, textToFind, replace) {
    return text.replace(new RegExp(textToFind, 'g'), replace);
}

module.exports = {
    replaceAll,
};