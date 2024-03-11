// SETUP
// get express and port connected
const express = require("express");
const PORT = 3001;
const app = express();
// fs
const fs = require("fs");
// Helper method for generating unique ids
const uuid = require('./helpers/uuid');

// from 11-express/01-ins_setup: "Import built-in Node.js package 'path' to resolve path of files that are located on the server"
const path = require('path');

// db File connected
const dbFile = require("./db/db.json");

// middleware for parsing JSON
app.use(express.json());
// middleware for parsing URL encoded data
app.use(express.urlencoded({ extended: true }));

// directing things to the public folder
app.use(express.static("public"));



// GET REQs
// get req for "/" returns (responds with) the index.html page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});
// get req for "/notes" returns (responds with) the notes.html page
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});
// get req for "/api/notes" returns (responds with) each saved note in the dbFile as JSON.
app.get("/api/notes", (req, res) => {
    res.json(dbFile);
});


// POST REQ
app.post("/api/notes", (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a note`);

    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;

    // If all the required properties are present
    if (title && text ) {
        // Variable for the object we will save
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };

        // Convert the data to a string so we can save it
        const noteString = JSON.stringify(newNote);

        // Write the string to a file
        fs.writeFile(`./db/db.json`, noteString, (err) =>
            err
                ? console.error(err)
                : console.log(
                    `Note for ${newNote.product} has been written to JSON file`
                )
        );

        const response = {
            status: 'success',
            body: newNote,
        };

        console.log(response);
        res.status(201).json(response);
    } else {
        res.status(500).json('Error in posting new note');
    }
});






// from 11-express/01-ins_setup: "listen() method is responsible for listening for incoming connections on the specified port"
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);