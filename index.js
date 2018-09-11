const express = require('express');
const path = require('path');
const WebSocAPI = require('./websocapi.js');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Put all API endpoints under '/api'
app.get('/api/websoc', (req, res) => {
    WebSocAPI.callWebSocAPI(req.query, (re) => {res.json(re);});
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.send('Resource does not exist. Check URL.');
});

const port = 3001;
app.listen(port);