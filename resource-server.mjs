import express from 'express';
import cookieParser from 'cookie-parser';
import http from 'http';

import path from 'path';
import fs from 'fs';

const app = express();
const server = http.createServer(app);
const __dirname = path.resolve();
const port = 3000;

app.use(cookieParser());
app.get('/asset/resource/font/**', (req, res) => {

    fs.readFile(__dirname + '/src' + req.originalUrl, (err, data) => {
        if(!err) {
            res.writeHead(200, {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            });
            res.end(data);
        }
    })
});

server.listen(port, () => {
    console.log('resource server running on port: ', port);
});

