"use strict";

// Packages imports
const styles = require('./styles');

exports.writeParagraph = function (docx, title, subtitle, text) {

    let pObj = docx.createP();

    // Write the title if it exists
    if (title !== "") {
        pObj = styles.titleH1(pObj, title)
    }

    // Write the subtitle if it exists
    if (subtitle !== "") {
        pObj = styles.titleH2(pObj, subtitle)
    }

    // Write the text if it exists
    if (text !== "") {
        pObj = styles.normal(pObj, text)
    }

    return docx
};