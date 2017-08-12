"use strict";

// Packages imports
const styles = require('./styles');

exports.writeParagraph = function (doc, title, subtitle, text) {

    // Write the title if it exists
    if (title !== "") {
        doc = styles.titleH1(doc, title)
    }

    // Write the subtitle if it exists
    if (subtitle !== "") {
        doc = styles.titleH2(doc, subtitle)
    }

    // Write the text if it exists
    if (text !== "") {
        doc = styles.normal(doc, text)
    }

    return doc
};