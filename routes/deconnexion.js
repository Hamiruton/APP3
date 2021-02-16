const router = require('express').Router();

router.get('/deconnexion', (req, res)=>{
    req.session.destroy(()=>{
        res.redirect(301, '/');
    });
});

module.exports = router;