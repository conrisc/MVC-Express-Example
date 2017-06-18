const express = require('express');
const router = express.Router();
const qs = require('querystring');

const service = require('../services/users.js');

router.get("/", (req, res) => {
    let users = service.getUsers((u) => {
         res.render('users',{
            title: 'Users',
            subtitle: 'List of users',
            users: u
        });
    });
});

router.get("/:id", (req, res) => {
    service.deleteUser(req.params.id);
    res.redirect('/users');
});

router.post("/", (req,res) => {
    let reqData = '';
    req.on('data', (data) => {
        reqData += data;
    });
    req.on('end', () => {
        reqData = qs.parse(reqData);
        service.putUser(reqData.firstname, reqData.lastname, reqData.age);
        res.redirect('/users');
    });
});

module.exports = router;