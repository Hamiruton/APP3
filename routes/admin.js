const router = require('express').Router();

router.get('/admin', (req, res)=>{
    res.redirect(308, process.env.URL_ADMIN);
});

module.exports = router;