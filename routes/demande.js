const router = require('express').Router();

router.get('/soi-meme', (req, res)=>{
    // on fait la demande pour soi-même, on a donc pas besoin de remplir un formulaire
    // on doit payer d'abord avant de lancer l'opération
});

router.get('/tiers', (req, res)=>{
    // on fait pour un tiers, on doit donc remplir le formulaire
    res.render('#');
});

router.post('/tiers', (req, res)=>{
    const value = req.body;
    // on doit payer d'abord avant de lancer l'opération
});

module.exports = router;