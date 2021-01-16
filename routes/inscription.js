const router = require('express').Router();
const schema = require('../tools/validate').schema_inscription;
const Data = require('../models/data');

router.get('/inscrire', (req, res)=>{
    res.render();
});

router.post('/inscrire', async (req, res)=>{
    const infos = await schema.validateAsync(req.body);
    //hasher le mot de passe
    //enregistrer les données dans la BD
    const inscription = new Data(infos);
    inscription.inscrire().then(()=>{
        //
    }).catch((err)=>{
        console.error(err);
    });
});

module.exports = router;