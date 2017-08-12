"use strict";

// Packages imports
const cover = require('./writeCover');
const paragraph = require('./writeParagraph');

exports.createDocument = function (doc, content) {

    // Create the cover page
    doc = cover.writeCover(doc, content.title, content.author);

    for (let i = 0; i < content.paragraphs.length; i ++) {
        doc = paragraph.writeParagraph(doc, content.paragraphs[i].title, content.paragraphs[i].subtitle, content.paragraphs[i].text)
    }

    return doc
};