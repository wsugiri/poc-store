require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const app = express();

const route = require('./src/routes');

app.use(express.json());
app.use(cors({ origin: true }));

route.instance(app);

const server = http.createServer(app);

const onError = (error) => {
    if (error.syscall !== 'listen') throw error;

    const addr = server.address();
    const port = addr.port;

    const bind = typeof port === 'string'
        ? `Pipe ${port}`
        : `Port ${port}`;

    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            console.error(`${bind} ${error.message}`);
            process.exit(1);
    }
};
const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? `pipe ${addr}`
        : `port ${addr.port}`;
    console.log(`Listening on ${bind}`);  // eslint-disable-line
};

server.on('error', onError);
server.on('listening', onListening);
server.listen(process.env.APP_PORT || 9001);