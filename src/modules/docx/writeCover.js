"use strict";

// Packages imports
const styles = require('./styles');

exports.writeCover = function(docx, title, author) {

    let pObj = docx.createP();
    pObj = styles.addLineBreak(19, pObj);

    // Print the title and print the author
    pObj = styles.titleCover(pObj, title);
    pObj = styles.textAuthor(pObj, "by " + author);

    docx.putPageBreak();
    return docx
};