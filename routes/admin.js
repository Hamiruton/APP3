const router = require('express').Router();

router.get('/admin', (req, res)=>{
    res.render('#') // page que voit l'admin quand il se connecte
});

module.exports = router;