const router = require('express').Router();



// page de connexion
router.get('/connexion', function(req, res, next) {
    res.render('layouts/connexion', { title: 'D-Way | Connexion' });
  });
  

module.exports = router;