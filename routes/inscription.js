const router = require('express').Router();
const axios = require('axios');
const schema = require('../tools/validate').schema_inscription;
const hasher = require('../tools/hash_psw').hasher;
const send_token = require('../tools/token').send_token;
const Data = require('../models/data');


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
                send_token(infos_signin.email).then(token=>{
                    const URL = process.env.URL;
                    axios.post(URL, {
                        email: infos_signin.email,
                        token: token
                    }).then(response=>{
                        res.redirect(301, '/connexion');
                        console.log(response.data);
                    }).catch(err=>{
                        console.error(`Une erreur est survenue: ${err}`);
                    });
                }).catch(err=>{
                    console.error(err);
                });
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
