"use strict";

// Packages imports
const cover = require('./writeCover');
const paragraph = require('./writeParagraph');

exports.createDocument = function (docx, content) {

    // Create the cover page
    docx = cover.writeCover(docx, content.title, content.author);

    for (let i = 0; i < content.paragraphs.length; i ++) {
        docx = paragraph.writeParagraph(docx, content.paragraphs[i].title, content.paragraphs[i].subtitle, content.paragraphs[i].text)
    }

    return docx
};