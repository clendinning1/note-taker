// get express and port connected
const express = require("express");
const PORT = 3001;
const app = express();

// from 11-express/01-ins_setup: "Import built-in Node.js package 'path' to resolve path of files that are located on the server"
const path = require('path');

// db File connected
// const dbFile = require("./db/db.json");

// directing things to the public folder
app.use(express.static("public"));

// get req /notes = res with the db file
app.get("/notes", (req, res) => { res.sendFile(path.join(__dirname, 'public/notes.html')); });


app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT}`)
);