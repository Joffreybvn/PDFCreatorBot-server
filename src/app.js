"use strict";

// Packages imports
const express = require('express');
const bodyParser = require('body-parser');
const PDFDocument = require('pdfkit');
const FormData = require('form-data');
const officegen = require('officegen');

const fs = require('fs');
const path = require('path');

// Internal library imports
const font = require('./lib/enumFonts');
const size = require('./lib/enumSizes');
const url = require('./lib/enumURL');
const rand = require('./lib/randomChar');

// Internal library exports
exports.font = font;
exports.size = size;

// Internal document module imports
const writePDF = require('./modules/pdf/writeDocument');
const writeDOCX = require('./modules/docx/writeDocument');

// Internal module PDF imports

// Initialize the app to support POST of JSON
const app = express();
app.use(bodyParser.json());

//=========================================================
// Document creation server
//=========================================================

app.post('/create', function (req, res) {

    //const userId = '28469';
    const randName = rand.char();

    // Incoming data checking
    //=========================================================

    // Check if the request contain a body with arguments
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send('No data were sended');
    }

    const rawData = req.body;


    // PDF Creation
    //=========================================================
    let pdfIsFinished = false;

    // Initialize the PDF document meta
    let pdf = new PDFDocument({
        size: 'A4',
        info: {
            Title: rawData.title,
            Author: rawData.author,
        }
    });

    // Create the PDF document
    const pdfPath = path.join(__dirname, '../files/output_' + randName + '.pdf');
    let writeStreamPDF = fs.createWriteStream(pdfPath);

    pdf.pipe(writeStreamPDF);
    pdf = writePDF.createDocument(pdf, rawData);
    pdf.end();

    writeStreamPDF.on('finish', function () {
        pdfIsFinished = true;
    });


    // DOCX Creation
    //=========================================================
    let docxIsFinished = false;

    // Initialize the DOCX document meta
    let docx = officegen ({
        'type': 'docx',
        'title': rawData.title,
        'creator': rawData.author
    });
    docx = writeDOCX.createDocument(docx, rawData);

    // Create the DOCX document
    const docxPath = path.join(__dirname, '../files/output_' + randName + '.docx');
    let writeStreamDOCX = fs.createWriteStream (docxPath);

    docx.generate(writeStreamDOCX);

    writeStreamDOCX.on('close', function () {
        docxIsFinished = true;
    });


    // DATA sending
    //=========================================================

    // Check every 100ms if the both document creation are terminated
    let _flagCheck = setInterval(function() {
        if (pdfIsFinished === true && docxIsFinished === true) {
            clearInterval(_flagCheck);
            sendResponse();
        }
    }, 100);

    // Send the docs and the response
    let sendResponse = function () {

            // Send the document to the storage server
            let form = new FormData();
            form.append('source', rawData.meta.source);
            form.append('userId', rawData.meta.userId);
            form.append('documentPDF', fs.readFileSync(pdfPath));
            form.append('documentDOCX', fs.readFileSync(docxPath));
            form.submit(url.SERV_STATIC.remote + 'upload', function(err, response) {

                // Remove the documents from this server
                fs.unlinkSync(pdfPath);
                fs.unlinkSync(docxPath);

                // Send error response to bot if the upload fail
                if (err) {
                    res.status(400).send('Static server upload failed');
                    res.end()
                }

                // Send the link of the document to the bot
                response.on('data', function(data) {
                    let fileId = data.toString('utf8');
                    res.status(200).send(fileId);
                    res.end()
                });
            });
    };
});

//=========================================================
// Server starting
//=========================================================

const PORT = process.env.port || process.env.PORT || 8000;
app.listen(PORT, function () {
    console.log('[server] started on port ' + PORT);
});
