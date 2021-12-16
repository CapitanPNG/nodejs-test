const http = require('http');

const app = require('./app.js');

const host = 'localhost';
const port = 8000;

const server = http.createServer(app);

server.listen(port, host, function (error) {
    if (error)
    {
        return console.log('ERROR', error);
    }

    console.log(`Server is running on http://${host}:${port}`);
});