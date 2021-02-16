const router = require('express').Router();
const Data = require('../models/data');

router.get('/connexion', (req, res)=>{
    if (req.session.keys) {
        res.redirect(301, '/');
    }
    res.render('layouts/connexion', { title: 'D-Way - Connexion', session: '' });
});

router.post('/connexion', (req, res)=>{
    const infos_login = req.body;
    /*
    Data.admin(infos_login.pseudo, infos_login.mdp).then(()=>{
        // Un admin vient de se connecter, on le redirige donc vers la page admin
        req.session.keys = infos_login; // on crée une user session pour l'admin
        res.redirect(301, '/admin');
    }).catch(()=>{
        // ce n'est pas un admin, mais un user lambda
        
    });
    */
   Data.connecter(infos_login.pseudo, infos_login.psw).then((results)=>{
        // la connexion a marché, redirection vers la page d'accueil étant connecté
        req.session.keys = results; // on crée une user session en utilisant les données de l'utilisateur
        res.redirect(301, '/');
    }).catch(()=>{
        // la connexion n'a pas marché, retour sur la page de connexion pour réessayer
        res.redirect(301,'/connexion');
    });
});

module.exports = router;