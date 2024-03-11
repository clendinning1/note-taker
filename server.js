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
app.use(express.urlencoded());

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
    // // Prepare a response object to send back to the client
    // let response;

    // // Check if there is anything in the response body
    // if (req.body && req.body.product) {
    //     response = {
    //         status: 'success',
    //         data: req.body,
    //     };
    //     res.json(`Review for ${response.data.product} has been added!`);
    // } else {
    //     res.json('Request body must at least contain a product name');
    // }

    // // Log the response body to the console
    // console.log(req.body);
});






// from 11-express/01-ins_setup: "listen() method is responsible for listening for incoming connections on the specified port"
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);