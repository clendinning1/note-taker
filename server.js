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
    // logs the req
    console.info(`${req.method} request received to add a note`);

    // requests the body of the req and extracts the title and text
    const { title, text } = req.body;

    // if there's a title and text then...
    if (title && text) {
        // ... we create a newNote object
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };

        // when it reads the file it's either going to pass an error or the data inside the file
        fs.readFile(`./db/db.json`, (err, data) => {
            // when there's an error, throw it & kill prgrm
            if (err) {
                throw new Error(err);
            }

            // when there's data, add it to the new note
            const parsedNotes = JSON.parse(data);
            if (parsedNotes.length) {
                parsedNotes.push(newNote);
            }

            // Convert the data to a string so we can save it to a file
            const noteString = JSON.stringify(parsedNotes);

            // write to the file
            fs.writeFile(`./db/db.json`, noteString, (err) =>
                err
                    ? console.error(err)
                    : console.log(
                        `Note titled ${newNote.title} has been added to db.json`
                    )
            );

        });

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