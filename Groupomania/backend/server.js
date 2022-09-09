const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./apiRouter').router;
const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.get('/', function(req, res) {
   res.setHeader('Content-Type', 'text/html');
});

server.use('/api/', apiRouter);

server.listen(8080, function() {
   console.log('Server en écoute');
});