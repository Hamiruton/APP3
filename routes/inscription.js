const router = require('express').Router();
const schema = require('../tools/validate').schema_inscription;
const hasher = require('../tools/hash_psw');
const Data = require('../models/data');


// page d'inscription
router.get('/inscription', function(req, res, next) {
    res.render('layouts/inscription', { title: 'D-Way | Inscription' });
  });
  
  

router.post('/inscription', async (req, res)=>{
    const infos = await schema.validateAsync(req.body);
    //hasher le mot de passe
    hasher(infos.psw).then(hash=>{
        infos.psw = hash;
        //enregistrer les données dans la BD
        const inscription = new Data(infos);
        inscription.inscrire().then(()=>{
            //
        }).catch((err)=>{
            console.error(err);
        });
    }).catch(err=>{
        console.log(err);
    });
});

module.exports = router;