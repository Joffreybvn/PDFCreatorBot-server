"use strict";

// Packages imports
const styles = require('./styles');
const app = require('../app');

const doc = app.doc;

/**
 * Create a cover page with the title and the author.
 * Need to be called first to write on a blank new page.
 *
 * @param {String} title - The title of the document
 * @param {String} author - The author of the document
 */
exports.create = function(title, author) {

    // If there's an author to show, math the margin to shift the title.
    let marginTop = 0;
    if (author !== "") {
        marginTop = doc.heightOfString(author) * 0.5
    }

    // Print the title, get its width, and print the author
    let width = styles.titleCover(title, marginTop);
    styles.textAuthor("by " + author, width);

    doc.addPage();
};

