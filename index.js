const express = require('express');
const apiRouter = require('./api/api-router.js');

const server = express();

server.use(express.json()); // required to parse JSON from the body
server.use('/api', apiRouter); // for URLs beginning with /api

server.get('/', (req, res) => {
    res.send(`<h2>This is a test that the server is working correctly</h2>`);
});

const port = 5000;

server.listen(port, () => {
    console.log(`\n Server listening on http://localhost:${port} ***\n`);
});
