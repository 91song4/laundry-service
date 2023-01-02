const express = require('express');
const { createServer } = require('http');
const router = require('./routes/index.js');


const app = express();
const httpServer = createServer(app);

app.use(express.json());
app.use('/api', router);

app.use(express.static("./assets/templates"));
app.use(express.static("assets"));



module.exports = httpServer;
