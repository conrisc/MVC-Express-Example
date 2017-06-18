const express = require('express');
const router = express.Router();

router.use((req, res) => {
    console.log('Page not found!');
    res.status(404).render('pagenotfound',{
        title: '404',
        subtitle: "Sorry can't find that!"
    });
});

module.exports = router;