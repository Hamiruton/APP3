const router = require('express').Router();

router.get('/paiement', (req, res) => {
        res.render('layouts/pagePaiement', { title: 'D-Way - Paiement' });
});


module.exports = router;