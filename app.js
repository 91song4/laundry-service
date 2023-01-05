const express = require('express');
const cookieParser = require('cookie-parser');
const { createServer } = require('http');
const router = require('./routes/index.js');
require('dotenv').config();

const app = express();
const httpServer = createServer(app);

app.use(express.json(), router.use(express.urlencoded({extended: false})), cookieParser());
app.use('/api', express.urlencoded({extended: false}), router);

app.use(express.static("./assets/templates"));
app.use(express.static("assets"));



module.exports = httpServer;
