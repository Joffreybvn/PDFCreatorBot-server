"use strict";

// Packages imports
const cover = require('./writeCover');
const paragraph = require('./writeParagraph');

exports.create = function (content) {

    // Create the cover page
    cover.create(content.title, content.author);

    for (let i = 0; i < content.paragraphs.length; i ++) {
        paragraph.create(content.paragraphs[i].title, content.paragraphs[i].subtitle, content.paragraphs[i].text)
    }
};