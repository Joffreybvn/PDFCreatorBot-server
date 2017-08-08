"use strict";

// Packages imports
const app = require('../app');

const font = app.font;
const size = app.size;
const doc = app.doc;

//=========================================================
// COVER font styles
//=========================================================

/**
 * Write the title of the document at the center of a new page.
 *
 * @param {String} text - The title of the document
 * @param {Number} marginTop - The negative margin of the title, if there's a author, to center vertically the entire block.
 * @return {Number} width - The with of the title
 */
exports.titleCover = function (text, marginTop) {

    let x = doc.x, y = doc.y, h = size.A4.h, w = size.A4.w;
    let options = {width: w, align: 'center'};

    //doc.rect(x, y, w, h).stroke();

    doc.font(font.LiberationSansBold)
        .fontSize(33)
        .text(text, x, (y + 0.5 * (h - doc.heightOfString(text, options)) - marginTop), options);

    return doc.widthOfString(text, options)
};

/**
 * Write the author below the title of the cover.
 * Need the with of the title to be aligned on its bottom right.
 *
 * @param {String} text - The author of the document
 * @param {Number} width - The width of the title of the document
 * @return {Number} sum
 */
exports.textAuthor = function (text, width) {

    let x = doc.x, y = doc.y, w = width;

    let options = {width: w};
    if (w > size.A4.w) {
        options.align = 'center'
    } else {
        options.align = 'right'
    }

    doc.font(font.AlegreyaSansLight)
        .fontSize(22)
        .text(text, x + 0.5 * (size.A4.w - w), y, options)
};

//=========================================================
// TITLES font styles
//=========================================================

exports.titleH1 = function (text) {

    let options = {paragraphGap: 8};

    doc.font(font.AlegreyaBold)
        .fontSize(25)
        .text(text, options)
};

exports.titleH2 = function (text) {

    let options = {paragraphGap: 5};

    doc.font(font.AlegreyaBold)
        .fontSize(18)
        .text(text, options)
};

//=========================================================
// TEXT font styles
//=========================================================

exports.normal = function (text) {

    let options = {paragraphGap: 7.5, lineGap: -3.2};

    doc.font(font.AlegreyaRegular)
        .fontSize(12)
        .text(text, options)
};