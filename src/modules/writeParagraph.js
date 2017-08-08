"use strict";

// Packages imports
const styles = require('./styles');

exports.create = function (title, subtitle, text) {

    // Write the title if it exists
    if (title !== "") {
        styles.titleH1(title)
    }

    // Write the subtitle if it exists
    if (subtitle !== "") {
        styles.titleH2(subtitle)
    }

    // Write the text if it exists
    if (text !== "") {
        styles.normal(text)
    }
};