const http = require('http');
const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const redis = require('redis');
const redisStore = require('connect-redis')(session);
const client = redis.createClient({
    host: 'localhost',
    port: 6379
});

client.on('connect', () => {
    console.log('Connecté à Redis');
});

const app = express();

app.use(session({
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false,
    store: new redisStore({ client: client }),
    cookie: { maxAge: 60 * 1000 * 60 * 24 } // le cookie expirera dans 1 jour si la session n'a pas été déconnectée
}));
const httpServer = http.createServer(app);
app.set('views', path.join(__dirname, 'views')); // precission du repertoire de stockage des templates
app.set('view engine', 'ejs'); // le moteur de template utilisé
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); // repertoire à utiliser pour les fichiers statics
app.use("/mdbootstrap", express.static(__dirname + "/node_modules/mdbootstrap")); // module mbd bootstrap



const index = require('./routes/index');
const admin = require('./routes/admin');
const inscription = require('./routes/inscription');
const connexion = require('./routes/connexion');
const deconnexion = require('./routes/deconnexion');
const paiement = require('./routes/paiement');

app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});
app.use(index);
app.use(admin);
app.use(connexion);
app.use(deconnexion);
app.use(inscription);
app.use(paiement);

/* normalizePort permet de rechercher un port valide afin d'eviter des
 *   desagrement lors du deploiyement.
 */
const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/* errorHandler permet de lever les erreurs si 
 *  le server rencontre des difficultés.
 */
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' necessite des privièges.');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' en cours d\'utilisation.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

httpServer.on('error', errorHandler);
httpServer.on('listening', () => {
    const address = httpServer.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('connecté sur le ' + bind);
});

httpServer.listen(port);