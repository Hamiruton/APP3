const router = require('express').Router();



// page d'accueil
router.get('/', function(req, res, next) {
    res.render('layouts/index', { title: 'D-Way' });
  });


module.exports = router;