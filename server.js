const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const httpServer = http.createServer(app);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'views', 'static')));

const inscription = require('./routes/inscription');

app.use(inscription);

const port = process.env.PORT;
httpServer.listen(port, ()=>{
    console.log(`Connecté sur le port ${port}`);
});