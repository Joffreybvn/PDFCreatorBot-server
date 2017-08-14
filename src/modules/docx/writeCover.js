"use strict";

// Packages imports
const styles = require('./styles');
const locale = require('../../lib/locale');

exports.writeCover = function(docx, title, author, lang) {

    let pObj = docx.createP();
    pObj = styles.addLineBreak(19, pObj);

    // Print the title and print the author
    pObj = styles.titleCover(pObj, title);
    pObj = styles.textAuthor(pObj, locale[lang].by + " " + author);

    docx.putPageBreak();
    return docx
};