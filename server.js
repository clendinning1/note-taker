// get express and port connected
const express = require("express");
const PORT = 3001;
const app = express();

// db File connected
const dbFile = require("./db/db.json");

// directing things to the public folder
app.use(express.static("public"));

// get req /notes = res with the db file
app.get("/notes", (req, res) => {res.json(dbFile)});


app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT}`)
);