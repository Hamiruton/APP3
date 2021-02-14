const router = require('express').Router();
const axios = require('axios');

router.get('/soi-meme', (req, res)=>{
    // on fait la demande pour soi-même, on a donc pas besoin de remplir un formulaire
    // on vérifie si le numéro est bien dans la BD. Si oui, on demande le paiement avant de continuer les opérations. Sinon, on lui signale que son numéro n'est pas répertorié
    res.render('#');
});

router.get('/tiers', (req, res)=>{
    // on fait pour un tiers, on doit donc remplir le formulaire
    res.render('#');
});

router.post('/soi-meme', (req, res)=>{
    // on vérifie d'abord si son numéro d'acte est bien dans la BD centrale
    // la BD centrale n'est accessible que sur le serveur flask
    let num_acte_naiss = req.session.keys.num_acte_nais;
    axios.post(URL_DB_CENTRAL, {
        num_acte_naiss: num_acte_naiss
    }).then(response=>{
        if (response.data == 'ok') {
            // dans ce cas, le numéro d'acte entré existe bien dans la BD centrale, l'user doit maintenant payer pour avoir son document
            // insérer le moyen de paiement là
            // Lorsque le paiement a été effectué, on passe à la phase de conception de l'extrait en selectionnant les éléments, dans la BD centrale, nécessaires à sa conception. La BD centrale est reliée à notre serveur flask. C'est donc avec lui que nous devrons communiquer pour la conception de l'extrait.
        } else {
            // dans ce cas, le numéro d'acte entré n'existe pas dans la BD centrale, on le signale à l'user
        }
    }).catch(err=>{
        // une erreur est survenue
        console.error(`Une erreur est survenue: ${err}`);
    });
});

module.exports = router;