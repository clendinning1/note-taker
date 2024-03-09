# TO-DO

## SETUP
1. add express.js
2. add a gitignore

## NOTES STORAGE
1. store and retrieve notes using the `fs` module into the `db.json` file
2. Application back end must store notes that have a unique id in a JSON file.

## ROUTES
1. (html route) `GET /notes` should return the `notes.html` file.
2. (html route) `GET *` should return the `index.html` file.
3. (api route) `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.
4. (api route) `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).

## HEROKU
1. get application sent when the heroku site is fixed
2. finish heroku setup
3. deploy it to heroku

## README
1. do it

## MOCKUP
./Assets/11-express-homework-demo.gif