const router = require('express').Router();
const schema = require('../tools/validate').schema_inscription;
const hasher = require('../tools/hash_psw').hasher;
const Data = require('../models/data');

router.get('/inscrire', (req, res)=>{
    res.render();
});

router.post('/inscrire', (req, res)=>{
    const infos_signin = req.body;
    // vérifier d'abord les données saisies: les mots de passe sont-ils identiques, le pseudo est-il en string, ...
    const result = schema.validateAsync(infos_signin);

    // si tous les critères de saisie sont vérifiés:
    result.then(()=>{
        // alors on peut hasher le mot de passe et enregistrer les données
        // hasher le mot de passe
        hasher(infos_signin.psw).then(hash=>{
            infos_signin.psw = hash;
            // enregistrer les données dans la BD
            const inscription = new Data(infos_signin);
            inscription.inscrire().then(()=>{
                // envoyer un mail pour valider l'inscription
            }).catch((err)=>{
                // sinon, on signale à l'utilisateur par un message pourquoi son inscription ne fonctionne pas et on lui demande de la refaire
                console.error(err);
            });
        }).catch(err=>{
            console.log(err);
        });
    }).catch((err)=>{
        console.error(err.details[0].message);
    });
});

module.exports = router;
