"use strict";

exports.addLineBreak = function (amount, pObj) {

    for (let i = 0; i < amount; i++) {
        pObj.addLineBreak();
    }
    return pObj
};

//=========================================================
// COVER font styles
//=========================================================

exports.titleCover = function (pObj, text) {

    pObj.options.align = 'center';
    pObj.addText(text, {font_face: 'Arial', font_size: 33, bold: true });
    return pObj
};

exports.textAuthor = function (pObj, text) {

    pObj.addLineBreak();
    pObj.addText(text, {font_face: 'Times New Roman', font_size: 22});
    return pObj
};

//=========================================================
// TITLES font styles
//=========================================================

exports.titleH1 = function (pObj, text) {

    pObj.addText(text, {font_face: 'Arial', font_size: 25, bold: true });
    pObj.addLineBreak();
    return pObj
};

exports.titleH2 = function (pObj, text) {

    pObj.addText(text, {font_face: 'Arial', font_size: 18});
    pObj.addLineBreak();
    return pObj
};

//=========================================================
// TEXT font styles
//=========================================================

exports.normal = function (pObj, text) {

    pObj.addText(text, {font_face: 'Times New Roman', font_size: 12});
    pObj.addLineBreak();
    return pObj
};