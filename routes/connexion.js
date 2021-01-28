const router = require('express').Router();
const Data = require('../models/data');

router.get('/connexion', (req, res)=>{
    if (req.session.keys) {
        return res.redirect(301, '/');
    }
    res.render('#');
});

router.post('/connexion', (req, res)=>{
    const infos_login = req.body;
    Data.connecter(infos_login.pseudo, infos_login.mdp).then(()=>{
        // la connexion a marché, redirection vers la page d'accueil étant connecté
        req.session.keys = infos_login; // on crée une user session en utilisant les données de l'utilisateur
        res.redirect(301, '/');
    }).catch(()=>{
        // la connexion n'a pas marché, retour sur la page de connexion pour réessayer
        res.redirect(301,'/connexion');
    });

});

module.exports = router;