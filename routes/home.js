const express = require('express');
const router = express.Router();

router.get('/', (req, res)=> {
    res.render('home',{
        title: 'Homepage', 
        subtitle: "Page for users",

    });
});

module.exports = router;