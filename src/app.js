"use strict";

// Packages imports
const express = require('express');
const bodyParser = require('body-parser');
const PDFDocument = require('pdfkit');
const FormData = require('form-data');

const fs = require('fs');
const path = require('path');

// Internal imports
const font = require('./lib/enumFonts');
const size = require('./lib/enumSizes');
const url = require('./lib/enumURL');
const rand = require('./modules/randomChar');

// Internal exports
exports.font = font;
exports.size = size;

// Initialize the app to support POST of JSON
const app = express();
app.use(bodyParser.json());

//=========================================================
// PDF creation server setup
//=========================================================

app.post('/create', function (req, res) {

    const userId = '28469';

    // Check if the request contain a body with arguments
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send('No data were sended');
    }

    const rawData = req.body;

    // Initialize the document meta
    let doc = new PDFDocument({
        size: 'A4',
        info: {
            Title: rawData.title,
            Author: rawData.author,
        }
    });
    exports.doc = doc;

    // Create the document
    let document = require('./modules/writeDocument');
    document.create(rawData);

    // Generate a storage path for the document
    const docPath = path.join(__dirname, '../files/output_' + rand.char() + '.pdf');

    // Save temporally the document
    doc.pipe(fs.createWriteStream(docPath))
        .on('finish', function () {

            // Send the document to the storage server
            let form = new FormData();
            form.append('userId', userId);
            form.append('documentPDF', fs.readFileSync(docPath));
            form.submit(url.SERV_STATIC.remote + 'upload', function(err, response) {

                // Remove the document from this server
                fs.unlinkSync(docPath);

                // Send error response to bot if the upload fail
                if (err) {
                    return res.status(400).send('Static server upload failed');
                }

                // Send the link of the document to the bot
                response.on('data', function(data) {
                    let fileId = data.toString('utf8');
                    return res.status(200).send(
                        url.SERV_STATIC.remote + 'd?u=' + userId + '&f=doc_' + fileId + '.pdf'
                    )
                });
            });
        });

    doc.end();
});


// Server starting
//=========================================================

const PORT = process.env.port || process.env.PORT || 8000;
app.listen(PORT, function () {
    console.log('[server] started on port ' + PORT);
});
