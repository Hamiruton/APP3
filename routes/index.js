const router = require('express').Router();



// page d'accueil
router.get('/', function(req, res, next) {
  console.log('Session > ' + req.session.keys);
  if (req.session.keys) {
    return res.render('layouts/index', { title: 'D-Way - Yes', session: req.session.keys });
  }
  res.render('layouts/index', { title: 'D-Way - No', session: '' });
});


module.exports = router;